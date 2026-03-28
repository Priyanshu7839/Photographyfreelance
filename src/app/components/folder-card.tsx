import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FolderOpen, Edit, MoreVertical, MapPin, Calendar, User, ListChecks, PartyPopper } from "lucide-react";

interface ClientFolder {
  id: string;
  clientName: string;
  eventDate: string;
  photographerName: string;
  projectType: "Wedding" | "Pre-wedding";
  location: string;
}

interface FolderCardProps {
  folder: ClientFolder;
  index: number;
}

export function FolderCard({ folder, index }: FolderCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/client/${folder.id}`)}
      className="relative bg-white border border-gray-200 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
    >
      {/* Card Content */}
      <div className="space-y-2">
        <h3 className="text-xl text-black">{folder.name}</h3>
        <p className="text-sm text-gray-600">{folder.event_date}</p>
      </div>

      {/* Hover Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 right-0 bottom-0 bg-black/90 backdrop-blur-sm text-white p-4 rounded-b-lg pointer-events-none"
        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-xs">
            <User className="w-3 h-3" />
            <span>{folder.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <PartyPopper className="w-3 h-3" />
            <span>{folder.event_name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <ListChecks className="w-3 h-3" />
            <span>{folder.status}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-white/20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/client/${folder.id}`);
            }}
            className="flex items-center gap-1.5 text-xs hover:text-gray-300 transition-colors rounded-md"
            style={{ pointerEvents: 'auto' }}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Open</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle edit
            }}
            className="flex items-center gap-1.5 text-xs hover:text-gray-300 transition-colors rounded-md"
            style={{ pointerEvents: 'auto' }}
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle more options
            }}
            className="hover:text-gray-300 transition-colors rounded-md"
            style={{ pointerEvents: 'auto' }}
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}