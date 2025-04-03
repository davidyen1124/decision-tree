import { Handle, NodeProps, Position } from "reactflow";

export default function MessageNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`
        group relative rounded-xl border shadow-sm p-3
        ${
          selected
            ? "border-indigo-500 ring-2 ring-indigo-200"
            : "border-slate-200"
        }
        bg-white
        transition-all duration-200 ease-in-out
        hover:shadow-md
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 text-blue-600"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <strong className="text-slate-800 text-sm font-semibold">
          Message
        </strong>
      </div>
      <div className="text-sm mt-1 px-2 py-1.5 bg-slate-50 rounded border border-slate-100">
        {data.label ? (
          <p className="text-slate-700">{data.label}</p>
        ) : (
          <p className="text-slate-400 italic">No message set</p>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !bg-blue-500 !border-2 !border-white"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !bg-blue-500 !border-2 !border-white"
      />
    </div>
  );
}
