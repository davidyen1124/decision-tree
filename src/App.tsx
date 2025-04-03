import { ReactFlowProvider } from "reactflow";

import chatIcon from "./assets/chat-icon.svg";
import decisionTreeIcon from "./assets/decision-tree.svg";
import editIcon from "./assets/edit-icon.svg";
import previewIcon from "./assets/preview-icon.svg";
import redoIcon from "./assets/redo-icon.svg";
import undoIcon from "./assets/undo-icon.svg";
import userIcon from "./assets/user-icon.svg";
import { useDecisionTree } from "./context/useDecisionTree";
import EditorPage from "./pages/EditorPage";

function App() {
  const { isEditMode, setIsEditMode, undo, redo, canUndo, canRedo } =
    useDecisionTree();

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg border border-slate-200 bg-white shadow-sm flex items-center justify-center">
            <img
              src={decisionTreeIcon}
              alt="Decision Tree Icon"
              className="h-6 w-6"
            />
          </div>
          <h1 className="font-bold text-xl text-slate-800">
            Decision Flow Builder
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {isEditMode && (
            <>
              <button
                onClick={undo}
                disabled={!canUndo}
                className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all
                         ${
                           canUndo
                             ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                             : "bg-slate-50 text-slate-400 cursor-not-allowed"
                         }`}
              >
                <img src={undoIcon} alt="Undo Icon" className="w-4 h-4" />
                Undo
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all
                         ${
                           canRedo
                             ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                             : "bg-slate-50 text-slate-400 cursor-not-allowed"
                         }`}
              >
                <img src={redoIcon} alt="Redo Icon" className="w-4 h-4" />
                Redo
              </button>
            </>
          )}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all 
                       bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          >
            {isEditMode ? (
              <>
                <img src={previewIcon} alt="Preview Icon" className="w-4 h-4" />
                Preview
              </>
            ) : (
              <>
                <img src={editIcon} alt="Edit Icon" className="w-4 h-4" />
                Edit
              </>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {isEditMode ? (
          <ReactFlowProvider>
            <div className="flex h-full">
              <div className="flex-1">
                <EditorPage />
              </div>
            </div>
          </ReactFlowProvider>
        ) : (
          <div className="p-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Preview Mode
              </h2>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <img src={chatIcon} alt="Chat Icon" className="w-4 h-4" />
                  </div>
                  <div className="flex-1 p-3 bg-white rounded-lg shadow-sm border border-slate-200">
                    <p className="text-slate-700">
                      This is a simulated conversation based on your decision
                      tree flow.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <img src={userIcon} alt="User Icon" className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                      <p className="text-indigo-700">
                        How can I help you today?
                      </p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <button className="text-xs px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                        Option 1
                      </button>
                      <button className="text-xs px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                        Option 2
                      </button>
                      <button className="text-xs px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                        Option 3
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
