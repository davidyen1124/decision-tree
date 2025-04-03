import { Connection } from "reactflow";

import { DecisionEdge } from "../models/DecisionTree.types";
import { v4 as uuidv4 } from "uuid";

export function createNewEdge(connection: Connection): DecisionEdge {
  return {
    id: uuidv4(),
    source: connection.source ?? "",
    target: connection.target ?? "",
    sourceHandle: connection.sourceHandle ?? undefined,
    targetHandle: connection.targetHandle ?? undefined,
  };
} 