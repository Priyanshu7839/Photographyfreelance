import { motion } from "motion/react";
import { Search, User, Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FolderCard } from "../components/folder-card";
import { GetClients, uploadMultipartFile } from "../../Apicalls/Apicalls";

interface ClientFolder {
  id: string;
  clientName: string;
  eventDate: string;
  photographerName: string;
  projectType: "Wedding" | "Pre-wedding";
  location: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStep, setUploadStep] = useState<1 | 2>(1);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [uploadType, setUploadType] = useState<"raw" | "edited">("edited");

  
  const [folders, setfolders] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    current: 0,
    total: 0,
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await GetClients();

        setfolders(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, []);

 

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const filteredFolders = folders.filter((folder) =>
    folder?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [files, setFiles] = useState([]); // initialized as empty array

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const [uploadState, setUploadState] = useState({
    currentFile: "",
    fileProgress: 0, // 0–100 (current file)
    completedFiles: 1,
    totalFiles: 0,
  });

  useEffect(() => {
    setShowUploadModal(false);

    if (!files || files.length === 0) return;
    if (!selectedClient) {
      alert("Please select a client first");
      return;
    }

    const uploadAll = async () => {
      setIsUploading(true);
      setUploadComplete(false);

      let totalFiles = files.length;
      let completedFiles = 0;

      setUploadState({
        currentFile: "",
        fileProgress: 0,
        completedFiles: 1,
        totalFiles: files.length,
      });

      for (const file of files) {
        await uploadMultipartFile(file, selectedClient, uploadType, ({ percent }) => {
          setUploadState((prev) => ({
            ...prev,
            currentFile: file.name,
            fileProgress: percent,
          }));
        });

        setUploadState((prev) => ({
          ...prev,
          completedFiles: prev.completedFiles + 1,
          fileProgress: 0,
        }));
      }

      setIsUploading(false);
      setUploadComplete(true);

      setSelectedClient("");
      setFiles([]);

      setTimeout(() => {
        setUploadComplete(false);
      }, 5000);
    };

    uploadAll();
  }, [files]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-xl tracking-tight text-black">Timeless</div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
            />
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Photographer Details Dropdown */}
            {showUserDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
                className="absolute z-99 right-0 top-12 w-64 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md shadow-lg p-4"
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Name
                    </p>
                    <p className="text-sm text-black mt-1">Sarah Johnson</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-sm text-black mt-1">
                      sarah@timeless.photo
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="text-sm text-black mt-1">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-sm text-black mt-1">Los Angeles, CA</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <button
                      onClick={() => navigate("/login")}
                      className="text-xs text-gray-600 hover:text-black transition-colors rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl text-black">Client Folders</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowUploadModal(true);
                  setUploadStep(1);
                  setSelectedClient("");
                }}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-black hover:bg-gray-50 transition-colors rounded-xl"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Media</span>
              </button>
              <button
                onClick={() => navigate("/dashboard/add-client")}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-900 transition-colors rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFolders.map((folder, index) => (
              <FolderCard key={folder?.id} folder={folder} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Upload Media Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl text-black">Upload Media</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Select Client */}
            {uploadStep === 1 && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg mb-4 text-black">Select Client</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {folders.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => setSelectedClient(folder.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          selectedClient === folder.id
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <p className="font-medium text-black">{folder.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {folder.event_date} • {folder.event_location}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 py-3 bg-white border border-gray-300 text-black hover:bg-gray-50 transition-colors rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => selectedClient && setUploadStep(2)}
                    disabled={!selectedClient}
                    className="flex-1 py-3 bg-black text-white hover:bg-gray-900 transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Upload Type & Files */}
            {uploadStep === 2 && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg mb-4 text-black">Upload Photos</h3>

                  {/* Toggle between Raw and Edited */}
                  <div className="flex items-center justify-center gap-3 p-1 bg-gray-100 rounded-lg mb-6">
                    <button
                      type="button"
                      onClick={() => setUploadType("edited")}
                      className={`flex-1 py-2.5 rounded-md text-sm transition-all ${
                        uploadType === "edited"
                          ? "bg-white text-black shadow-sm"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      Edited Photos
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadType("raw")}
                      className={`flex-1 py-2.5 rounded-md text-sm transition-all ${
                        uploadType === "raw"
                          ? "bg-white text-black shadow-sm"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      Raw Photos
                    </button>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer relative">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-900 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      JPG, PNG, MP4 or MOV
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="absolute w-full h-full bg-[red] left-0 top-0  opacity-0"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setUploadStep(1)}
                    className="flex-1 py-3 bg-black text-white hover:bg-gray-900 transition-colors rounded-md"
                  >
                    Back
                  </button>
                  {/* <button
                    onClick={() => {
                      // Handle upload logic here
                      console.log(`Uploading ${uploadType} photos for client ${selectedClient}`);
                      setShowUploadModal(false);
                    }}
                    className="flex-1 py-3 bg-black text-white hover:bg-gray-900 transition-colors rounded-md"
                  >
                    Upload
                  </button> */}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Upload Complete Indicator - Bottom Right */}
      {isUploading && (
        <div className="fixed bottom-8 right-8 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-5 z-50">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-800">
              Uploading...
            </span>
            <span className="text-xs text-gray-500">
              {uploadState.completedFiles}/{uploadState.totalFiles}
            </span>
          </div>

          {/* Current File */}
          <div className="text-xs text-gray-500 truncate mb-2">
            {uploadState.currentFile || "Preparing upload..."}
          </div>

          {/* Current File Progress */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadState.fileProgress}%` }}
            />
          </div>
        </div>
      )}

      {uploadComplete && (
        <div className="fixed bottom-8 right-8 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-5 z-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-green-600">
              Upload Complete
            </span>
            <span className="text-xs text-gray-400">
              {formatTime(elapsedTime)}
            </span>
          </div>

          <div className="text-xs text-gray-500 mb-3">
            {uploadState.totalFiles} files uploaded successfully
          </div>

          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
