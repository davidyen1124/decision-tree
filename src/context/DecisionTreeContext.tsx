import { ReactNode, useCallback, useEffect, useState } from "react";

import {
  ChatbotData,
  DecisionEdge,
  DecisionNode,
  DecisionTree,
  NodeTypeEnum,
} from "../models/DecisionTree.types";
import { createEmptyTree } from "../utils/treeUtils";
import { DecisionTreeContext } from "./contextDefinition";

function buildAdjacencyMap(edges: DecisionEdge[]): Record<string, string[]> {
  const adjacencyMap: Record<string, string[]> = {};
  edges.forEach((edge) => {
    if (!adjacencyMap[edge.source]) {
      adjacencyMap[edge.source] = [];
    }
    adjacencyMap[edge.source].push(edge.target);
  });
  return adjacencyMap;
}

function detectCyclesDFS(
  nodeId: string,
  adjacencyMap: Record<string, string[]>,
  visited: Set<string>,
  recursionStack: Set<string>
): boolean {
  visited.add(nodeId);
  recursionStack.add(nodeId);

  const neighbors = adjacencyMap[nodeId] || [];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      if (detectCyclesDFS(neighbor, adjacencyMap, visited, recursionStack)) {
        return true;
      }
    } else if (recursionStack.has(neighbor)) {
      return true;
    }
  }

  recursionStack.delete(nodeId);
  return false;
}

function validateFlow(tree: DecisionTree): string[] {
  const errors: string[] = [];

  // 1. Exactly one Start node?
  const startNodes = tree.nodes.filter((n) => n.type === NodeTypeEnum.START);
  if (startNodes.length === 0) {
    errors.push("Missing a Start node.");
  } else if (startNodes.length > 1) {
    errors.push("Multiple Start nodes detected.");
  }

  // 2. Exactly one End node?
  const endNodes = tree.nodes.filter((n) => n.type === NodeTypeEnum.END);
  if (endNodes.length === 0) {
    errors.push("Missing an End node.");
  } else if (endNodes.length > 1) {
    errors.push("Multiple End nodes detected.");
  }

  // If we don't have a single start/end, no need to check further path logic
  if (startNodes.length !== 1 || endNodes.length !== 1) {
    // Still check for end node outgoing edges even if start/end count is wrong
    if (endNodes.length === 1) {
      const [endNode] = endNodes;
      const adjacencyMap = buildAdjacencyMap(tree.edges); // Need map for this check
      if (adjacencyMap[endNode.id] && adjacencyMap[endNode.id].length > 0) {
        errors.push("End node has outgoing edges, which is not allowed.");
      }
    }
    return errors;
  }

  const [startNode] = startNodes;
  const [endNode] = endNodes;

  // 3. Adjacency map
  const adjacencyMap = buildAdjacencyMap(tree.edges);

  // 4. Check that end node has no outgoing edges
  if (adjacencyMap[endNode.id] && adjacencyMap[endNode.id].length > 0) {
    errors.push("End node has outgoing edges, which is not allowed.");
  }

  // 5. Check connectivity and detect loops with DFS

  // A) DFS to detect cycle and check reachability
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const hasCycle = detectCyclesDFS(
    startNode.id,
    adjacencyMap,
    visited,
    recursionStack
  );
  if (hasCycle) {
    errors.push("A cycle was detected in the flow.");
  }

  // B) Check if end node is reachable after DFS from start
  if (!visited.has(endNode.id)) {
    errors.push("No path from the Start node to the End node.");
  }

  // C) Check for unreachable nodes
  const allNodeIds = new Set(tree.nodes.map((n) => n.id));
  const unreachableNodes = [...allNodeIds].filter(
    (nodeId) => !visited.has(nodeId)
  );

  unreachableNodes.forEach((nodeId) => {
    // Avoid flagging the designated end node if it's unreachable due to lack of path
    // (that error is already covered). Only flag *other* unreachable nodes.
    if (nodeId !== endNode.id || visited.has(endNode.id)) {
      // Find the node details for a better error message if possible
      const node = tree.nodes.find((n) => n.id === nodeId);
      const nodeLabel = node?.data?.label || `ID: ${nodeId}`;
      const nodeType = node?.type || "Unknown Type";
      errors.push(
        `Node '${nodeLabel}' (${nodeType}) is not reachable from the Start node.`
      );
    }
  });

  return errors;
}

