import React from "react";

import { useDecisionTree } from "../../../../context/useDecisionTree";
import {
  DecisionNode,
  NodeType,
  NodeTypeEnum,
} from "../../../../models/DecisionTree.types";

interface SidebarItem {
  label: string;
  nodeType: NodeTypeEnum;
  icon: React.ReactNode;
}

export default function NodePanel() {
  const { currentTree } = useDecisionTree();

  const allSidebarItems: SidebarItem[] = [
    {
      label: "Start Node",
      nodeType: NodeTypeEnum.START,
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
    },
    {
      label: "Message Node",
      nodeType: NodeTypeEnum.MESSAGE,
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
    },
    {
      label: "End Node",
      nodeType: NodeTypeEnum.END,
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
    },
  ];

  const hasStartNode = currentTree?.nodes.some(
    (n: DecisionNode) => n.type === NodeTypeEnum.START
  );
  const hasEndNode = currentTree?.nodes.some(
    (n: DecisionNode) => n.type === NodeTypeEnum.END
  );

  const filteredSidebarItems = allSidebarItems.filter((item) => {
    if (item.nodeType === NodeTypeEnum.START && hasStartNode) return false;
    if (item.nodeType === NodeTypeEnum.END && hasEndNode) return false;
    return true;
  });

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeType
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-800 mb-3">Node Types</h3>
      <div className="space-y-2">
        {filteredSidebarItems.map((item) => (
          <div
            key={item.nodeType}
            className={`
              flex items-center gap-3 p-3 rounded-lg border shadow-sm cursor-move 
              hover:shadow transition-all duration-150 bg-white
              border-slate-200
            `}
            draggable
            onDragStart={(event) => handleDragStart(event, item.nodeType)}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100">
              {item.icon}
            </div>
            <span className="text-sm font-medium text-slate-700">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      {filteredSidebarItems.length === 0 && (
        <p className="text-sm text-slate-500 italic text-center py-3">
          All required nodes have been added
        </p>
      )}
    </div>
  );
}
