import { XYPosition } from "reactflow";

import { BaseNodeData, DecisionNode,NodeType } from "../models/DecisionTree.types";
import { v4 as uuidv4 } from "uuid";

function createNodeData(type: NodeType): BaseNodeData {
  switch (type) {
    case "start":
      return { label: "Start Node" };
    case "end":
      return { label: "End Node" };
    case "message":
    default:
      return {
        label: "Message Node",
      };
  }
}

export function createNewNode(
  type: NodeType,
  position: XYPosition = { x: 0, y: 0 }
): DecisionNode {
  return {
    id: uuidv4(),
    type,
    data: createNodeData(type),
    position,
  };
}
