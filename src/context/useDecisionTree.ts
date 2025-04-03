import { useContext } from 'react';

import { DecisionTreeContext, DecisionTreeContextValue } from './contextDefinition';

export function useDecisionTree(): DecisionTreeContextValue {
  const context = useContext(DecisionTreeContext);
  if (!context) {
    throw new Error(
      "useDecisionTree must be used within a DecisionTreeProvider."
    );
  }
  return context;
} 