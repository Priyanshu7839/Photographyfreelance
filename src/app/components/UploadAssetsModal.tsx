import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useCallback } from "react";
import { X, Upload, CheckCircle2, File, ImageIcon, Video, Trash2 } from "lucide-react";

type FileType = {
  id: string;
  file: File;
  preview?: string;
};

type Props = {
  open: boolean;
  moodboardModal:boolean;
  onClose: () => void;
  onUpload?: (files: FileType[], editedStatus: "edited" | "unedited", isVendor: boolean) => void;
};

export default function UploadAssetsModal({ open,moodboardModal, onClose, onUpload }: Props) {
  const [editedStatus, setEditedStatus] = useState<"edited" | "unedited">("edited");
  const [isVendor, setIsVendor] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const newEntries: FileType[] = Array.from(incoming).map((file) => {
      const id = `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
      return { id, file, preview };
    });
    setFiles((prev) => [...prev, ...newEntries]);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleClose = () => {
    setFiles([]);
    setEditedStatus("edited");
    setIsVendor(false);
    onClose();
  };

  const handleUpload = () => {
    onUpload?.(files, editedStatus, isVendor);
    handleClose();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="w-4 h-4 text-accent" />;
    if (file.type.startsWith("video/")) return <Video className="w-4 h-4 text-purple-400" />;
    return <File className="w-4 h-4 text-white/50" />;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <Upload className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h2 className="text-base font-medium">Upload Assets</h2>
                  <p className="text-xs opacity-50 mt-0.5">Add files to this client project</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Edited / Unedited toggle */}
             {!moodboardModal&& <div>
                <p className="text-xs uppercase tracking-widest opacity-50 mb-3">File Type</p>
                <div className="flex gap-3">
                  {(["edited", "unedited"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setEditedStatus(opt)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm capitalize border transition-all ${
                        editedStatus === opt
                          ? "bg-accent/15 border-accent/50 text-accent"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      {editedStatus === opt && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>}

              {/* Vendor tick */}
             {!moodboardModal&& <button
                onClick={() => setIsVendor((v) => !v)}
                className="flex items-center gap-3 w-full group"
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isVendor ? "bg-accent border-accent" : "bg-white/5 border-white/20 group-hover:border-white/40"
                }`}>
                  {isVendor && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-background"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </div>
                <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                  Is this for vendor?
                </span>
              </button>}

              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => inputRef.current?.click()}
                className={`relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                  dragging
                    ? "border-accent bg-accent/8 scale-[1.01]"
                    : "border-white/15 bg-white/[0.02] hover:border-accent/40 hover:bg-white/5"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
                <motion.div
                  animate={dragging ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3"
                >
                  <Upload className={`w-5 h-5 transition-colors ${dragging ? "text-accent" : "opacity-40"}`} />
                </motion.div>
                <p className={`text-sm mb-1 transition-colors ${dragging ? "text-accent" : "opacity-70"}`}>
                  {dragging ? "Release to add files" : "Drag & drop files here"}
                </p>
                <p className="text-xs opacity-40">
                  or <span className="text-accent underline underline-offset-2">browse</span> — photos & videos supported
                </p>
              </div>

              {/* File list */}
              <AnimatePresence initial={false}>
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 max-h-44 overflow-y-auto pr-1 scrollbar-thin"
                  >
                    <p className="text-xs uppercase tracking-widest opacity-40 mb-2">
                      {files.length} file{files.length !== 1 ? "s" : ""} selected
                    </p>
                    {files.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5"
                      >
                        {entry.preview ? (
                          <img
                            src={entry.preview}
                            alt=""
                            className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-white/10"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            {getFileIcon(entry.file)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs truncate">{entry.file.name}</p>
                          <p className="text-xs opacity-40 mt-0.5">{formatSize(entry.file.size)}</p>
                        </div>
                        <button
                          onClick={() => removeFile(entry.id)}
                          className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.02]">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={files.length === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm transition-all ${
                  files.length > 0
                    ? "bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                    : "bg-white/10 opacity-40 cursor-not-allowed"
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload {files.length > 0 ? `${files.length} file${files.length !== 1 ? "s" : ""}` : ""}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
