import { useEffect, useState } from "react";

import {
  DecisionNode,
  DecisionTree,
  NodeTypeEnum,
} from "../../../../models/DecisionTree.types";

interface NodeInspectorPanelProps {
  selectedNodeId: string;
  currentTree: DecisionTree;
  updateNodes: (nodes: DecisionNode[]) => void;
}

export default function NodeInspectorPanel({
  selectedNodeId,
  currentTree,
  updateNodes,
}: NodeInspectorPanelProps) {
  const [label, setLabel] = useState("");
  const [isLabelEditable, setIsLabelEditable] = useState(true);
  const [nodeType, setNodeType] = useState<NodeTypeEnum | null>(null);

  useEffect(() => {
    if (selectedNodeId && currentTree) {
      const node = currentTree.nodes.find((n) => n.id === selectedNodeId);
      if (!node) return;

      setLabel(node.data?.label || "");
      setNodeType(node.type as NodeTypeEnum);

      if (node.type === NodeTypeEnum.START || node.type === NodeTypeEnum.END) {
        setIsLabelEditable(false);
      } else {
        setIsLabelEditable(true);
      }
    } else {
      setLabel("");
      setIsLabelEditable(true);
      setNodeType(null);
    }
  }, [selectedNodeId, currentTree]);

  const handleSave = () => {
    if (!selectedNodeId || !currentTree || !isLabelEditable) return;
    const updatedNodes = currentTree.nodes.map((node) => {
      if (node.id === selectedNodeId) {
        return { ...node, data: { ...node.data, label } };
      }
      return node;
    });
    updateNodes(updatedNodes);
  };

  const nodeConfig = {
    [NodeTypeEnum.START]: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-green-600"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "text-green-600",
      label: "Start Node",
    },
    [NodeTypeEnum.MESSAGE]: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-blue-600"
        >
          <path
            fillRule="evenodd"
            d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "text-blue-600",
      label: "Message Node",
    },
    [NodeTypeEnum.END]: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-red-600"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "text-red-600",
      label: "End Node",
    },
  };

  return (
    <div>
      {nodeType && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100">
              {nodeConfig[nodeType].icon}
            </div>
            <h3 className={`font-semibold ${nodeConfig[nodeType].color}`}>
              {nodeConfig[nodeType].label}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="node-label"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Label
              </label>
              <input
                id="node-label"
                type="text"
                className={`w-full px-3 py-2 bg-white border rounded-lg
                           text-slate-800 text-sm focus:ring-2 focus:outline-none
                           ${
                             isLabelEditable
                               ? "border-slate-300 focus:ring-indigo-200 focus:border-indigo-500"
                               : "border-slate-200 bg-slate-50 cursor-not-allowed text-slate-500"
                           }`}
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={
                  isLabelEditable ? "Enter a label..." : "Not editable"
                }
                disabled={!isLabelEditable}
              />
              {!isLabelEditable && (
                <p className="mt-1 text-xs text-slate-500">
                  This node type doesn't support custom labels
                </p>
              )}
            </div>

            {isLabelEditable && (
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                          bg-indigo-100 hover:bg-indigo-200
                          text-indigo-700 text-sm font-medium
                          border border-indigo-200
                          transition-colors duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
