import { useState } from "react";
import { motion } from "motion/react";
import { Search, Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";

const projects = [
  {
    id: 1,
    clientName: "Amara & James",
    eventType: "Wedding",
    eventDate: "2026-05-15",
    progress: 75,
    currentStep: "Editing in progress",
    assignedTeam: ["SC", "MR"],
    totalSteps: 8,
    completedSteps: 6,
  },
  {
    id: 2,
    clientName: "Priya & Rohan",
    eventType: "Pre-wedding",
    eventDate: "2026-04-25",
    progress: 40,
    currentStep: "Client review pending",
    assignedTeam: ["EL"],
    totalSteps: 6,
    completedSteps: 2,
  },
  {
    id: 3,
    clientName: "Sophie & Alex",
    eventType: "Wedding",
    eventDate: "2026-06-08",
    progress: 25,
    currentStep: "Shot list preparation",
    assignedTeam: ["JP", "OM", "DK"],
    totalSteps: 8,
    completedSteps: 2,
  },
  {
    id: 4,
    clientName: "Isabella & Marco",
    eventType: "Wedding",
    eventDate: "2026-03-20",
    progress: 100,
    currentStep: "Delivered",
    assignedTeam: ["SC", "EL"],
    totalSteps: 8,
    completedSteps: 8,
  },
  {
    id: 5,
    clientName: "Maya & Liam",
    eventType: "Pre-wedding",
    eventDate: "2026-05-03",
    progress: 60,
    currentStep: "Post-production",
    assignedTeam: ["MR"],
    totalSteps: 6,
    completedSteps: 4,
  },
  {
    id: 6,
    clientName: "Zara & Aiden",
    eventType: "Wedding",
    eventDate: "2026-07-12",
    progress: 12,
    currentStep: "Initial consultation",
    assignedTeam: ["OM"],
    totalSteps: 8,
    completedSteps: 1,
  },
];

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && project.progress < 30) ||
      (statusFilter === "in-progress" && project.progress >= 30 && project.progress < 100) ||
      (statusFilter === "completed" && project.progress === 100);
    const matchesEventType = eventTypeFilter === "all" || project.eventType.toLowerCase() === eventTypeFilter;
    return matchesSearch && matchesStatus && matchesEventType;
  });

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
          <Link to="/dashboard" className="hidden sm:block text-sm opacity-100 transition-opacity border-b border-accent">Dashboard</Link>
          <a href="#team" className="hidden md:block text-sm opacity-70 hover:opacity-100 transition-opacity">Team</a>
          <Link to="/booking" className="bg-accent px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm hover:bg-accent/90 transition-colors rounded-full">
            Book a Shoot
          </Link>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-28 md:pt-32 px-4 md:px-6 max-w-7xl mx-auto pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight">Client Projects</h1>
          <p className="text-lg md:text-xl opacity-70">Manage workflows and track deliverables</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3.5 text-base focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              {["all", "pending", "in-progress", "completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-5 py-2 rounded-full text-sm transition-all capitalize ${
                    statusFilter === status
                      ? "bg-accent text-background"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {status === "in-progress" ? "In Progress" : status}
                </button>
              ))}
            </div>
            <div className="w-px h-8 bg-white/10 hidden md:block" />
            <div className="flex gap-2">
              {["all", "wedding", "pre-wedding"].map((type) => (
                <button
                  key={type}
                  onClick={() => setEventTypeFilter(type)}
                  className={`px-5 py-2 rounded-full text-sm transition-all capitalize ${
                    eventTypeFilter === type
                      ? "bg-white/10 border border-white/20"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent/30 hover:bg-white/[0.07] transition-all duration-300"
            >
              {/* Client Name & Type */}
              <div className="mb-4">
                <h3 className="text-2xl mb-2 tracking-tight group-hover:text-accent/90 transition-colors">
                  {project.clientName}
                </h3>
                <div className="flex items-center gap-3 text-sm opacity-60">
                  <span className={`px-3 py-1 rounded-full ${
                    project.eventType === "Wedding"
                      ? "bg-accent/20 text-accent"
                      : "bg-purple-500/20 text-purple-300"
                  }`}>
                    {project.eventType}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(project.eventDate), "MMM dd")}</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <div className="flex items-center gap-1.5 opacity-60">
                    <Clock className="w-4 h-4" />
                    <span>{project.currentStep}</span>
                  </div>
                  <span className="opacity-80">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      project.progress === 100
                        ? "bg-accent"
                        : project.progress < 30
                        ? "bg-orange-500"
                        : "bg-accent/60"
                    }`}
                  />
                </div>
                <p className="text-xs opacity-50 mt-2">
                  {project.completedSteps} of {project.totalSteps} steps
                </p>
              </div>

              {/* Team */}
              <div className="mb-5">
                <p className="text-xs opacity-50 uppercase tracking-wider mb-2">Team</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.assignedTeam.map((member, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center text-xs"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs opacity-50">
                    {project.assignedTeam.length} {project.assignedTeam.length === 1 ? "member" : "members"}
                  </span>
                </div>
              </div>

              {/* Action */}
              <Link
                to={`/project/${project.id}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-full text-sm hover:bg-accent/10 hover:border-accent/30 transition-all group/btn"
              >
                <span>View Project</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Users className="w-16 h-16 opacity-20 mx-auto mb-4" />
            <p className="text-lg opacity-50">No projects match your filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
