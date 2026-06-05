import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Search, Calendar, Clock, Users, ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { getDashboardClients } from "../../Utils/Apicalls";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const gradients = [
  "from-slate-950 via-slate-900 via-slate-800 to-indigo-950",
  "from-zinc-950 via-zinc-900 via-purple-900 to-fuchsia-950",
  "from-neutral-950 via-neutral-900 via-blue-900 to-indigo-950",
  "from-stone-950 via-stone-900 via-emerald-900 to-teal-950",
  "from-gray-950 via-gray-900 via-cyan-900 to-blue-950",

  "from-indigo-950 via-indigo-900 via-violet-900 to-purple-950",
  "from-violet-950 via-violet-900 via-fuchsia-900 to-pink-950",
  "from-purple-950 via-purple-900 via-indigo-900 to-blue-950",
  "from-blue-950 via-blue-900 via-cyan-900 to-sky-950",
  "from-cyan-950 via-cyan-900 via-teal-900 to-emerald-950",

  "from-emerald-950 via-emerald-900 via-green-900 to-lime-950",
  "from-green-950 via-green-900 via-emerald-900 to-teal-950",
  "from-teal-950 via-teal-900 via-cyan-900 to-blue-950",
  "from-sky-950 via-sky-900 via-blue-900 to-indigo-950",
  "from-fuchsia-950 via-fuchsia-900 via-violet-900 to-purple-950",

  "from-rose-950 via-rose-900 via-pink-900 to-fuchsia-950",
  "from-pink-950 via-pink-900 via-rose-900 to-red-950",
  "from-red-950 via-red-900 via-orange-900 to-amber-950",
  "from-orange-950 via-orange-900 via-red-900 to-rose-950",
  "from-amber-950 via-amber-900 via-orange-900 to-red-950",

  "from-indigo-950 via-slate-900 via-zinc-900 to-violet-950",
  "from-blue-950 via-slate-900 via-gray-900 to-cyan-950",
  "from-emerald-950 via-slate-900 via-zinc-900 to-teal-950",
  "from-fuchsia-950 via-zinc-900 via-slate-900 to-purple-950",
  "from-rose-950 via-zinc-900 via-neutral-900 to-pink-950",

  "from-slate-950 via-indigo-950 via-purple-900 to-fuchsia-900",
  "from-slate-950 via-cyan-950 via-blue-900 to-indigo-900",
  "from-slate-950 via-emerald-950 via-teal-900 to-cyan-900",
  "from-slate-950 via-rose-950 via-pink-900 to-fuchsia-900",
  "from-slate-950 via-orange-950 via-red-900 to-rose-900",

  "from-zinc-950 via-indigo-900 via-blue-900 to-sky-950",
  "from-zinc-950 via-violet-900 via-purple-900 to-fuchsia-950",
  "from-zinc-950 via-teal-900 via-emerald-900 to-green-950",
  "from-zinc-950 via-cyan-900 via-blue-900 to-indigo-950",
  "from-zinc-950 via-pink-900 via-rose-900 to-red-950",

  "from-neutral-950 via-slate-900 via-indigo-900 to-purple-950",
  "from-neutral-950 via-blue-900 via-cyan-900 to-teal-950",
  "from-neutral-950 via-emerald-900 via-green-900 to-lime-950",
  "from-neutral-950 via-rose-900 via-pink-900 to-fuchsia-950",
  "from-neutral-950 via-orange-900 via-red-900 to-rose-950",

  "from-stone-950 via-violet-900 via-indigo-900 to-blue-950",
  "from-stone-950 via-cyan-900 via-teal-900 to-emerald-950",
  "from-stone-950 via-fuchsia-900 via-purple-900 to-indigo-950",
  "from-stone-950 via-rose-900 via-red-900 to-orange-950",
  "from-stone-950 via-sky-900 via-blue-900 to-indigo-950",

  "from-black via-slate-900 via-indigo-900 to-violet-950",
  "from-black via-zinc-900 via-purple-900 to-fuchsia-950",
  "from-black via-gray-900 via-cyan-900 to-blue-950",
  "from-black via-neutral-900 via-emerald-900 to-teal-950",
  "from-black via-stone-900 via-rose-900 to-red-950"
];

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  
  const [clients, setClients] = useState([]);
const [loading, setLoading] =
  useState(true);

  useEffect(() => {
  const fetchClients = async () => {
    try {
      const response =
        await getDashboardClients();

        console.log(response.data)

      setClients(response.data);
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchClients();
}, []);



    const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);



  return (
    <div className="relative bg-background text-foreground min-h-screen">
      {/* Navigation */}
     <Navbar/>

      {/* Main Content */}
      <div className="pt-28 md:pt-32 px-4 md:px-6 max-w-7xl mx-auto pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex items-start justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight">Client Projects</h1>
            <p className="text-lg md:text-xl opacity-70">Manage workflows and track deliverables</p>
          </div>
         {user.role && <Link
            to="/onboarding"
            className="flex items-center gap-2 px-6 py-3.5 bg-accent rounded-full hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span>Create Project</span>
          </Link>}
        </motion.div>

        {/* Search & Filters */}
       {user.role && <motion.div
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
}
        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {clients?.map((project, index) => (
            <Link
              key={project.client_id}
              to={`/project/${project.client_id}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`group relative aspect-[4/3] rounded-[16px] overflow-hidden cursor-pointer bg-gradient-to-br ${gradients[(project.client_id - 1) % gradients.length]}`}
              >
                {/* Cover Image */}
               {project?.coverImage && <img
                  src={project.coverImage}
                 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />}

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-300" />

                {/* Default State - Name & Date (Bottom Left) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 group-hover:opacity-0">
                  <h3 className="text-xl md:text-2xl mb-1 tracking-tight capitalize">
                    {project.client_name}
                  </h3>
                  <p className="text-sm opacity-70 capitalize">
                    {project.event_type} · {format(new Date(project.event_date), "MMM dd")}
                  </p>
                </div>

                {/* Hover State - Details & CTA */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {/* Top Section - Status & Team */}
                  <div className="space-y-4">
                    {/* Status */}
                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="opacity-80">{project.current_step}</span>
                        <span className="opacity-90 tabular-nums">{project.progress_percentage}%</span>
                      </div>
                      <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            project.progress_percentage === 100
                              ? "bg-accent"
                              : project.progress_percentage < 30
                              ? "bg-orange-400"
                              : "bg-accent/80"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Team Avatars */}
                    <div className="flex -space-x-2.5">
                      {project?.assigned_members?.slice(0, 3)?.map((member, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/40 to-accent/20 border-2 border-white/20 flex items-center justify-center text-xs backdrop-blur-sm"
                        >
                          {member}
                        </div>
                      ))}
                      {project?.assigned_members.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/20 flex items-center justify-center text-xs backdrop-blur-sm">
                          +{project?.assigned_members.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Section - Name, Date & CTA */}
                  <div>
                    <h3 className="text-xl md:text-2xl mb-1 tracking-tight capitalize">
                      {project.client_name}
                    </h3>
                    <p className="text-sm opacity-70 mb-4 capitalize">
                      {project.event_type} · {format(new Date(project.event_date), "MMM dd")}
                    </p>

                    {/* View Project Button */}
                    <div className="flex items-center gap-2 text-sm">
                      <span>View Project</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {clients?.length === 0 && (
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
