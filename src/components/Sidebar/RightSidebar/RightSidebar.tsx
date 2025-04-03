import { useDecisionTree } from "../../../context/useDecisionTree";
import NodeInspectorPanel from "./panels/NodeInspectorPanel";

export default function RightSidebar() {
  const { selectedNodeId, currentTree, updateNodes } = useDecisionTree();

  return (
    <aside className="w-72 bg-white border-l border-slate-200 h-full shadow-sm overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Inspector</h2>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          {selectedNodeId && currentTree ? (
            <NodeInspectorPanel
              selectedNodeId={selectedNodeId}
              currentTree={currentTree}
              updateNodes={updateNodes}
            />
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-slate-400"
                >
                  <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-700 mb-2">
                No node selected
              </h3>
              <p className="text-sm text-slate-500">
                Select a node from the canvas to edit its properties
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
