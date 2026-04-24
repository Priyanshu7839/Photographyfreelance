import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Plus,
  Upload,
  Image,
  Video,
  CheckCircle2,
  Circle,
  Clock,
  User,
  X,
  ZoomIn,
  Music,
  MessageSquare,
  Send
} from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";

const mockProject = {
  id: 1,
  clientName: "Amara & James",
  eventType: "Wedding",
  eventDate: "2026-05-15",
  location: "Riverside Gardens, California",
  progress: 75,
  status: "In Progress" as const,
  totalSteps: 8,
  completedSteps: 6,
};

const workflowSteps = [
  {
    id: 1,
    name: "Initial Consultation",
    assignedTo: "Sarah Chen",
    status: "completed" as const,
    completedAt: "2026-03-20T10:30:00",
  },
  {
    id: 2,
    name: "Shot List Creation",
    assignedTo: "Sarah Chen",
    status: "completed" as const,
    completedAt: "2026-03-25T14:20:00",
  },
  {
    id: 3,
    name: "Pre-wedding Shoot",
    assignedTo: "Mike Rodriguez",
    status: "completed" as const,
    completedAt: "2026-04-05T16:45:00",
  },
  {
    id: 4,
    name: "Event Coverage",
    assignedTo: "Sarah Chen",
    status: "completed" as const,
    completedAt: "2026-05-15T23:30:00",
  },
  {
    id: 5,
    name: "Selection",
    assignedTo: "Emily Lee",
    status: "completed" as const,
    completedAt: "2026-05-18T11:15:00",
  },
  {
    id: 6,
    name: "Editing",
    assignedTo: "Mike Rodriguez",
    status: "completed" as const,
    completedAt: "2026-05-25T17:00:00",
  },
  {
    id: 7,
    name: "Color Grading",
    assignedTo: "Emily Lee",
    status: "in_progress" as const,
    completedAt: null,
  },
  {
    id: 8,
    name: "Final Delivery",
    assignedTo: "Sarah Chen",
    status: "pending" as const,
    completedAt: null,
  },
];

