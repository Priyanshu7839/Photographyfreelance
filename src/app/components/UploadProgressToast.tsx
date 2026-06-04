import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Upload, CheckCircle2, ChevronDown, ChevronUp, X, Loader2 } from "lucide-react";

type FileProgress = {
  percent: number;
  uploadedParts: number;
  totalParts: number;
  status?: "uploading" | "done" | "error";
};

type Props = {
  uploadProgress: Record<string, FileProgress>;
  onDismiss?: () => void;
};

export default function UploadProgressToast({ uploadProgress, onDismiss }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const entries = Object.entries(uploadProgress);
  if (entries.length === 0) return null;

  const totalFiles = entries.length;
  const doneCount = entries.filter(([, d]) => d.percent >= 100).length;
  const allDone = doneCount === totalFiles;
  const overallPercent = Math.round(
    entries.reduce((sum, [, d]) => sum + d.percent, 0) / totalFiles
  );

  const truncateName = (name: string, max = 28) =>
    name.length > max ? name.slice(0, max - 1) + "…" : name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
      className="fixed bottom-6 right-6 z-[80] w-80 rounded-2xl border border-white/10 bg-[#0d0d0d]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${allDone ? "bg-emerald-500/15 border border-emerald-500/30" : "bg-accent/15 border border-accent/30"}`}>
          {allDone
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            : <Loader2 className="w-4 h-4 text-accent animate-spin" />
          }
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-none mb-1">
            {allDone ? "Upload Complete" : "Uploading Files"}
          </p>
          <div className="flex items-center gap-2">
            {/* Mini overall bar */}
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${allDone ? "bg-emerald-400" : "bg-accent"}`}
                initial={{ width: 0 }}
                animate={{ width: `${overallPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-xs opacity-50 whitespace-nowrap">
              {doneCount}/{totalFiles} files
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            {collapsed
              ? <ChevronUp className="w-3.5 h-3.5 opacity-60" />
              : <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            }
          </button>
          {allDone && onDismiss && (
            <button
              onClick={onDismiss}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5 opacity-60" />
            </button>
          )}
        </div>
      </div>

      {/* File list */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 space-y-3 max-h-64 overflow-y-auto">
              {entries.map(([fileName, data]) => {
                const done = data.percent >= 100;
                const isError = data.status === "error";
                return (
                  <div key={fileName}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isError ? "bg-red-400" : done ? "bg-emerald-400" : "bg-accent animate-pulse"}`} />
                        <span className="text-xs opacity-70 truncate">{truncateName(fileName)}</span>
                      </div>
                      <span className={`text-xs flex-shrink-0 ml-2 tabular-nums ${isError ? "text-red-400" : done ? "text-emerald-400" : "opacity-50"}`}>
                        {isError ? "Error" : `${data.percent}%`}
                      </span>
                    </div>

                    {/* Progress track */}
                    <div className="w-full h-1 bg-white/8 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${isError ? "bg-red-500" : done ? "bg-emerald-400" : "bg-accent"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${data.percent}%` }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>

                    {/* Parts info */}
                    {!done && !isError && (
                      <p className="text-[10px] opacity-30 mt-1 tabular-nums">
                        Part {data.uploadedParts} of {data.totalParts}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
