import { Node } from "reactflow";

export enum NodeTypeEnum {
  START = 'start',
  END = 'end',
  MESSAGE = 'message'
}

export type NodeType = NodeTypeEnum;

export interface BaseNodeData {
  label: string;
}

export interface DecisionNode extends Node<BaseNodeData> {
  type: NodeType;
}

export interface DecisionEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface DecisionTree {
  id: string;
  nodes: DecisionNode[];
  edges: DecisionEdge[];
}

export interface ChatbotData {
  chatDecisionTrees: DecisionTree[];
}