export const DecisionTreeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatbotData, setChatbotData] = useState<ChatbotData>({
    chatDecisionTrees: [],
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [history, setHistory] = useState<DecisionTree[]>(() => [
    createEmptyTree(),
  ]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);
  const [currentTree, setCurrentTree] = useState<DecisionTree>(history[0]);

  const canUndo = currentHistoryIndex > 0;
  const canRedo = currentHistoryIndex < history.length - 1;

  useEffect(() => {
    const errors = validateFlow(currentTree);
    setValidationErrors(errors);
  }, [currentTree]);

  const updateEdges = useCallback((edges: DecisionEdge[]) => {
    setCurrentTree((prev) => ({ ...prev, edges }));
  }, []);

  const commitTreeChange = useCallback(
    (newTree?: DecisionTree) => {
      const treeToCommit = newTree || currentTree;
      setCurrentHistoryIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        setHistory((prevHistory) => {
          const relevantHistory = prevHistory.slice(0, prevIndex + 1);
          return [...relevantHistory, treeToCommit];
        });

        return newIndex;
      });

      if (newTree) {
        setCurrentTree(newTree);
      }
    },
    [currentTree]
  );

  const undo = useCallback(() => {
    if (canUndo) {
      setCurrentHistoryIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        return newIndex;
      });

      setCurrentHistoryIndex((prevIndex) => {
        setCurrentTree(history[prevIndex]);
        return prevIndex;
      });
    }
  }, [canUndo, history]);

  const redo = useCallback(() => {
    if (canRedo) {
      setCurrentHistoryIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex;
      });

      setCurrentHistoryIndex((prevIndex) => {
        setCurrentTree(history[prevIndex]);
        return prevIndex;
      });
    }
  }, [canRedo, history]);

  const updateNodes = useCallback((nodes: DecisionNode[]) => {
    setCurrentTree((prev) => ({ ...prev, nodes }));
  }, []);

  const addNode = (node: DecisionNode) => {
    const newTree = {
      ...currentTree,
      nodes: [...currentTree.nodes, node],
    };
    setCurrentTree(newTree);
    commitTreeChange(newTree);
  };

  const addEdge = (edge: DecisionEdge) => {
    const newTree = {
      ...currentTree,
      edges: [...currentTree.edges, edge],
    };
    setCurrentTree(newTree);
    commitTreeChange(newTree);
  };

  const importJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (
        parsed &&
        Array.isArray(parsed.nodes) &&
        Array.isArray(parsed.edges)
      ) {
        const importedTree = parsed as DecisionTree;

        setHistory([importedTree]);
        setCurrentHistoryIndex(0);
        setCurrentTree(importedTree);
      } else {
        throw new Error("Invalid Decision Tree structure in JSON.");
      }
    } catch (error: unknown) {
      console.error("Invalid JSON:", error);
      const message = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to parse JSON. Please check format. Error: ${message}`);
    }
  };

  const exportJson = (): string => {
    return JSON.stringify(currentTree, null, 2);
  };

  return (
    <DecisionTreeContext.Provider
      value={{
        chatbotData,
        setChatbotData,
        currentTree,
        setCurrentTree: commitTreeChange,
        isEditMode,
        setIsEditMode,
        updateNodes,
        updateEdges,
        commitTreeChange,
        addNode,
        addEdge,
        importJson,
        exportJson,
        validationErrors,
        selectedNodeId,
        setSelectedNodeId,
        selectedEdgeId,
        setSelectedEdgeId,
        undo,
        redo,
        canUndo,
        canRedo,
      }}
    >
      {children}
    </DecisionTreeContext.Provider>
  );
};
