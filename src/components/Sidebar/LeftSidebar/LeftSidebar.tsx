import ImportExportPanel from "./panels/ImportExportPanel";
import NodePanel from "./panels/NodePanel";
import ValidationPanel from "./panels/ValidationPanel";

export default function LeftSidebar() {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 h-full flex flex-col shadow-sm overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Toolbox</h2>

        <div className="space-y-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <NodePanel />
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <ImportExportPanel />
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <ValidationPanel />
          </div>
        </div>
      </div>
    </aside>
  );
}
