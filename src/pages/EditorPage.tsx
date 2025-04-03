import { useCallback, useRef } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  NodeDragHandler,
  OnEdgesChange,
  OnEdgeUpdateFunc,
  OnNodesChange,
  useReactFlow,
} from "reactflow";

import EndNode from "../components/NodeTypes/EndNode";
import MessageNode from "../components/NodeTypes/MessageNode";
import StartNode from "../components/NodeTypes/StartNode";
import LeftSidebar from "../components/Sidebar/LeftSidebar";
import RightSidebar from "../components/Sidebar/RightSidebar";
import { useDecisionTree } from "../context/useDecisionTree";
import {
  DecisionEdge,
  DecisionNode,
  NodeType,
} from "../models/DecisionTree.types";
import { createNewEdge } from "../utils/edgeUtils";
import { createNewNode } from "../utils/nodeUtils";

import "reactflow/dist/style.css";

const nodeTypes = {
  start: StartNode,
  message: MessageNode,
  end: EndNode,
};

const edgeOptions = {
  style: {
    strokeWidth: 2,
    stroke: "#94a3b8",
  },
  animated: true,
  updatable: true,
};

export default function EditorPage() {
  const {
    currentTree,
    updateNodes,
    updateEdges,
    addNode,
    addEdge,
    setSelectedNodeId,
    selectedEdgeId,
    setSelectedEdgeId,
    commitTreeChange,
  } = useDecisionTree();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(
        changes,
        currentTree.nodes
      ) as DecisionNode[];
      updateNodes(updatedNodes);
    },
    [currentTree, updateNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(
        changes,
        currentTree.edges
      ) as DecisionEdge[];
      updateEdges(updatedEdges);
    },
    [currentTree, updateEdges]
  );

  const onNodeDragStop: NodeDragHandler = useCallback(() => {
    commitTreeChange();
  }, [commitTreeChange]);

  const onEdgeUpdate: OnEdgeUpdateFunc = useCallback(() => {
    commitTreeChange();
  }, [commitTreeChange]);

  const onConnect = useCallback(
    (connection: Connection) => {
      addEdge(createNewEdge(connection));
    },
    [addEdge]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowWrapper.current) return;

      const nodeType = event.dataTransfer.getData(
        "application/reactflow"
      ) as NodeType;
      if (!nodeType) {
        return;
      }

      const boundingRect = reactFlowWrapper.current.getBoundingClientRect();
      const position = project({
        x: event.clientX - boundingRect.left,
        y: event.clientY - boundingRect.top,
      });

      addNode(createNewNode(nodeType, position));
    },
    [addNode, project]
  );

  const getEdgeStyle = useCallback(
    (edge: DecisionEdge) => {
      return {
        ...edgeOptions.style,
        stroke: edge.id === selectedEdgeId ? "#3b82f6" : "#94a3b8",
        strokeWidth: edge.id === selectedEdgeId ? 3 : 2,
      };
    },
    [selectedEdgeId]
  );

  const styledEdges = currentTree.edges.map((edge) => ({
    ...edge,
    style: getEdgeStyle(edge),
  }));

  return (
    <div className="flex h-full">
      <LeftSidebar />
      <div
        className="flex-1 relative bg-slate-50"
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={currentTree.nodes}
          edges={styledEdges}
          onNodesChange={onNodesChange}
          onNodeDragStop={onNodeDragStop}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onConnect={onConnect}
          onNodeClick={(_, node) => {
            setSelectedNodeId(node.id);
            setSelectedEdgeId(null);
          }}
          onEdgeClick={(_, edge) => {
            setSelectedEdgeId(edge.id);
            setSelectedNodeId(null);
          }}
          onPaneClick={() => {
            setSelectedNodeId(null);
            setSelectedEdgeId(null);
          }}
          defaultEdgeOptions={edgeOptions}
          className="react-flow-wrapper transition-all [--bg-color:theme(colors.slate.100)]"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={12}
            size={1.5}
            color="#CBD5E1"
            className="!bg-slate-50"
          />
          <Controls className="!border !border-slate-200 !rounded-lg !shadow-md !bg-white" />
        </ReactFlow>
      </div>
      <RightSidebar />
    </div>
  );
}