const mockAssets = [
  { id: 1, type: "photo", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", name: "Ceremony-001.jpg" },
  { id: 2, type: "photo", url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800", name: "Portrait-045.jpg" },
  { id: 3, type: "video", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800", name: "Highlights.mp4" },
  { id: 4, type: "photo", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800", name: "Reception-089.jpg" },
  { id: 5, type: "photo", url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800", name: "Details-012.jpg" },
  { id: 6, type: "photo", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800", name: "Venue-003.jpg" },
  { id: 7, type: "video", url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800", name: "Vows.mp4" },
  { id: 8, type: "photo", url: "https://images.unsplash.com/photo-1522673607212-51cb883a3d7d?w=800", name: "Family-026.jpg" },
];

const activityLog = [
  { id: 1, user: "Mike Rodriguez", action: "completed editing", timestamp: "2026-05-25T17:00:00" },
  { id: 2, user: "Emily Lee", action: "started color grading", timestamp: "2026-05-26T09:15:00" },
  { id: 3, user: "Sarah Chen", action: "uploaded 45 new photos", timestamp: "2026-05-24T14:30:00" },
  { id: 4, user: "Client", action: "commented on moodboard", timestamp: "2026-05-23T11:45:00" },
];

const comments = [
  { id: 1, user: "Amara", isClient: true, message: "We love the natural, candid shots! Please focus on those warm golden hour tones.", timestamp: "2026-05-23T11:45:00" },
  { id: 2, user: "Sarah Chen", isClient: false, message: "Noted! We'll emphasize warm tones in the color grading phase.", timestamp: "2026-05-23T14:20:00" },
  { id: 3, user: "James", isClient: true, message: "Can we add more photos of the venue decorations?", timestamp: "2026-05-24T09:30:00" },
];

export default function ProjectDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const [assetFilter, setAssetFilter] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<typeof mockAssets[0] | null>(null);
  const [clientNotes, setClientNotes] = useState("We want a romantic, timeless feel with warm tones. Focus on candid moments and emotional expressions.");
  const [selectedSong, setSelectedSong] = useState("Perfect by Ed Sheeran");
  const [newComment, setNewComment] = useState("");
  const [userRole] = useState<"client" | "editor">("editor"); // Toggle this to test different permissions

  const filteredAssets = mockAssets.filter((asset) => {
    if (assetFilter === "all") return true;
    if (assetFilter === "photos") return asset.type === "photo";
    if (assetFilter === "videos") return asset.type === "video";
    return true;
  });

  const handleMarkComplete = (stepId: number) => {
    console.log(`Mark step ${stepId} as complete`);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log("Adding comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 flex items-center justify-between backdrop-blur-sm bg-background/80"
      >
        <Link to="/" className="text-xl md:text-2xl tracking-tight">Midori Media</Link>
        <div className="flex gap-4 md:gap-8 items-center">
          <Link to="/" className="hidden sm:block text-sm opacity-70 hover:opacity-100 transition-opacity">Home</Link>
          <Link to="/dashboard" className="hidden sm:block text-sm opacity-70 hover:opacity-100 transition-opacity">Dashboard</Link>
          <a href="#team" className="hidden md:block text-sm opacity-70 hover:opacity-100 transition-opacity">Team</a>
          <Link to="/booking" className="bg-accent px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm hover:bg-accent/90 transition-colors rounded-full">
            Book a Shoot
          </Link>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-28 md:pt-32 px-4 md:px-6 max-w-7xl mx-auto pb-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-3 tracking-tight">{mockProject.clientName}</h1>
              <div className="flex flex-wrap items-center gap-4 text-base opacity-70">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm">
                    {mockProject.eventType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(mockProject.eventDate), "MMMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{mockProject.location}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 hover:border-white/20 transition-all">
                <Edit className="w-4 h-4" />
                <span>Edit Project</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-accent rounded-full text-sm hover:bg-accent/90 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-60 mb-1">Project Status</p>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    mockProject.status === "Completed"
                      ? "bg-accent/20 text-accent"
                      : mockProject.status === "In Progress"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-orange-500/20 text-orange-300"
                  }`}>
                    {mockProject.status}
                  </span>
                  <span className="opacity-80">{mockProject.progress}% Complete</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-60 mb-1">Workflow Progress</p>
                <p className="text-lg">{mockProject.completedSteps} of {mockProject.totalSteps} steps</p>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${mockProject.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto">
            {["overview", "assets", "workflow", "moodboard"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm capitalize transition-all relative ${
                  activeTab === tab
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-70"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Current Active Step */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4">Current Active Step</h3>
                  {workflowSteps.find(s => s.status === "in_progress") && (
                    <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/30 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-lg mb-1">{workflowSteps.find(s => s.status === "in_progress")?.name}</p>
                          <p className="text-sm opacity-60">Assigned to {workflowSteps.find(s => s.status === "in_progress")?.assignedTo}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">In Progress</span>
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {activityLog.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="opacity-80">{activity.user}</span>
                            <span className="opacity-60"> {activity.action}</span>
                          </p>
                          <p className="text-xs opacity-40 mt-1">
                            {format(new Date(activity.timestamp), "MMM dd, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Project Summary */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4">Project Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">Total Assets</p>
                      <p className="text-2xl">{mockAssets.length}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">Team Members</p>
                      <p className="text-2xl">3</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">Days Since Event</p>
                      <p className="text-2xl">3</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">Estimated Completion</p>
                      <p className="text-2xl">3 days</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Assets Tab */}
            {activeTab === "assets" && (
              <motion.div
                key="assets"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Asset Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div className="flex gap-2">
                    {["all", "photos", "videos"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setAssetFilter(filter)}
                        className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                          assetFilter === filter
                            ? "bg-accent text-background"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-accent rounded-full text-sm hover:bg-accent/90 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Assets</span>
                  </button>
                </div>

                {/* Asset Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredAssets.map((asset, index) => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedAsset(asset)}
                      className="group relative aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-accent/50 transition-all"
                    >
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="flex items-center gap-2 mb-1">
                            {asset.type === "photo" ? (
                              <Image className="w-4 h-4" />
                            ) : (
                              <Video className="w-4 h-4" />
                            )}
                            <span className="text-xs truncate">{asset.name}</span>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Drag & Drop Zone */}
                <div className="mt-8 border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-accent/30 hover:bg-white/5 transition-all cursor-pointer">
                  <Upload className="w-12 h-12 opacity-30 mx-auto mb-4" />
                  <p className="text-lg mb-2">Drop files here to upload</p>
                  <p className="text-sm opacity-50">or click to browse</p>
                </div>
              </motion.div>
            )}

            {/* Workflow Tab */}
            {activeTab === "workflow" && (
              <motion.div
                key="workflow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  {workflowSteps.map((step, index) => {
                    const isCompleted = step.status === "completed";
                    const isInProgress = step.status === "in_progress";
                    const isPending = step.status === "pending";
                    const isLocked = index > 0 && workflowSteps[index - 1].status !== "completed";

                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative"
                      >
                        {/* Connection Line */}
                        {index < workflowSteps.length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-white/10">
                            {isCompleted && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "100%" }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="w-full bg-accent"
                              />
                            )}
                          </div>
                        )}

                        <div className={`relative bg-white/5 border rounded-2xl p-6 transition-all ${
                          isCompleted
                            ? "border-accent/30 bg-accent/5"
                            : isInProgress
                            ? "border-blue-500/30 bg-blue-500/5"
                            : isLocked
                            ? "border-white/10 opacity-50"
                            : "border-white/10"
                        }`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              {/* Status Icon */}
                              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                isCompleted
                                  ? "bg-accent/20"
                                  : isInProgress
                                  ? "bg-blue-500/20"
                                  : "bg-white/5"
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle2 className="w-6 h-6 text-accent" />
                                ) : isInProgress ? (
                                  <Clock className="w-6 h-6 text-blue-300" />
                                ) : (
                                  <Circle className="w-6 h-6 opacity-30" />
                                )}
                              </div>

                              {/* Step Info */}
                              <div className="flex-1">
                                <h4 className="text-lg mb-2">{step.name}</h4>
                                <div className="flex flex-wrap items-center gap-3 text-sm opacity-60">
                                  <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4" />
                                    <span>{step.assignedTo}</span>
                                  </div>
                                  {step.completedAt && (
                                    <div className="flex items-center gap-1.5">
                                      <Clock className="w-4 h-4" />
                                      <span>{format(new Date(step.completedAt), "MMM dd, h:mm a")}</span>
                                    </div>
                                  )}
                                </div>

                                {/* Status Badge */}
                                <div className="mt-3">
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                                    isCompleted
                                      ? "bg-accent/20 text-accent"
                                      : isInProgress
                                      ? "bg-blue-500/20 text-blue-300"
                                      : isLocked
                                      ? "bg-white/5 text-white/40"
                                      : "bg-orange-500/20 text-orange-300"
                                  }`}>
                                    {isCompleted ? "Completed" : isInProgress ? "In Progress" : isLocked ? "Locked" : "Pending"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            {!isCompleted && !isLocked && userRole === "editor" && (
                              <button
                                onClick={() => handleMarkComplete(step.id)}
                                className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-accent/10 hover:border-accent/30 transition-all whitespace-nowrap"
                              >
                                Mark as Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Moodboard Tab */}
            {activeTab === "moodboard" && (
              <motion.div
                key="moodboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Client Notes */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4">Client Notes</h3>
                  <textarea
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors min-h-[120px] resize-y"
                    placeholder="Add notes about the project vision, style preferences, must-have shots..."
                  />
                </div>

                {/* Song Selection */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    <span>Song Selection</span>
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={selectedSong}
                      onChange={(e) => setSelectedSong(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Enter song title and artist..."
                    />
                    <button className="px-6 py-3 bg-accent rounded-xl hover:bg-accent/90 transition-colors">
                      Save
                    </button>
                  </div>
                </div>

                {/* Reference Uploads */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4">Reference Materials</h3>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-accent/30 hover:bg-white/5 transition-all cursor-pointer">
                    <Upload className="w-10 h-10 opacity-30 mx-auto mb-3" />
                    <p className="text-base mb-1">Upload reference images, videos, or links</p>
                    <p className="text-sm opacity-50">Share inspiration for editing style, color grading, or compositions</p>
                  </div>
                </div>

                {/* Comments Thread */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Discussion</span>
                  </h3>

                  {/* Comments List */}
                  <div className="space-y-4 mb-6">
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl ${
                          comment.isClient ? "bg-accent/10 border border-accent/20" : "bg-white/5"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                            comment.isClient ? "bg-accent/20" : "bg-white/10"
                          }`}>
                            {comment.user.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">{comment.user}</span>
                              {comment.isClient && (
                                <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">Client</span>
                              )}
                              <span className="text-xs opacity-40">
                                {format(new Date(comment.timestamp), "MMM dd, h:mm a")}
                              </span>
                            </div>
                            <p className="text-sm opacity-80">{comment.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={handleAddComment}
                      className="px-4 py-3 bg-accent rounded-xl hover:bg-accent/90 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox for Asset Preview */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAsset(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedAsset(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedAsset.url}
                alt={selectedAsset.name}
                className="w-full h-auto rounded-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-lg">{selectedAsset.name}</p>
                <p className="text-sm opacity-50 capitalize">{selectedAsset.type}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
