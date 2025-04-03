import { DecisionTree } from "../models/DecisionTree.types";
import { v4 as uuidv4 } from "uuid";

export function createEmptyTree(): DecisionTree {
    return {
      id: uuidv4(),
      nodes: [],
      edges: [],
  };
}

