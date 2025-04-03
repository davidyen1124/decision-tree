import { Handle, NodeProps, Position } from "reactflow";

export default function EndNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`
        group relative rounded-xl border shadow-sm p-3
        ${selected ? "border-red-500 ring-2 ring-red-200" : "border-slate-200"}
        bg-white
        transition-all duration-200 ease-in-out
        hover:shadow-md
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 text-red-600"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <strong className="text-slate-800 text-sm font-semibold">End</strong>
      </div>
      <div className="text-sm mt-1 px-2 py-1.5 bg-slate-50 rounded border border-slate-100">
        {data.label ? (
          <p className="text-slate-700">{data.label}</p>
        ) : (
          <p className="text-slate-400 italic">Conversation end</p>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !bg-red-500 !border-2 !border-white"
      />
    </div>
  );
}
