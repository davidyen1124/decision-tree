import { useRef } from "react";

import { useDecisionTree } from "../../../../context/useDecisionTree";

export default function ImportExportPanel() {
  const { importJson, exportJson, currentTree } = useDecisionTree();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        importJson(text);
      }
    };
    reader.readAsText(file);
  };

  const handleExportClick = () => {
    if (!currentTree) {
      alert("No tree to export.");
      return;
    }
    const jsonString = exportJson();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `decision_tree_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-800 mb-3">
        Import / Export
      </h3>
      <div className="space-y-2">
        <button
          onClick={handleImportClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                     bg-slate-100 hover:bg-slate-200
                     text-slate-700 text-sm font-medium
                     border border-slate-200
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
              d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
              clipRule="evenodd"
            />
          </svg>
          Import JSON
        </button>

        <button
          onClick={handleExportClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                     bg-indigo-50 hover:bg-indigo-100
                     text-indigo-700 text-sm font-medium
                     border border-indigo-100
                     transition-colors duration-150"
          disabled={!currentTree}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z"
              clipRule="evenodd"
            />
          </svg>
          Export JSON
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
