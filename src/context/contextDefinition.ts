import { createContext } from "react";

import { ChatbotData, DecisionEdge, DecisionNode, DecisionTree } from "../models/DecisionTree.types";

export interface DecisionTreeContextValue {
  chatbotData: ChatbotData;
  setChatbotData: React.Dispatch<React.SetStateAction<ChatbotData>>;
  currentTree: DecisionTree;
  setCurrentTree: (tree: DecisionTree) => void;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  updateNodes: (updatedNodes: DecisionNode[]) => void;
  updateEdges: (updatedEdges: DecisionEdge[]) => void;
  addNode: (node: DecisionNode) => void;
  addEdge: (edge: DecisionEdge) => void;
  importJson: (jsonString: string) => void;
  exportJson: () => string;
  validationErrors: string[];
  selectedNodeId: string | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedEdgeId: string | null;
  setSelectedEdgeId: React.Dispatch<React.SetStateAction<string | null>>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  commitTreeChange: (tree?: DecisionTree) => void;
}

export const DecisionTreeContext = createContext<DecisionTreeContextValue | undefined>(
  undefined
); 