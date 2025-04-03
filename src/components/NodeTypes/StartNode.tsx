import { Handle, NodeProps, Position } from "reactflow";

export default function StartNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`
        group relative rounded-xl border shadow-sm p-3
        ${
          selected
            ? "border-green-500 ring-2 ring-green-200"
            : "border-slate-200"
        }
        bg-white
        transition-all duration-200 ease-in-out
        hover:shadow-md
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 text-green-600"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <strong className="text-slate-800 text-sm font-semibold">Start</strong>
      </div>
      <div className="text-sm mt-1 px-2 py-1.5 bg-slate-50 rounded border border-slate-100">
        {data.label ? (
          <p className="text-slate-700">{data.label}</p>
        ) : (
          <p className="text-slate-400 italic">Starting point</p>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !bg-green-500 !border-2 !border-white"
      />
    </div>
  );
}
