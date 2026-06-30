import { useEffect, useState ,useRef} from "react";
import { motion, AnimatePresence } from "motion/react";
import UploadAssetsModal from '../components/UploadAssetsModal'
import UploadProgressToast from '../components/UploadProgressToast'
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
  Send,
  Camera,
  Zap,
  Mic,
  Move,
  Package,
  FileText,
  DollarSign,
  Shield,
  CheckSquare,
  Square as SquareIcon,
  Download,
  MapPin,
  Car,
  Navigation,
  CheckCircle,
  Settings,
  Palette,
  Sparkles,
  Users,
  Share2,
  Eye,
  Link2,
  CalendarClock,
  LogOut,
  Music2,
  Trash2,
  MapPinHouse,
  DownloadIcon,
  Save,
  PenLine,
  Check,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { addMinutes, format } from "date-fns";
import { toast } from "sonner";
import {
  addMoodboardDiscussion,
  addMoodboardSong,
  addProjectStep,
  addTravelDiscussion,
  assignGears,
  deleteMoodboardSong,
  downloadClientLicense,
  downloadFile,
  getAllGears,
  getClientAssets,
  getClientHeader,
  getClientLicenses,
  getClientNotes,
  getClientOverview,
  getClientWorkflow,
  getContractStatus,
  getMoodboardAssets,
  getMoodboardDiscussions,
  getMoodboardSongs,
  getProductionOverview,
  getProductionSetup,
  getTeamMembers,
  getTravelData,
  getTravelDiscussions,
  signContract,
  updateClient,
  updateClientNotes,
  updateWorkflowStatus,
  uploadMultipartFileClientassets,
} from "../../Utils/Apicalls";
import Navbar from "../components/Navbar";

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


const mockAssets = [
  {
    id: 1,
    type: "photo",
    set: "edited",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    name: "Ceremony-001.jpg",
  },
  {
    id: 2,
    type: "photo",
    set: "edited",
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
    name: "Portrait-045.jpg",
  },
  {
    id: 3,
    type: "video",
    set: "edited",
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
    name: "Highlights.mp4",
  },
  {
    id: 4,
    type: "photo",
    set: "edited",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    name: "Reception-089.jpg",
  },
  {
    id: 5,
    type: "photo",
    set: "unedited",
    url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800",
    name: "Details-012.jpg",
  },
  {
    id: 6,
    type: "photo",
    set: "unedited",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
    name: "Venue-003.jpg",
  },
  {
    id: 7,
    type: "video",
    set: "unedited",
    url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    name: "Vows.mp4",
  },
  {
    id: 8,
    type: "photo",
    set: "unedited",
    url: "https://images.unsplash.com/photo-1522673607212-51cb883a3d7d?w=800",
    name: "Family-026.jpg",
  },
];

const activityLog = [
  {
    id: 1,
    user: "Mike Rodriguez",
    action: "completed editing",
    timestamp: "2026-05-25T17:00:00",
  },
  {
    id: 2,
    user: "Emily Lee",
    action: "started color grading",
    timestamp: "2026-05-26T09:15:00",
  },
  {
    id: 3,
    user: "Sarah Chen",
    action: "uploaded 45 new photos",
    timestamp: "2026-05-24T14:30:00",
  },
  {
    id: 4,
    user: "Client",
    action: "commented on moodboard",
    timestamp: "2026-05-23T11:45:00",
  },
];

const comments = [
  {
    id: 1,
    user: "Amara",
    isClient: true,
    message:
      "We love the natural, candid shots! Please focus on those warm golden hour tones.",
    timestamp: "2026-05-23T11:45:00",
  },
  {
    id: 2,
    user: "Sarah Chen",
    isClient: false,
    message: "Noted! We'll emphasize warm tones in the color grading phase.",
    timestamp: "2026-05-23T14:20:00",
  },
  {
    id: 3,
    user: "James",
    isClient: true,
    message: "Can we add more photos of the venue decorations?",
    timestamp: "2026-05-24T09:30:00",
  },
];

// Vendor Media Access data
const vendorCollections = [
  {
    id: 1,
    name: "Makeup Artist Collection",
    vendorType: "Makeup Artist",
    vendorName: "Bella Beauty Studio",
    icon: Palette,
    imageCount: 24,
    sharedDate: "2026-05-20",
    coverImage:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800",
        name: "Bridal-Makeup-001.jpg",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
        name: "Bridal-Makeup-002.jpg",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800",
        name: "Bridal-Makeup-003.jpg",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800",
        name: "Bridal-Makeup-004.jpg",
      },
    ],
    permissions: { download: true, watermark: false, quality: "high" },
    expiryDate: "2026-06-20",
  },
  {
    id: 2,
    name: "Decor Collection",
    vendorType: "Decorator",
    vendorName: "Elegant Events Decor",
    icon: Sparkles,
    imageCount: 36,
    sharedDate: "2026-05-19",
    coverImage:
      "https://images.unsplash.com/photo-1519167758481-83f29da1a3f0?w=800",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1519167758481-83f29da1a3f0?w=800",
        name: "Decor-Setup-001.jpg",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
        name: "Decor-Setup-002.jpg",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
        name: "Decor-Setup-003.jpg",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        name: "Decor-Setup-004.jpg",
      },
    ],
    permissions: { download: true, watermark: true, quality: "social" },
    expiryDate: "2026-06-19",
  },
  {
    id: 3,
    name: "Venue Collection",
    vendorType: "Venue",
    vendorName: "Riverside Gardens",
    icon: MapPin,
    imageCount: 18,
    sharedDate: "2026-05-18",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        name: "Venue-Exterior-001.jpg",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
        name: "Venue-Interior-001.jpg",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
        name: "Venue-Garden-001.jpg",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800",
        name: "Venue-Details-001.jpg",
      },
    ],
    permissions: { download: true, watermark: false, quality: "high" },
    expiryDate: "2026-06-18",
  },
  {
    id: 4,
    name: "Planner Collection",
    vendorType: "Wedding Planner",
    vendorName: "Perfect Day Planning",
    icon: Users,
    imageCount: 42,
    sharedDate: "2026-05-17",
    coverImage:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
        name: "Full-Setup-001.jpg",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        name: "Full-Setup-002.jpg",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1522673607212-51cb883a3d7d?w=800",
        name: "Full-Setup-003.jpg",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
        name: "Full-Setup-004.jpg",
      },
    ],
    permissions: { download: true, watermark: false, quality: "high" },
    expiryDate: "2026-06-17",
  },
];

// Gear data - Person-based production setup
const crewMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Lead Photographer",
    avatar: "SC",
    color: "accent",
    gear: {
      cameras: ["Sony A7 IV", "Sony A7S III"],
      lenses: ["Sony 24-70mm f/2.8 GM II", "Sony 85mm f/1.4 GM"],
      lighting: ["Godox AD600 Pro"],
      audio: [],
      stabilization: ["Manfrotto Tripod"],
      accessories: ["ND Filters", "Extra Batteries", "Memory Cards (256GB x2)"],
    },
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    role: "Videographer",
    avatar: "MR",
    color: "blue",
    gear: {
      cameras: ["Canon EOS R5"],
      lenses: ["Canon 70-200mm f/2.8", "Canon 35mm f/1.4"],
      lighting: ["Aputure 300d II"],
      audio: ["Rode Wireless GO II", "Zoom H6 Recorder"],
      stabilization: ["DJI RS 3 Pro Gimbal"],
      accessories: ["Reflectors & Diffusers", "Memory Cards (256GB x2)"],
    },
  },
  {
    id: 3,
    name: "Emily Lee",
    role: "Second Shooter",
    avatar: "EL",
    color: "purple",
    gear: {
      cameras: ["Sony A7 IV"],
      lenses: ["Sony 16-35mm f/2.8 GM"],
      lighting: [],
      audio: [],
      stabilization: ["Manfrotto Tripod"],
      accessories: ["Extra Batteries"],
    },
  },
];

// Available gear for admin selection
const availableGear = {
  cameras: [
    "Sony A7 IV",
    "Canon EOS R5",
    "Sony A7S III",
    "DJI Ronin 4D",
    "Sony FX3",
    "Canon R6",
  ],
  lenses: [
    "Sony 24-70mm f/2.8 GM II",
    "Canon 70-200mm f/2.8",
    "Sony 85mm f/1.4 GM",
    "Canon 35mm f/1.4",
    "Sony 16-35mm f/2.8 GM",
    "Canon 24mm f/1.4",
  ],
  lighting: [
    "Godox AD600 Pro",
    "Aputure 300d II",
    "Profoto B10",
    "RGB Panel Lights",
  ],
  audio: [
    "Rode Wireless GO II",
    "Zoom H6 Recorder",
    "Sennheiser MKE 600",
    "Rode Wireless PRO",
  ],
  stabilization: [
    "DJI RS 3 Pro Gimbal",
    "Manfrotto Tripod",
    "Slider & Dolly",
    "DJI Ronin RS4",
  ],
  accessories: [
    "ND Filters",
    "Reflectors & Diffusers",
    "Extra Batteries",
    "Memory Cards (256GB x2)",
    "Memory Cards (256GB x4)",
    "Monitor (Atomos Ninja V)",
  ],
};

// Travel tracking data
const travelSettings = {
  studioLocation: "Midori Media Studio, Downtown LA",
  shootLocation: "Riverside Gardens, California",
  freeAllowanceMiles: 20,
  ratePerMile: 2,
  totalDistance: 42,
};

const crewTravelData = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Lead Photographer",
    avatar: "SC",
    color: "accent",
    distance: 42,
    timeline: [
      {
        id: 1,
        step: "Assigned to Shoot",
        status: "completed",
        timestamp: "2026-05-15T08:00:00",
      },
      {
        id: 2,
        step: "Out for Shoot",
        status: "completed",
        timestamp: "2026-05-15T08:40:00",
      },
      {
        id: 3,
        step: "Arrived at Location",
        status: "completed",
        timestamp: "2026-05-15T09:32:00",
      },
      {
        id: 4,
        step: "Setup Complete",
        status: "completed",
        timestamp: "2026-05-15T09:50:00",
      },
      {
        id: 5,
        step: "Shoot Wrapped",
        status: "completed",
        timestamp: "2026-05-15T18:30:00",
      },
    ],
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    role: "Videographer",
    avatar: "MR",
    color: "blue",
    distance: 42,
    timeline: [
      {
        id: 1,
        step: "Assigned to Shoot",
        status: "completed",
        timestamp: "2026-05-15T08:00:00",
      },
      {
        id: 2,
        step: "Out for Shoot",
        status: "completed",
        timestamp: "2026-05-15T08:35:00",
      },
      {
        id: 3,
        step: "Arrived at Location",
        status: "completed",
        timestamp: "2026-05-15T09:28:00",
      },
      {
        id: 4,
        step: "Setup Complete",
        status: "completed",
        timestamp: "2026-05-15T09:55:00",
      },
      {
        id: 5,
        step: "Shoot Wrapped",
        status: "completed",
        timestamp: "2026-05-15T18:45:00",
      },
    ],
  },
  {
    id: 3,
    name: "Emily Lee",
    role: "Second Shooter",
    avatar: "EL",
    color: "purple",
    distance: 38,
    timeline: [
      {
        id: 1,
        step: "Assigned to Shoot",
        status: "completed",
        timestamp: "2026-05-15T08:00:00",
      },
      {
        id: 2,
        step: "Out for Shoot",
        status: "completed",
        timestamp: "2026-05-15T09:15:00",
      },
      {
        id: 3,
        step: "Arrived at Location",
        status: "completed",
        timestamp: "2026-05-15T10:05:00",
      },
      {
        id: 4,
        step: "Setup Complete",
        status: "completed",
        timestamp: "2026-05-15T10:20:00",
      },
      {
        id: 5,
        step: "Shoot Wrapped",
        status: "completed",
        timestamp: "2026-05-15T17:30:00",
      },
    ],
  },
];

const calculateTravelFee = (distance: number) => {
  const billableDistance = Math.max(
    0,
    distance - travelSettings.freeAllowanceMiles,
  );
  return billableDistance * travelSettings.ratePerMile;
};

const getTotalTravelFees = () => {
  return crewTravelData.reduce(
    (total, crew) => total + calculateTravelFee(crew.distance),
    0,
  );
};

// Invoice data
const totalTravelFees = getTotalTravelFees();
const totalBillableMiles = crewTravelData.reduce((sum, crew) => {
  return sum + Math.max(0, crew.distance - travelSettings.freeAllowanceMiles);
}, 0);
const baseSubtotal = 8200;

const invoiceData = {
  invoiceNumber: "INV-2026-0542",
  issueDate: "2026-03-15",
  dueDate: "2026-05-01",
  businessName: "Midori Media",
  items: [
    {
      description: "Wedding Shoot Package",
      quantity: 1,
      rate: 3500,
      amount: 3500,
    },
    { description: "Pre-wedding Shoot", quantity: 1, rate: 1200, amount: 1200 },
    {
      description: "Editing & Color Grading (500+ photos)",
      quantity: 1,
      rate: 800,
      amount: 800,
    },
    {
      description: "Highlight Video (5-7 min)",
      quantity: 1,
      rate: 1500,
      amount: 1500,
    },
    {
      description: `Travel & Driving Charges (${totalBillableMiles} billable miles @ $${travelSettings.ratePerMile}/mile)`,
      quantity: 1,
      rate: totalTravelFees,
      amount: totalTravelFees,
    },
    {
      description: "Additional Coverage Hours",
      quantity: 3,
      rate: 200,
      amount: 600,
    },
  ],
  subtotal: baseSubtotal + totalTravelFees,
  tax: Math.round((baseSubtotal + totalTravelFees) * 0.1),
  discount: 500,
  total:
    baseSubtotal +
    totalTravelFees +
    Math.round((baseSubtotal + totalTravelFees) * 0.1) -
    500,
  paymentStatus: "Partially Paid" as const,
  paymentMethod: "Bank Transfer",
  amountPaid: 4000,
  notes:
    "Thank you for choosing Midori Media for your special day. We're honored to capture your memories!",
};

const ProjectDetailShimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-white/10 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  </div>
);

const ProjectDetailCardShimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-white/5 border border-white/10 rounded-xl ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

export default function ProjectDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const [setFilter, setSetFilter] = useState("edited");
  const [assetFilter, setAssetFilter] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<
    (typeof mockAssets)[0] | null
  >(null);
  const [selectedSong, setSelectedSong] = useState("Perfect by Ed Sheeran");
  const [userRole] = useState<"client" | "editor">("client"); // Toggle this to test different permissions
  const [editingCrew, setEditingCrew] = useState<number | null>(null);
  const [selectedTravelCrew, setSelectedTravelCrew] = useState<number>(
    crewTravelData[0].id,
  );
  const [travelConfig, setTravelConfig] = useState(travelSettings);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [vendorAgreed, setVendorAgreed] = useState(false);
  const [selectedVendorCollection, setSelectedVendorCollection] = useState<
    (typeof vendorCollections)[0] | null
  >(null);
  const [selectedVendorImage, setSelectedVendorImage] = useState<any>(null);
  const [assetView, setAssetView] = useState<"client" | "vendor">("client");

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSet = asset.set === setFilter;
    const matchesType =
      assetFilter === "all" ||
      (assetFilter === "photos" && asset.type === "photo") ||
      (assetFilter === "videos" && asset.type === "video");
    return matchesSet && matchesType;
  });



    const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);



  



const toggleGearForCrew = (
  crewId,
  category,
  item
) => {
  setProductionSetup((prev) =>
    prev.map((member) => {
      if (
        member.member_id !== crewId
      ) {
        return member;
      }

      const currentGear =
        member.gears_using[
          category
        ] || [];

      const hasItem =
        currentGear.some(
          (gear) =>
            gear.gear_id ===
            item.gear_id
        );

      return {
        ...member,
        gears_using: {
          ...member.gears_using,
          [category]: hasItem
            ? currentGear.filter(
                (gear) =>
                  gear.gear_id !==
                  item.gear_id
              )
            : [
                ...currentGear,
                item,
              ],
        },
      };
    })
  );
};

  const getRoleColor = (color: string) => {
    const colors: Record<string, string> = {
      accent: "bg-accent/20 text-accent border-accent/30",
      blue: "bg-[#2d5f4f]/20 text-emerald-200 border-blue-500/30",
      purple: "bg-[#2d5f4f]/15 text-emerald-100 border-purple-500/30",
      orange: "bg-amber-500/10 text-amber-200 border-orange-500/30",
    };
    return colors[color] || colors.accent;
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      cameras: Camera,
      lenses: Camera,
      lighting: Zap,
      audio: Mic,
      stabilization: Move,
      accessories: Package,
    };
    return icons[category] || Package;
  };

  const { clientId } = useParams();

  const [clientData, setClientData] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchClientHeader = async () => {
      try {
        const response = await getClientHeader(clientId);
        setClientData(response.data);
        console.log(response.data)
        
      } catch (error) {
        console.error(error);

        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    

    fetchClientHeader();
  }, [clientId]);

  const handleWorkflowAction = async (action,step_id) => {

    
    try {
      const response = await updateWorkflowStatus(clientId,action,step_id);

      toast.success(response.message);

      // Optional:
      // Refresh overview/header data

      fetchClientHeader()
      fetchWorkflow()
      fetchOverview()

      
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ------tabs api calls--------------

  const [overviewData, setOverviewData] = useState(null);

  const [workflowData, setWorkflowData] = useState(null);

  const [workflowLoading, setWorkflowLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [travelmessage, settravelMessage] =
  useState("");

const [
  sendingtravelMessage,
  setSendingtravelMessage,
] = useState(false);

  const [sendingMessage, setSendingMessage] = useState(false);

  const [discussions, setDiscussions] = useState([]);

  const [discussionsLoading, setDiscussionsLoading] = useState(false);

  const [clientNotes, setClientNotes] = useState("");
  const [newClientNotes,setNewClientNotes] = useState("")

  const [clientNotesLoading, setClientNotesLoading] = useState(false);

  const [savingNotes, setSavingNotes] = useState(false);

  const [songName, setSongName] = useState("");

  const [addingSong, setAddingSong] = useState(false);

  const [songs, setSongs] =
  useState([]);

  const [
  travelDiscussions,
  setTravelDiscussions,
] = useState([]);

const [
  travelLoading,
  setTravelLoading,
] = useState(false);





const [songsLoading,
  setSongsLoading] =
  useState(false);

  const [allGears, setAllGears] =
  useState({});

const [
  gearsLoading,
  setGearsLoading,
] = useState(false);

const [
  productionSetup,
  setProductionSetup,
] = useState(null);

const [
  productionLoading,
  setProductionLoading,
] = useState(false);

const [
  productionOverview,
  setProductionOverview,
] = useState(null);

const [
  overviewLoading,
  setOverviewLoading,
] = useState(false);

const [
  travelData,
  setTravelData,
] = useState(null);

const [
  travelDataLoading,
  setTravelDataLoading,
] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [moodboardModal,setMoodboardModal] = useState(false)


  const [crewSetup, setCrewSetup] = useState(crewMembers);


  const fetchTravelData =
  async () => {
    try {
      setTravelDataLoading(
        true
      );

      const response =
        await getTravelData(
          clientId
        );

      setTravelData(
        response.data
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setTravelDataLoading(
        false
      );
    }
  };

  const fetchProductionOverview =
  async () => {
    try {
      setOverviewLoading(true);

      const response =
        await getProductionOverview(
          clientId
        );

      setProductionOverview(
        response.data
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setOverviewLoading(false);
    }
  };


  const handleSaveGears =
  async (member) => {
    try {
      const response =
        await assignGears(
          clientId,
          member.gears_using
        );

      toast.success(
        response.message
      );

      setEditingCrew(null);
    fetchProductionOverview()

      fetchProductionSetup();
    } catch (error) {
      toast.error(
        error.message
      );
    }
  };

const fetchProductionSetup =
  async () => {
    try {
      setProductionLoading(
        true
      );

      const response =
        await getProductionSetup(
          clientId
        );

        console.log(response.data)

      setProductionSetup(
        response.data
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setProductionLoading(
        false
      );
    }
  };


const fetchAllGears =
  async () => {
    try {
      setGearsLoading(true);

      const response =
        await getAllGears();

      setAllGears(
        response.data
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setGearsLoading(false);
    }
  };

    const fetchMoodboardSongs =
  async () => {
    try {
      setSongsLoading(true);

      const response =
        await getMoodboardSongs(
          clientId
        );

        console.log(response.data)

      setSongs(
        response.data
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setSongsLoading(false);
    }
  };

  const handleAddSong =
  async () => {

if(user.role ){
  toast.error('Only clients can add a song')
  return;
}

    if (!songName.trim())
    {
      toast.error('Please Enter a Song Name')
      return;
    }

    try {
      setAddingSong(true);

      const response =
        await addMoodboardSong(
          clientId,
          songName
        );

      toast.success(
        response.message
      );

      setSongName("");

      // reload songs
      fetchMoodboardSongs();
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setAddingSong(false);
    }
  };

  const handleDeleteSong =
  async (songId) => {
    try {
      const response =
        await deleteMoodboardSong(
          clientId,
          songId
        );

      toast.success(
        response.message
      );

      fetchMoodboardSongs();
    } catch (error) {
      toast.error(
        error.message
      );
    }
  };

  const fetchClientNotes = async () => {
    try {
      setClientNotesLoading(true);

      const response = await getClientNotes(clientId);

      setClientNotes(response.data?.client_notes || "");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setClientNotesLoading(false);
    }
  };

  const handleSaveNotes = async () => {

    if(user.role){
      toast.error("Only clients can Add Notes")
      return; 
    }
    try {
      
      setSavingNotes(true);

      const response = await updateClientNotes(clientId, newClientNotes);

      toast.success(response.message);

      fetchClientNotes();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSavingNotes(false);
    }
  };

  const fetchDiscussions = async () => {
    try {
      setDiscussionsLoading(true);

      const response = await getMoodboardDiscussions(clientId);

      setDiscussions(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDiscussionsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setSendingMessage(true);

      const response = await addMoodboardDiscussion(clientId, message);

      toast.success(response.message);

      setMessage("");

      // reload discussions
      fetchDiscussions();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSendingMessage(false);
    }
  };


  const fetchTravelDiscussions =
  async () => {
    try {
      setTravelLoading(true);

      const response =
        await getTravelDiscussions(
          clientId
        );

      setTravelDiscussions(
        response.data
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setTravelLoading(false);
    }
  };


  const handleSendTravelMessage =
  async () => {
    if (!travelmessage.trim())
      return;

    try {
      setSendingtravelMessage(true);

      await addTravelDiscussion(
        clientId,
        travelmessage
      );

      settravelMessage("");

      // Refresh discussions
      await fetchTravelDiscussions();

      toast.success(
        "Message sent"
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setSendingtravelMessage(false);
    }
  };

  const fetchOverview = async () => {
    try {
      setOverviewLoading(true);

      const response = await getClientOverview(clientId);
console.log(response.data)
      setOverviewData(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOverviewLoading(false);
    }
  };

  const fetchWorkflow = async () => {
    
    try {
      setWorkflowLoading(true);

      const response = await getClientWorkflow(clientId);
  
      setWorkflowData(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setWorkflowLoading(false);
    }
  };

  


 
const [uploadProgress, setUploadProgress] =
  useState({});

const handleUploadFiles =
  async (
    files,
    clientId,
    variantType,
    vendorshared = false
  ) => {
    for (const item of files) {
      try {
        setUploadProgress(
          (prev) => ({
            ...prev,
            [item.file.name]: {
              percent: 0,
              uploadedParts: 0,
              totalParts: 0,
              status:
                "uploading",
            },
          })
        );

        await uploadMultipartFileClientassets(
          item.file,
          clientId,
          variantType,

          (progress) => {
            setUploadProgress(
              (prev) => ({
                ...prev,
                [item.file.name]: {
                  percent:
                    progress.percent,

                  uploadedParts:
                    progress.uploadedParts,

                  totalParts:
                    progress.totalParts,

                  status:
                    progress.percent >=
                    100
                      ? "done"
                      : "uploading",
                },
              })
            );
          },

          vendorshared
        );
      } catch (error) {
        setUploadProgress(
          (prev) => ({
            ...prev,
            [item.file.name]: {
              percent: 0,
              uploadedParts: 0,
              totalParts: 0,
              status: "error",
            },
          })
        );
      }
    }
  };


const [page, setPage] =
  useState(1);

const [
  hasNextPage,
  setHasNextPage,
] = useState(false);

const [assetsCache, setAssetsCache] =
  useState({
    all: {
      assets: [],
      page: 1,
      hasNext: true,
      loaded: false,
    },
    edited: {
      assets: [],
      page: 1,
      hasNext: true,
      loaded: false,
    },
    unedited: {
      assets: [],
      page: 1,
      hasNext: true,
      loaded: false,
    },
  });

const [selectedFilter, setSelectedFilter] =
  useState("all");

const [assetsloading, setassetsLoading] =
  useState(false);

  const fetchAssets =
  async (
    filter,
    page = 1,
    append = false
  ) => {
    try {
      setassetsLoading(true);

      const response =
        await getClientAssets(
          clientId,
          page,
          filter
        );

      setAssetsCache(
        (prev) => ({
          ...prev,

          [filter]: {
            assets: append
              ? [
                  ...prev[
                    filter
                  ].assets,

                  ...response.data,
                ]
              : response.data,

            page,

            hasNext:
              response
                .pagination
                .has_next,

            loaded: true,
          },
        })
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setassetsLoading(false);
    }
  };

  const loadMore =
  async () => {
    const filterData =
      assetsCache[
        selectedFilter
      ];

    if (
      !filterData.hasNext
    )
      return;

    await fetchAssets(
      selectedFilter,

      filterData.page +
        1,

      true
    );
  };

  const currentAssets =
  assetsCache[
    selectedFilter
  ].assets;


  const changeFilter =
  (filter) => {
    setSelectedFilter(
      filter
    );

    
  };

 useEffect(() => {
  if (
    activeTab ===
      "assets" &&
    !assetsCache[
      selectedFilter
    ]?.loaded
  ) {
    fetchAssets(
      selectedFilter,
      1
    );
  }
}, [
  activeTab,
  selectedFilter,
]);

const [moodboardAssets,setMoodboardAssets] = useState(null)
const [moodboardAssetsLoading, setMoodboardAssetsLoading] = useState(false);
const fetchMoodboardAssets =
  async () => {
    try {
      setMoodboardAssetsLoading(true);

      const response =
        await getMoodboardAssets(
          clientId
        );

      setMoodboardAssets(
        response.data
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setMoodboardAssetsLoading(false);
    }
  };




  const handleDownload =
  async (fileId) => {
    try {
      const response =
        await downloadFile(
          fileId
        );

      const link =
        document.createElement(
          "a"
        );

      link.href =
        response.download_url;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );
    } catch (error) {
      toast.error(
        error.message
      );
    }
  };


  // ------------------edit prjoect and add step ------------------------------//


 




    const [showEditModal, setShowEditModal] = useState(false);
  const [editDraft, setEditDraft] = useState({});
  const [savingEdit,setsavingEdit] = useState(false);

  
  
  
 useEffect(()=>{
 setEditDraft(clientData)

 },[clientData])

  


  function openEditModal() {
    setShowEditModal(true);
  }

 
  const saveEditModal =
  async () => {
    setsavingEdit(true)
    try {
      await updateClient(
        clientId,
        {
          client_name:
            editDraft?.client_name,

          event_date:
            editDraft?.event_date,

          event_type:
            editDraft?.event_name,

          event_location:
            editDraft?.event_location,
        }
      );

      toast.success(
        "Client updated successfully"
      );

      fetchClientHeader()
    } catch (error) {
      toast.error(
        error.message
      );
    }
    finally{
       setShowEditModal(false);
       setsavingEdit(false)
    }
  };

    const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response =
          await getTeamMembers();
  console.log(response.data)
        setTeamMembers(response.data);

        fetchWorkflow()
      } catch (error) {
        console.error(error.message);
      }
    };
  
    fetchTeamMembers();
  }, []);

  const [showAddStepModal, setShowAddStepModal] = useState(false);
  const [newStepName, setNewStepName] = useState("");
  const [newStepAssignee, setNewStepAssignee] = useState("");
  const [newStepOrder, setNewStepOrder] = useState("");
  const [addingStep,setAddingStep] = useState(false)
  

  useEffect(()=>{
    setNewStepOrder(workflowData?.length + 1)
  },[workflowData])
 

  useEffect(()=>{
    setNewStepAssignee(teamMembers?.[0]?.member_id)
  },[teamMembers])


  const saveAddStep =
  async () => {

    setAddingStep(true)
    try {
      await addProjectStep(
        clientId,
        {
          step_name:
            newStepName,

          assigned_member_id:
            newStepAssignee,

          step_order:
            newStepOrder,
        }
      );

      toast.success(
        "Step added successfully"
      );

      fetchWorkflow();
      fetchOverview()
      fetchClientHeader()
    } catch (error) {
      toast.error(
        error.message
      );
    }
    finally{
      setAddingStep(false)
    setShowAddStepModal(false);

    }
  };





  // ---------------------------------------Invoices------------------
    const [invoiceItems, setInvoiceItems] = useState(() => invoiceData.items.map((item, i) => ({ ...item, id: i })));
  const [editingInvoiceRow, setEditingInvoiceRow] = useState<number | null>(null);
  const [invoiceRowDraft, setInvoiceRowDraft] = useState<{ description: string; quantity: number; rate: number } | null>(null);

  const computedSubtotal = invoiceItems.reduce((s, i) => s + i.amount, 0);
  const computedTax = Math.round(computedSubtotal * 0.1);
  const computedTotal = computedSubtotal + computedTax - invoiceData.discount;

  function startEditInvoiceRow(idx: number) {
    const item = invoiceItems[idx];
    setInvoiceRowDraft({ description: item.description, quantity: item.quantity, rate: item.rate });
    setEditingInvoiceRow(idx);
  }

  function saveInvoiceRow(idx: number) {
    if (!invoiceRowDraft) return;
    setInvoiceItems(prev => prev.map((item, i) => i === idx
      ? { ...item, description: invoiceRowDraft.description, quantity: invoiceRowDraft.quantity, rate: invoiceRowDraft.rate, amount: invoiceRowDraft.quantity * invoiceRowDraft.rate }
      : item
    ));
    setEditingInvoiceRow(null);
    setInvoiceRowDraft(null);
  }

  function cancelEditInvoiceRow() {
    setEditingInvoiceRow(null);
    setInvoiceRowDraft(null);
  }




  // Contract editing & signing
  const [contractEditing, setContractEditing] = useState(false);
  const [contractText, setContractText] = useState({
    engagement: `Subject to the terms set out herein, Client engages Photographer to provide, and Photographer agrees to provide, the photography services described in this Section  in connection with the function.`,
    deliverables: `500+ professionally edited high-resolution photographs\n5-7 minute highlight video with cinematic color grading\nDigital delivery via secure online gallery within 6 weeks\nFull-resolution download rights for personal use`,
    delivery: `The estimated turnaround time for the final edited photographs is up to one (1) month following the event date. The editing style, including color correction, exposure adjustments, retouching, and overall artistic presentation, shall be determined by the Photographer’s professional and artistic judgment. Minor revision requests may be considered at the Photographer’s discretion, provided such revisions do not include extensive retouching beyond the agreed scope.`,
    clarification: `As part of the Services, the Photographer will produce or take similar action to create materials from Images and provide related deliverables (as set out above) pursuant to the provision of the Services (“Work Product”). “Images” means photographic material, whether still or moving, created by Photographer pursuant to this Agreement and includes, but is not limited to, transparencies, negatives, prints or digital files, captured, recorded, stored or delivered in any type of analogue, photographic, optical, electronic, magnetic, digital or any other medium.

  Client acknowledges and agrees that Photographer will be the exclusive provider of the Services in coverage of the Half Saree & Dhoti Ceremony, unless otherwise agreed to by the parties in writing.`,
    fees: `Client will pay Photographer the fees set out herein in this (“Fees”), including any applicable federal or state/provincial sales or value-added taxes due on such Fees.



Client acknowledges and agrees that the deposit amount set out above is due upon the signing of this Agreement and is not refundable (“Deposit”), so as to fairly compensate Photographer for committing his/her time to provide the Services and turning down other potential projects or clients. Both parties agree that the Deposit will be credited towards the total Fees payable by Client.

 Photographer will issue an invoice to Client upon agreement of the Services (“Invoice”). Client agrees to pay all Fees outstanding on or prior to the due dates set out in Section 2.1. Any payment after the due date will incur a late fee of 5% per month on the outstanding balance. Client acknowledges that the final amount payable may be subject to change depending on the amount actual expenses incurred. Client confirms and agrees that the final calculations provided in the Invoice, should they be different from the total listed in Section 2.1, will be the final amount payable.`,
    responsibilities: `Required Consents. Client will ensure that all required consents, as applicable, have been obtained prior to performance of the Services, including any consents required for the performance of Services and the delivery of Work Product by Photographer and, as applicable, from venues or locales where the Services are to be performed or from attendees.

Client will provide the means of travel or be responsible for reasonable travel expenses incurred by Photographer that are necessary for the performance of the Services or travel that is otherwise requested by Client where the location of the performance of the Services is not in the city of Kansas City. Client will be responsible for any other expenses incurred by Photographer that are necessary for the performance of the Services as more particularly set out in Article 2.

When the number of hours that Photographer will be providing the Services is expected to be in excess of 5 hours in duration, Client will provide a meal for Photographer and Photography Staff (employees, assistants or other parties engaged by Photographer to assist with the Services), or be responsible for reasonable meal expenses incurred for which Photographer shall provide an invoice.

Client (on behalf of himself/herself and any other participant whose image or recording may be captured by the Services) hereby waives all rights and claims, and releases Photographer from any claim or cause of action, whether now known or unknown, relating to the sale, display, license, use and exploitation of Images pursuant to this Agreement`,
    PhotographerResponsibilities: `Equipment - Client will not be required to supply any photography equipment to Photographer.

Manner of Service - Photographer will ensure that the Services are performed in a good, expedient, workmanlike and safe manner, and in such a manner as to avoid unreasonable interference with Client’s activities.

Photography Staff - Photographer will, and will ensure that all Photography Staff (employees, assistants or other parties engaged by Photographer to assist with the Services): 

    comply with the reasonable directions of Client from time to time regarding the safety of attendees at the Half Saree & Dhoti Ceremony and applicable health, safety and security requirements of any locations where the Services are provided.

    ensure that Work Product meets the specifications set out in Section 1 in all material respects.

    Photographer will be responsible in every respect for the actions of all Photography Staff.

Photographer will take reasonable precautions to safeguard and back up all images. However, in rare cases of technical failure or data loss beyond Photographer’s control, Photographer’s responsibility will be limited to refunding any fees paid by the Client.`,

ArtisticRelease :`
Consistency - Photographer will use reasonable efforts to ensure that the Services are produced in a style consistent with Photographer’s current portfolio, and Photographer will use reasonable efforts to consult with Client and incorporate any reasonable suggestions.

Style - Client acknowledges and agrees that:

    Client has reviewed Photographer’s previous work and portfolio and has a reasonable expectation that Photographer will perform the Services in a similar style

    Photographers will use its artistic judgement when providing the Services, and shall have final say regarding the aesthetic judgement and artistic quality of the Services; and

    Disagreement with Photographer’s aesthetic judgement or artistic ability are not valid reasons for termination of this Agreement or request of any monies returned.`,
    terms:`
    Term - This Agreement will begin on the Effective Date and continue until the latter of (i) the date where all outstanding Fees under this Agreement are paid in full; or (ii) the date where all final Work Product has been delivered (“Term”).

Cancellation - Client may terminate the Agreement (“Cancellation”) and/or reschedule the Services (“Rescheduling”) by providing Photographer with written notice no later than 30 days before the original date of the Half Saree & Dhoti Ceremony (the “Minimum Notice”). Client acknowledges and agrees that Client is not relieved of any payment obligations for Cancellations and Rescheduling unless the Minimum Notice in accordance with this Article 6 is duly provided or unless the parties otherwise agree in writing.  

Rescheduling - In the event of Rescheduling, Photographer will use commercially reasonable efforts to accommodate Client’s change. If Photographer is not able to accommodate Client’s change despite using commercially reasonable efforts, the parties agree that such Rescheduling will be deemed as Cancellation by Client and that Photographer will be under no obligation to perform the Services other than on the original date of the Half Saree & Dhoti Ceremony. In the event of rescheduling with sufficient notice, the deposit will be applied toward the rescheduled date.

No Refund - Client acknowledges and agrees that Cancellation by Client will not result in a refund of any fees paid on or prior to the date of Cancellation by Client.

Replacement - In the event that Photographer is unable to perform the Services, Photographer, subject to Client’s consent, which is not to be reasonably withheld, shall cause a replacement photographer to perform the Services in accordance with the terms of this Agreement. In the event that such consent is not obtained, Photographer shall terminate this Agreement and shall return the Deposit and all fees paid by Client, and thereafter shall have no further liability to Client.
    `,
    ownership:`
    Photographer retains copyright ownership of all images and creative work produced, while fully respecting the Client’s privacy preferences regarding public sharing or display.
    `,
    clientLicense:`
    Personal Use -  Photographer hereby grants Client an exclusive, limited, irrevocable, royalty-free, non-transferable and non-sublicensable license to use Work Product for Client’s Personal Use, provided that Client does not remove any attribution notices or copyright notices included by Photographer in any Work Product. “Personal Use” includes, but is not limited to, use (i) of photos on Client’s personal social media pages or profiles; (ii) in Client’s personal creations, such as scrapbooks, albums or personal gifts; (iii) in non-commercial physical display; and (iv) in personal communications, such as family newsletter, email, or holiday card. Client will not make any other use of the Work Product without Photographer’s prior written consent, including but not limited to use of the Work Product for commercial sale.

Photographer does not provide RAW files, unedited images, or original digital negatives. These files remain the exclusive property of the Photographer and are not available for purchase or distribution. Delivery of RAW files is not included under any circumstances. The Client agrees that the Photographer’s editing and post-production process is an integral part of the Services and final Work Product.
    `,
    Indemnity: `
    Indemnification - Client agrees to indemnify, defend and hold harmless Photographer and its affiliates, employees, agents and independent contractors for any injury, property damage, liability, claim or other cause of action arising out of or related to the Services and or Work Product Photographer provides to Client.

Force Majeure - Neither party shall be held in breach of or liable under this Agreement for any delay or non-performance of any provision of this Agreement caused by illness, emergency, fire, strike, pandemic, earthquake, or any other conditions beyond the reasonable control of the non-performing party (each a “Force Majeure Event”), and the time of performance of such provision, if any, shall be deemed to be extended for a period equal to the duration of the conditions preventing performance. If such Force Majeure Event persists for more than 60 days, the party not affected by the Force Majeure Event may terminate the Agreement and any prepaid fees for Services not performed (other than the Deposit) shall be returned within 15 days of the date of termination of the Agreement.

Failure to Deliver -  Photographer shall not be held liable for delays in the delivery of such Work Product, or any Work Product undeliverable, due to technological malfunctions, service interruptions that are beyond the control of Photographer (including as a result of delays in receipt of instructions from Client) and for Work Product that fails to meet the specifications set out in Section 1.1 due to the actions of Client or attendees at the Half Saree & Dhoti Ceremony that are beyond the control of Photographer (e.g., camera flashes).

Maximum Liability - Notwithstanding anything to the contrary, Client agrees that Photographer’s maximum liability arising out of or related to the Services or the Work Product shall not exceed the total Fees payable under this Agreement.
    `,
    General:`
    
    Notice - Parties shall provide effective notice (“Notice”) to each other via either of the following methods of delivery at the date and time which the Notice is sent:

    Photographer’s Email: reachus@midorimediacompany.com

    Client’s Email: ----------------------

Survival - Articles 7, 8, 9 and 10 will survive termination of this Agreement.

Governing Law - This Agreement will be governed by the laws of Missouri

Amendment - This Agreement may only be amended, supplemented or otherwise modified by written agreement signed by each of the parties.

Entire Agreement - This Agreement constitutes the entire agreement between the parties with respect to the Services and supersedes all prior agreements and understandings both formal and informal.

Severability -  If any provision of this Agreement is determined to be illegal, invalid or unenforceable, in whole or in part, by an arbitrator or any court of competent jurisdiction, that provision or part thereof will be severed from this Agreement and the remaining part of such provision and all other provisions will continue in full force and effect.`
  });
  const [clientSignedName, setClientSignedName] = useState("");
  const [clientSigned, setClientSigned] = useState(false);
  const [clientSignedDate, setClientSignedDate] = useState<string | null>(null);
  const [signMode, setSignMode] = useState<"type" | "draw">("type");
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);

  function handleCanvasMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  function handleCanvasMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setHasDrawnSignature(true);
  }

  function handleCanvasMouseUp() {
    isDrawingRef.current = false;
  }

  function clearCanvas() {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnSignature(false);
  }



  // License & Insurance uploaded docs
  const [uploadedDocs, setUploadedDocs] = useState<Array<{
    id: number;
    name: string;
    size: string;
    category: "license" | "insurance" | "certification";
    uploadedAt: string;
  }>>([]);
  const licenseInputRef = useRef<HTMLInputElement>(null);
  const insuranceInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);

  function handleDocUpload(e: React.ChangeEvent<HTMLInputElement>, category: "license" | "insurance" | "certification") {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
   handleUploadFiles(
  files.map(file => ({ file })),
  clientId,
  "license",
  false
);
  }

  function removeDoc(id: number) {
    setUploadedDocs(prev => prev.filter(d => d.id !== id));
  }
  


  const [
  contractStatus,
  setContractStatus,
] = useState(null);

const [
  contractLoading,
  setContractLoading,
] = useState(false);


const fetchContractStatus =
  async () => {
    try {
      setContractLoading(
        true
      );

      const response =
        await getContractStatus(
          clientId
        );

        setClientSigned (response.data?.contract_signed)
        setClientSignedDate(response?.data?.contract_signed_at)
        setClientSignedName(response?.data?.sign_name)
        console.log(response?.data)
      setContractStatus(
        response.data
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setContractLoading(
        false
      );
    }
  };

  const [signingContract,setSigningContract] = useState(false)

const handleSignContract =
  async () => {

    setSigningContract(true)
    try {
      await signContract(
        clientId,
        clientSignedName
      );

      toast.success(
        "Contract signed successfully"
      );

      fetchContractStatus();
    } catch (error) {
      toast.error(
        error.message
      );
    }finally{
      setSigningContract(false)
    }
  };



  const [
  licenses,
  setLicenses,
] = useState([]);

const [
  licensesLoading,
  setLicensesLoading,
] = useState(false);

const fetchLicenses =
  async () => {
    try {
      setLicensesLoading(
        true
      );

      const response =
        await getClientLicenses(
          clientId
        );

      setLicenses(
        response.data
      );

      console.log(response.data)
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setLicensesLoading(
        false
      );
    }
  };

useEffect(() => {
    if (activeTab === "overview" && !overviewData) {
      fetchOverview();
    }
    if (activeTab === "workflow" && !workflowData) {
      fetchWorkflow();
    }
    if (activeTab === "moodboard" && !moodboardAssets) {
      fetchClientNotes();
      fetchDiscussions();
      fetchMoodboardSongs();
      fetchMoodboardAssets()
    }

    if (activeTab === "gears" && (!productionSetup || !productionOverview)) {
      fetchProductionSetup();
      fetchProductionOverview()
    }

   

 if(activeTab === 'travel' && !travelData){
    fetchTravelData()
    fetchTravelDiscussions()
  }

  if(activeTab === 'contract' && !contractStatus){
    fetchContractStatus()
  }

  if(activeTab === 'license' && licenses.length === 0) {
    fetchLicenses()
  }

  }, [activeTab]);


 
  




  return (
    <div className="relative min-h-screen overflow-hidden text-foreground">
      {/* Navigation */}
      <Navbar />

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
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
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
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
            <div>
              {loading ? (
                <div className="space-y-5">
                  <ProjectDetailShimmer className="h-12 w-72 md:w-96" />
                  <div className="flex flex-wrap items-center gap-4">
                    <ProjectDetailShimmer className="h-7 w-28 rounded-full" />
                    <ProjectDetailShimmer className="h-5 w-40" />
                    <ProjectDetailShimmer className="h-5 w-52" />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl mb-5 tracking-tight capitalize">
                    {clientData?.client_name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-base opacity-70">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm capitalize">
                        {clientData?.event_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {clientData &&
                          format(new Date(clientData?.event_date), "MMMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 capitalize">
                      <span>{clientData?.event_location}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

             <div className="flex gap-3">
              <button
                onClick={openEditModal}
                className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 hover:border-white/20 transition-all"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Project</span>
              </button>
              <button
                onClick={() => setShowAddStepModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-accent rounded-full text-sm hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
            {loading ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-3">
                    <ProjectDetailShimmer className="h-4 w-24" />
                    <ProjectDetailShimmer className="h-7 w-32 rounded-full" />
                  </div>
                  <div className="space-y-3 flex flex-col items-end">
                    <ProjectDetailShimmer className="h-4 w-32" />
                    <ProjectDetailShimmer className="h-6 w-24" />
                  </div>
                </div>
                <ProjectDetailShimmer className="h-2 w-full rounded-full" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-60 mb-5">Project Status</p>
                    <div className="flex items-center gap-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          clientData?.project_status === "Completed"
                            ? "bg-accent/20 text-accent"
                            : clientData?.project_status === "In Progress"
                              ? "bg-[#2d5f4f]/20 text-emerald-200"
                              : "bg-amber-500/10 text-amber-200"
                        }`}
                      >
                        {clientData?.project_status}
                      </span>
                      {/* <span className="opacity-80">
                        {clientData?.progress_percentage}% Complete
                      </span> */}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-60 mb-1">Workflow Progress</p>
                    <p className="text-lg">
                      {clientData?.completed_steps} of {clientData?.total_steps}{" "}
                      steps
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${clientData?.progress_percentage || 0}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto bg-white/[0.03] rounded-2xl px-2 pt-2">
            {[
              "overview",
              "assets",
              ,
              "workflow",
              "moodboard",
              "gears",
              "travel",
              "invoices",
              "contract",
              "license",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm capitalize transition-all relative whitespace-nowrap ${
                  activeTab === tab
                    ? "text-accent"
                    : "text-white/50 hover:text-white/75"
                }`}
              >
                {tab === "license"
                  ? "License & Insurance"
                  : tab === "gears"
                    ? "Production Setup"
                    : tab === "travel"
                      ? "Crew Travel"
                      : tab}
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
                {overviewLoading ? (
                  <>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                      <ProjectDetailShimmer className="h-7 w-48" />
                      <ProjectDetailCardShimmer className="h-20 w-full" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                      <ProjectDetailShimmer className="h-7 w-40" />
                      {[0, 1, 2].map((overviewActivitySkeleton) => (
                        <div key={overviewActivitySkeleton} className="flex items-start gap-3 p-3">
                          <ProjectDetailShimmer className="h-2 w-2 rounded-full mt-2" />
                          <div className="flex-1 space-y-2">
                            <ProjectDetailShimmer className="h-4 w-3/4" />
                            <ProjectDetailShimmer className="h-3 w-36" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                      <ProjectDetailShimmer className="h-7 w-44" />
                      <div className="grid md:grid-cols-2 gap-4">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((overviewStatSkeleton) => (
                          <ProjectDetailCardShimmer key={overviewStatSkeleton} className="h-24" />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                {/* Current Active Step */}
                <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <h3 className="text-xl mb-4">Current Active Step</h3>
                 
                    <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/30 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-lg mb-1">
                            {overviewData?.current_step?.step_name}
                          </p>
                          <p className="text-sm opacity-60">
                            Assigned to{" "}
                            {overviewData?.current_step?.assigned_member}
                          </p>
                        </div>
                      </div>
                       <div className="flex items-center gap-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm capitalize ${
                         overviewData?.current_step?.step_status === "Completed"
                            ? "bg-accent/20 text-accent"
                            : overviewData?.current_step?.step_status === "In Progress"
                              ? "bg-[#2d5f4f]/20 text-emerald-200"
                              : "bg-amber-500/10 text-amber-200"
                        }`}
                      >
                        {overviewData?.current_step?.step_status}
                      </span>
                      {/* <span className="opacity-80">
                        {clientData?.progress_percentage}% Complete
                      </span> */}
                    </div>
                    </div>
                
                </div>

                {/* Recent Activity */}
                <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <div className="mb-4">
                    <h3 className="text-xl ">Recent Activity</h3>
                  </div>
                  <div className="space-y-3">
                    {overviewData?.recent_activities?.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="opacity-80">
                              {activity.member_name}
                            </span>
                            <span className="opacity-60">
                              {" "}
                              {activity.activity_message}{" "}
                            </span>
                          </p>
                        <p className="text-xs opacity-40 mt-1">
  {format(
    addMinutes(
      new Date(activity.created_at),
      330 // 5h 30m
    ),
    "MMM dd, yyyy 'at' h:mm a"
  )}
</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Project Summary */}
                <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <h3 className="text-xl mb-4">Project Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">Total Assets</p>
                      <p className="text-2xl">
                        {overviewData?.project_stats?.total_assets}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">Team Members</p>
                      <p className="text-2xl">
                        {overviewData?.project_stats?.total_team_members}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">Total Steps</p>
                      <p className="text-2xl">
                        {overviewData?.project_stats?.total_steps}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">Completed Steps</p>
                      <p className="text-2xl">
                        {overviewData?.project_stats?.completed_steps}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">
                        Percentage Completed
                      </p>
                      <p className="text-2xl">
                        {overviewData?.project_stats?.completion_percentage}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">
                        Total Moodboard Discussions
                      </p>
                      <p className="text-2xl">
                        {
                          overviewData?.project_stats
                            ?.total_moodboard_discussions
                        }
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">
                        Client Login Email
                      </p>
                      <p className="text-md">
                        {
                          overviewData?.client_details
                            ?.email
                        }
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm opacity-60 mb-2">
                        Client Login Password
                      </p>
                      <p className="text-md">
                        {
                          overviewData?.client_details
                            ?.password
                        }
                      </p>
                    </div>
                  </div>
                </div>
                  </>
                )}
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
                {/* View Toggle */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setAssetView("client")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all ${
                      assetView === "client"
                        ? "bg-accent text-background shadow-lg shadow-accent/20"
                        : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <Image className="w-4 h-4" />
                    <span>Client Assets</span>
                  </button>
                  <button
                    onClick={() => {
                      setAssetView("vendor");
                      setShowVendorModal(true);
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all ${
                      assetView === "vendor"
                        ? "bg-accent text-background shadow-lg shadow-accent/20"
                        : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Vendor Media Access</span>
                  </button>
                </div>

                {/* Client Assets View */}
                {assetView === "client" && (
                  <>
                    {/* Asset Controls */}
                    <div className="space-y-4 mb-6">
                      {/* Sets Filter */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                          {["edited", "unedited"].map((set) => (
                            <button
                             
                              key={set}
                              onClick={() => setSetFilter(set)}
                              className={`px-5 py-2.5 rounded-xl text-sm capitalize transition-all ${
                                setFilter === set
                                  ? "bg-accent text-background shadow-lg shadow-accent/20"
                                  : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                              }`}
                            >
                              {set}
                            </button>
                          ))}
                        </div>

                      
                    {user.role &&    <button 
                         onClick={() => {
                          setShowUploadModal(true)
                      


                         }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-accent rounded-full text-sm text-white shadow-lg shadow-accent/15 hover:bg-accent/90 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>Upload Assets</span>
                        </button>}
                      </div>

                      {/* Type Filter */}
                      {/* <div className="flex gap-2">
                        {["all", "photos", "videos"].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setAssetFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                              assetFilter === filter
                                ? "bg-white/10 border border-white/20"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div> */}
                    </div>

                          {currentAssets?.length > 0 && <p className="mb-5 text-sm text-white/70"> These Images are very highly defined, Please have patience while they load up.</p>}


                      

                    {/* Asset Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {assetsloading && currentAssets?.length === 0 ? (
                        [0, 1, 2, 3, 4, 5, 6, 7].map((assetGridSkeleton) => (
                          <ProjectDetailCardShimmer key={assetGridSkeleton} className="aspect-square" />
                        ))
                      ) : currentAssets?.length === 0 ?
                      <p className="text-white">No Assets Uploaded !</p>
                      :currentAssets?.map((asset, index) => (
                        <motion.div
                          key={asset.file_id}

                          
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedAsset(asset)}
                          className="group relative aspect-square bg-white/[0.055] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-accent/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition-all"
                        >


                     
                          <img
                            src={asset.preview_url}
                            alt={asset.file_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <div className="flex items-center gap-2 mb-1">
                                {asset.file_type === "image" ? (
                                  <Image className="w-4 h-4" />
                                ) : (
                                  <Video className="w-4 h-4" />
                                )}
                                <span className="text-xs truncate">
                                  {asset.file_name}
                                </span>
                              </div>
                            </div>
                            <div className="absolute top-3 right-3">
                              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <ZoomIn className="w-4 h-4" />
                              </div>

                              
                            </div>

                                 <div
                          className="absolute right-4 bottom-4"
                           onClick={(e) =>                 
                                 { 
                                  e.stopPropagation()
                                  handleDownload(
                                    asset.file_id
                                  )}
                                }
                          >


                            <DownloadIcon/>
                          </div>

                            
                          </div>
                        </motion.div>
                      ))}
                    </div>

                  </>
                )}

                {/* Vendor Media Access View */}
                {assetView === "vendor" && vendorAgreed && (
                  <div className="space-y-6">
                    {/* Vendor Collections Grid */}
                    {!selectedVendorCollection && (
                      <>
                        <div className="bg-gradient-to-br from-[#2d5f4f]/20 via-white/[0.03] to-transparent border border-[#2d5f4f]/25 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                          <h3 className="text-xl mb-2">Vendor Media Access</h3>
                          <p className="text-sm opacity-70">
                            Curated collections shared with wedding vendors and
                            collaborators for promotional use.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {vendorCollections.map((collection, index) => {
                            const Icon = collection.icon;
                            const daysUntilExpiry = Math.ceil(
                              (new Date(collection.expiryDate).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24),
                            );

                            return (
                              <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() =>
                                  setSelectedVendorCollection(collection)
                                }
                                className="group relative bg-white/[0.055] border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-[0_18px_60px_rgba(0,0,0,0.18)] hover:border-accent/50 hover:bg-white/[0.08] transition-all"
                              >
                                {/* Cover Image */}
                                <div className="aspect-[4/3] relative overflow-hidden">
                                  <img
                                    src={collection.coverImage}
                                    alt={collection.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                  {/* Icon Badge */}
                                  <div className="absolute top-3 left-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
                                      <Icon className="w-5 h-5 text-accent" />
                                    </div>
                                  </div>

                                  {/* Image Count */}
                                  <div className="absolute top-3 right-3">
                                    <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs">
                                      {collection.imageCount} images
                                    </div>
                                  </div>
                                </div>

                                {/* Collection Info */}
                                <div className="p-4">
                                  <h4 className="text-base mb-1">
                                    {collection.name}
                                  </h4>
                                  <p className="text-xs opacity-60 mb-3">
                                    {collection.vendorName}
                                  </p>

                                  <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 opacity-60">
                                      <CalendarClock className="w-3 h-3" />
                                      <span>
                                        Shared{" "}
                                        {format(
                                          new Date(collection.sharedDate),
                                          "MMM dd",
                                        )}
                                      </span>
                                    </div>
                                    <span
                                      className={`px-2 py-0.5 rounded-full ${
                                        daysUntilExpiry > 7
                                          ? "bg-accent/20 text-accent"
                                          : daysUntilExpiry > 3
                                            ? "bg-amber-500/10 text-amber-200"
                                            : "bg-red-500/10 text-red-300"
                                      }`}
                                    >
                                      {daysUntilExpiry}d left
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Admin Controls */}
                        {userRole === "editor" && (
                          <div className="flex gap-3 pt-4">
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                              <Plus className="w-4 h-4" />
                              <span>Create New Collection</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                              <Settings className="w-4 h-4" />
                              <span>Access Settings</span>
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {/* Selected Collection Gallery */}
                    {selectedVendorCollection && (
                      <div className="space-y-6">
                        {/* Back Button & Collection Header */}
                        <div>
                          <button
                            onClick={() => setSelectedVendorCollection(null)}
                            className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-6"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Collections</span>
                          </button>

                          <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                                  {(() => {
                                    const Icon = selectedVendorCollection.icon;
                                    return (
                                      <Icon className="w-7 h-7 text-accent" />
                                    );
                                  })()}
                                </div>
                                <div>
                                  <h3 className="text-2xl mb-1">
                                    {selectedVendorCollection.name}
                                  </h3>
                                  <p className="text-sm opacity-60 mb-2">
                                    {selectedVendorCollection.vendorName}
                                  </p>
                                  <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                      {selectedVendorCollection.vendorType}
                                    </span>
                                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                      {selectedVendorCollection.imageCount}{" "}
                                      images
                                    </span>
                                    <span className="px-2 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
                                      Expires{" "}
                                      {format(
                                        new Date(
                                          selectedVendorCollection.expiryDate,
                                        ),
                                        "MMM dd, yyyy",
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Collection Actions */}
                              <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                                  <Link2 className="w-4 h-4" />
                                  <span>Copy Link</span>
                                </button>
                                {selectedVendorCollection.permissions
                                  .download && (
                                  <button className="flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm text-white shadow-lg shadow-accent/15 hover:bg-accent/90 transition-colors">
                                    <Download className="w-4 h-4" />
                                    <span>Download All</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Permissions Info */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                              <div className="flex items-center gap-2 text-sm">
                                <Download
                                  className={`w-4 h-4 ${selectedVendorCollection.permissions.download ? "text-accent" : "opacity-30"}`}
                                />
                                <span className="opacity-70">
                                  {selectedVendorCollection.permissions.download
                                    ? "Download Enabled"
                                    : "Preview Only"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Eye
                                  className={`w-4 h-4 ${selectedVendorCollection.permissions.watermark ? "text-accent" : "opacity-30"}`}
                                />
                                <span className="opacity-70">
                                  {selectedVendorCollection.permissions
                                    .watermark
                                    ? "Watermarked"
                                    : "No Watermark"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Image className="w-4 h-4 text-accent" />
                                <span className="opacity-70 capitalize">
                                  {selectedVendorCollection.permissions.quality}{" "}
                                  Quality
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Image Gallery */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {selectedVendorCollection.images.map(
                            (image, index) => (
                              <motion.div
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedVendorImage(image)}
                                className="group relative aspect-square bg-white/[0.055] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-accent/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition-all"
                              >
                                <img
                                  src={image.url}
                                  alt={image.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {selectedVendorCollection.permissions
                                  .watermark && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-white/20 text-2xl font-bold rotate-[-30deg]">
                                      Midori Media
                                    </div>
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <span className="text-xs truncate block">
                                      {image.name}
                                    </span>
                                  </div>
                                  <div className="absolute top-3 right-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                      <ZoomIn className="w-4 h-4" />
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ),
                          )}
                        </div>

                        {/* Usage Guidelines */}
                        <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                          <h4 className="text-base mb-3 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-accent" />
                            <span>Usage Guidelines</span>
                          </h4>
                          <ul className="space-y-2 text-sm opacity-70">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>
                                Allowed for promotional and portfolio usage on
                                your business channels
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>
                                May be shared on social media with proper credit
                                to Midori Media
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <X className="w-4 h-4 text-red-300 mt-0.5 flex-shrink-0" />
                              <span>
                                Unauthorized redistribution, editing, or resale
                                is prohibited
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <X className="w-4 h-4 text-red-300 mt-0.5 flex-shrink-0" />
                              <span>
                                Commercial use beyond portfolio display requires
                                written authorization
                              </span>
                            </li>
                          </ul>
                        </div>

                        {/* Analytics (Admin Only) */}
                        {userRole === "editor" && (
                          <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                            <h4 className="text-base mb-4">Access Analytics</h4>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="p-4 bg-white/5 rounded-xl">
                                <p className="text-xs opacity-60 mb-1">
                                  Downloads
                                </p>
                                <p className="text-2xl">12</p>
                              </div>
                              <div className="p-4 bg-white/5 rounded-xl">
                                <p className="text-xs opacity-60 mb-1">
                                  Last Viewed
                                </p>
                                <p className="text-base">2 hours ago</p>
                              </div>
                              <div className="p-4 bg-white/5 rounded-xl">
                                <p className="text-xs opacity-60 mb-1">
                                  Link Shares
                                </p>
                                <p className="text-2xl">5</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
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
                  {workflowLoading ? (
                    [0, 1, 2, 3, 4].map((workflowSkeleton) => (
                      <div key={workflowSkeleton} className="relative bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <ProjectDetailShimmer className="w-12 h-12 rounded-full flex-shrink-0" />
                            <div className="flex-1 space-y-3">
                              <ProjectDetailShimmer className="h-6 w-52" />
                              <ProjectDetailShimmer className="h-4 w-64" />
                              <ProjectDetailShimmer className="h-6 w-24 rounded-full" />
                            </div>
                          </div>
                          <ProjectDetailShimmer className="h-9 w-28 rounded-full" />
                        </div>
                      </div>
                    ))
                  ) : workflowData?.map((step, index) => {
                    const isCompleted = step.step_status === "completed";
                    const isInProgress = step.step_status === "in_progress";
                    const isPending = step.step_status === "pending";
                    const isLocked =
                      index > 0 &&
                      workflowData[index - 1].step_status !== "completed";

                    return (
                      <motion.div
                        key={step.project_step_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative"
                      >
                        {/* Connection Line */}
                        {index < workflowData.length - 1 && (
                          <div className="absolute left-12 z-[10] top-16 bottom-0 w-0.5 bg-white/10">
                            {isCompleted && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "100%" }}
                                transition={{
                                  delay: index * 0.1,
                                  duration: 0.5,
                                }}
                                className="w-full bg-accent"
                              />
                            )}
                          </div>
                        )}

                        <div
                          className={`relative bg-white/5 border rounded-2xl p-6 transition-all ${
                            isCompleted
                              ? "border-accent/30 bg-accent/5"
                              : isInProgress
                                ? "border-[#2d5f4f]/35 bg-[#2d5f4f]/10"
                                : isLocked
                                  ? "border-white/10 opacity-50"
                                  : "border-white/10"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              {/* Status Icon */}
                              <div
                                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center  z-[20] ${
                                  isCompleted
                                    ? "bg-accent/20"
                                    : isInProgress
                                      ? "bg-[#2d5f4f]/20"
                                      : "bg-white/5"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-6 h-6 text-accent" />
                                ) : isInProgress ? (
                                  <Clock className="w-6 h-6 text-emerald-200" />
                                ) : (
                                  <Circle className="w-6 h-6 opacity-30" />
                                )}
                              </div>

                              {/* Step Info */}
                              <div className="flex-1">
                                <h4 className="text-lg mb-2 capitalize">
                                  {step.step_name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-3 text-sm opacity-60">
                                  <div className="flex items-center gap-1.5 capitalize">
                                    <User className="w-4 h-4" />
                                    <span>{step.assigned_member}</span>
                                  </div>
                                  {step.completed_at && (
                                    <div className="flex items-center gap-1.5">
                                      <Clock className="w-4 h-4" />
                                      <span>
                                        {format(
                                          new Date(step.completed_at),
                                          "MMM dd, h:mm a",
                                        )}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Status Badge */}
                                <div className="mt-3">
                                  <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs ${
                                      isCompleted
                                        ? "bg-accent/20 text-accent"
                                        : isInProgress
                                          ? "bg-[#2d5f4f]/20 text-emerald-200"
                                          : isLocked
                                            ? "bg-white/5 text-white/40"
                                            : "bg-amber-500/10 text-amber-200"
                                    }`}
                                  >
                                    {isCompleted
                                      ? "Completed"
                                      : isInProgress
                                        ? "In Progress"
                                        : isLocked
                                          ? "Locked"
                                          : "Pending"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                           <div className="flex items-center gap-2 md:flex-row flex-col">
                             {isPending && !isLocked && step.is_my_step && (
                              <button
                                onClick={() => handleWorkflowAction("start",step.project_step_id)}
                                className="px-4 py-2 border w-full border-white/10 rounded-full text-sm hover:bg-accent/10 hover:border-accent/30 transition-all whitespace-nowrap"
                              >
                                Start Working
                              </button>
                            )}
                            {!isCompleted &&
                              isInProgress &&
                              !isLocked &&
                              step.is_my_step && (
                                <button
                                  onClick={() =>
                                   { handleWorkflowAction("working",step.project_step_id)
                                    fetchOverview()}
                                  }
                                  className="px-4 w-full py-2 border border-white/10 rounded-full text-sm hover:bg-accent/10 hover:border-accent/30 transition-all whitespace-nowrap"
                                >
                                  Mark Activity
                                </button>
                              )}
                            {!isCompleted && !isLocked && step.is_my_step && (
                              <button
                                onClick={() => {handleWorkflowAction("finish",step.project_step_id)
                                  fetchOverview()
                                }}
                                className="px-4 w-full py-2 border border-white/10 rounded-full text-sm hover:bg-accent/10 hover:border-accent/30 transition-all whitespace-nowrap"
                              >
                                Mark Complete
                              </button>
                            )}
                           </div>
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
                <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <h3 className="text-xl mb-4">Client Notes</h3>
                  {clientNotesLoading ? (
                    <ProjectDetailCardShimmer className="min-h-[120px] w-full" />
                  ) : (
                    <div className="flex flex-col gap-4">
                     {clientNotes && <h1 className='text-[16px] flex items-start gap-2'> {clientNotes}</h1>}
                      <textarea
                     
                      value={newClientNotes}
                      onChange={(e) => setNewClientNotes(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors min-h-[120px] resize-y"
                      placeholder="Add notes about the project vision, style preferences, must-have shots..."
                    />
                    </div>
                  )}

                  <div className="w-full flex items-center justify-end">
                    <button
                      disabled={savingNotes}
                      onClick={handleSaveNotes}
                      className="px-4 py-3 mt-4 w-full bg-accent rounded-xl hover:bg-accent/90 transition-colors"
                    >
                      {savingNotes ? "Saving..." : "Save"}
                    </button>
                  </div>


                  <p className="text-sm mt-4 text-red-600">Client notes cannot be edited for maintained partiality</p>
                </div>

                {/* Song Selection */}
                <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    <span>Song Selection</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <input
                      type="text"
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Enter song title and artist..."
                    />
                    <button 
                      onClick={handleAddSong}
  disabled={addingSong}
                    className="px-6 py-3 bg-accent rounded-xl hover:bg-accent/90 transition-colors">
                    {addingSong
    ? "Adding..."
    : "Add Song"}
                    </button>
                  </div>

                    <div className="space-y-3 mt-3">
                    {songsLoading ? (
                      [0, 1, 2].map((songSkeleton) => (
                        <div key={songSkeleton} className="flex items-center gap-3 p-3 rounded-xl">
                          <ProjectDetailShimmer className="h-5 w-5 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <ProjectDetailShimmer className="h-4 w-48" />
                            <ProjectDetailShimmer className="h-3 w-32" />
                          </div>
                        </div>
                      ))
                    ) : songs?.map((song, index) => (
                      <motion.div
                        key={song.moodboard_song_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <Music2 className="mt-2" color='#2d5f4f' size={16}/>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="opacity-80">
                              {song.song_name}
                            </span>
                           
                          </p>
                          <p className="text-xs opacity-40 mt-1">
                            {format(
                              new Date(song.created_at),
                              "MMM dd, yyyy 'at' h:mm a",
                            )}
                          </p>
                        </div>

                       <div 
                        onClick={() =>
    handleDeleteSong(
      song.moodboard_song_id
    )
  }
                       className=' items-center justify-center hidden group-hover:flex'>
                         <Trash2 className="opacity-60" />
                       </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Reference Uploads */}
                <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                <div className="flex items-center justify-between w-full mb-4">
                    <h3 className="text-xl ">Reference Materials</h3>

                   {!user.role &&    <button 
                         onClick={() => {setShowUploadModal(true)
    setMoodboardModal(true)

                         }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-accent rounded-full text-sm text-white shadow-lg shadow-accent/15 hover:bg-accent/90 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>Upload Assets</span>
                        </button>} 
                </div>
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {moodboardAssetsLoading ? (
                        [0, 1, 2, 3].map((moodboardAssetSkeleton) => (
                          <ProjectDetailCardShimmer key={moodboardAssetSkeleton} className="aspect-square" />
                        ))
                      ) : moodboardAssets?.map((asset, index) => (
                        <motion.div
                          key={asset.file_id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedAsset(asset)}
                          className="group relative aspect-square bg-white/[0.055] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-accent/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition-all"
                        >
                          <img
                            src={asset.preview_url}
                            alt={asset.file_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <div className="flex items-center gap-2 mb-1">
                                {asset.file_type === "image" ? (
                                  <Image className="w-4 h-4" />
                                ) : (
                                  <Video className="w-4 h-4" />
                                )}
                                <span className="text-xs truncate">
                                  {asset.file_name}
                                </span>
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
                </div>

                {/* Comments Thread */}
                <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Moodboard Discussion</span>
                  </h3>

                  {/* Comments List */}
                  <div className="space-y-4 mb-6">
                    {discussionsLoading ? (
                      [0, 1, 2].map((discussionSkeleton) => (
                        <div key={discussionSkeleton} className="p-4 rounded-xl bg-white/5">
                          <div className="flex items-start gap-3">
                            <ProjectDetailShimmer className="w-8 h-8 rounded-full" />
                            <div className="flex-1 space-y-2">
                              <ProjectDetailShimmer className="h-4 w-48" />
                              <ProjectDetailShimmer className="h-4 w-full" />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : discussions?.map((comment, index) => (
                      <motion.div
                        key={comment.discussion_id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl ${
                          comment.message_by_role === "client"
                            ? "bg-accent/10 border border-accent/20"
                            : "bg-white/5"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                              comment.message_by_role === "client"
                                ? "bg-accent/20"
                                : "bg-white/10"
                            }`}
                          >
                            {comment.member_name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">
                                {comment.member_name}
                              </span>
                              {comment.message_by_role === "client" && (
                                <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">
                                  Client
                                </span>
                              )}
                              <span className="text-xs opacity-40">
                                {format(
                                  new Date(comment.created_at),
                                  "MMM dd, h:mm a",
                                )}
                              </span>
                            </div>
                            <p className="text-sm opacity-80">
                              {comment.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex flex-wrap gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Add a comment..."
                    />
                    <button
                      disabled={sendingMessage || message === ""}
                      onClick={handleSendMessage}
                      className="px-4 py-3 bg-accent rounded-xl hover:bg-accent/90 transition-colors"
                    >
                      {sendingMessage ? "..." : <Send className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Production Setup Tab */}
            {activeTab === "gears" && (
              <motion.div
                key="gears"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Production Summary Card */}
              
                  <div className="bg-gradient-to-br from-[#2d5f4f]/20 via-white/[0.03] to-transparent border border-[#2d5f4f]/25 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                    <h3 className="text-xl mb-4">Production Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {overviewLoading ? (
                      [0, 1, 2, 3].map((productionOverviewSkeleton) => (
                        <ProjectDetailCardShimmer key={productionOverviewSkeleton} className="h-24" />
                      ))
                    ) : (
                      <>

                       <div
       
        className="p-4 bg-white/5 rounded-xl"
      >
        <p className="text-sm opacity-60 mb-1">
         Crew Members
        </p>
        <p className="text-2xl">
          {
        productionOverview
          ?.total_members
      }
        </p>
      </div>
                     

                      {Object.entries(
    productionOverview
      ?.gear_summary || {}
  ).map(
    ([
      category,
      count,
    ]) => (
      <div
        key={category}
        className="p-4 bg-white/5 rounded-xl"
      >
        <p className="text-sm opacity-60 mb-1">
          {category}
        </p>
        <p className="text-2xl">
          {count}
        </p>
      </div>
    )
  )}
                      </>
                    )}
                    </div>
                  </div>
                

                {/* Crew Members Production Setup */}
                <div className="space-y-6">
                  {productionLoading ? (
                    [0, 1, 2].map((productionSetupSkeleton) => (
                      <div key={productionSetupSkeleton} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/10 bg-white/5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <ProjectDetailShimmer className="w-14 h-14 rounded-full" />
                              <div className="space-y-3">
                                <ProjectDetailShimmer className="h-6 w-48" />
                                <ProjectDetailShimmer className="h-6 w-24 rounded-full" />
                              </div>
                            </div>
                            <ProjectDetailShimmer className="h-9 w-24 rounded-full" />
                          </div>
                        </div>
                        <div className="p-6 space-y-4">
                          <ProjectDetailShimmer className="h-4 w-28" />
                          <div className="flex flex-wrap gap-2">
                            {[0, 1, 2, 3].map((gearPillSkeleton) => (
                              <ProjectDetailShimmer key={gearPillSkeleton} className="h-8 w-24 rounded-lg" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : productionSetup?.map((member, index) => (
                    <motion.div
                      key={member.member_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                    >
                      {/* Member Header */}
                      <div className="p-6 border-b border-white/10 bg-white/5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div
                              className={`w-14 h-14 rounded-full ${getRoleColor(member.color)} flex items-center justify-center text-lg`}
                            >
                              {member?.member_name
  ?.split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase()}
                            </div>
                            {/* Name & Role */}
                            <div>
                              <h3 className="text-xl mb-1">{member.member_name} <span className="text-xs opacity-60">(working on {member?.step_name})</span> </h3>
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs border ${getRoleColor(member.color)}`}
                              >
                                {member.role}
                              </span>
                            </div>
                          </div>
                          {/* Admin Actions */}
                          {member.is_my_step && (
                            <button
                             onClick={() => {
    if (
      editingCrew ===
      member.member_id
    ) {
      handleSaveGears(
        member
      );
    } else {
      setEditingCrew(
        member.member_id
      );

      fetchAllGears();
    }
  }}
                              className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all"
                            >
                              {editingCrew === member.member_id ? "Done" : "Edit Gear"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Gear Categories */}
                      <div className="p-6">
                        {editingCrew === member.member_id ? (
                          // Admin Edit Mode
                          <div className="space-y-6">
                            {gearsLoading ? (
                              [0, 1, 2].map((gearCategorySkeleton) => (
                                <div key={gearCategorySkeleton} className="space-y-3">
                                  <ProjectDetailShimmer className="h-5 w-32" />
                                  <div className="grid md:grid-cols-2 gap-2">
                                    {[0, 1, 2, 3].map((gearOptionSkeleton) => (
                                      <ProjectDetailCardShimmer key={gearOptionSkeleton} className="h-12" />
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              Object.keys(allGears) as Array<
                                keyof typeof allGears
                              >
                            ).map((category) => {

                              console.log(category)
                              const Icon = getCategoryIcon(category);
                              const categoryGear = member.gears_using[category]?.map((g)=>g.gear_name);

                              console.log(categoryGear)

                              return (
                                <div key={category}>
                                  <div className="flex items-center gap-2 mb-3">
                                    <Icon className="w-4 h-4 text-accent" />
                                    <h4 className="text-base capitalize opacity-70">
                                      {category}
                                    </h4>
                                  </div>
                                  <div className="grid md:grid-cols-2 gap-2">
                                    {allGears[category].map((item) => {
                                      const isSelected =
                                        categoryGear?.includes(item?.gear_name);
                                      return (
                                        <button
                                          key={item?.gear_id}
                                          onClick={() =>
                                            toggleGearForCrew(
                                              member.member_id,
                                              category,
                                              item,
                                            )
                                          }
                                          className={`flex items-center gap-2 p-3 rounded-xl text-left text-sm transition-all ${
                                            isSelected
                                              ? "bg-accent/10 border border-accent/30"
                                              : "bg-white/5 border border-white/10 hover:bg-white/10"
                                          }`}
                                        >
                                          {isSelected ? (
                                            <CheckSquare className="w-4 h-4 text-accent flex-shrink-0" />
                                          ) : (
                                            <SquareIcon className="w-4 h-4 opacity-30 flex-shrink-0" />
                                          )}
                                          <span
                                            className={
                                              isSelected ? "" : "opacity-60"
                                            }
                                          >
                                            {item?.gear_name}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          // Display Mode (both client and admin when not editing)
                          <div className="space-y-5">
                            {member?.gears_using && (
                              Object.keys(member?.gears_using) as Array<
                                keyof typeof member.gear_using
                              >
                            ).map((category) => {
                              const items = member.gears_using[category];
                              if (items.length === 0) return null;

                              const Icon = getCategoryIcon(category);

                              return (
                                <div key={category}>
                                  <div className="flex items-center gap-2 mb-3">
                                    <Icon className="w-4 h-4 text-accent" />
                                    <h4 className="text-sm capitalize opacity-60">
                                      {category}
                                    </h4>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {items.map((item, idx) => (
                                      <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm"
                                      >
                                        {item?.gear_name}
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                            {member?.gears_using && Object.values(member?.gears_using).every(
                              (arr) => arr.length === 0,
                            ) && (
                              <p className="text-sm opacity-40 italic text-center py-8">
                                No gear assigned yet
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Admin Controls */}
             
                  {/* <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                      <Plus className="w-4 h-4" />
                      <span>Add Crew Member</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                      <Download className="w-4 h-4" />
                      <span>Save as Preset</span>
                    </button>
                  </div> */}
                
              </motion.div>
            )}

            {/* Crew Travel Tab */}
            {activeTab === "travel" && (
              <motion.div
                key="travel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Travel Summary Card */}
                <div className="bg-gradient-to-br from-[#2d5f4f]/20 via-white/[0.03] to-transparent border border-[#2d5f4f]/25 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl mb-1">Travel Overview</h3>
                        <p className="text-sm opacity-60">
                          Event location and crew logistics
                        </p>
                      </div>
                    </div>
                    {userRole === "editor" && (
                      <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                        <Settings className="w-4 h-4" />
                        <span>Configure</span>
                      </button>
                    )}
                  </div>

                  {travelDataLoading ? (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          <ProjectDetailShimmer className="h-4 w-16" />
                          <ProjectDetailShimmer className="h-5 w-56" />
                          <ProjectDetailShimmer className="h-4 w-12 mt-4" />
                          <ProjectDetailShimmer className="h-5 w-64" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {[0, 1, 2, 3].map((travelStatSkeleton) => (
                            <ProjectDetailCardShimmer key={travelStatSkeleton} className="h-24" />
                          ))}
                        </div>
                      </div>
                      <ProjectDetailCardShimmer className="h-28 w-full" />
                    </div>
                  ) : (
                    <>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs opacity-60 mb-1">FROM</p>
                        <p className="text-base">
                          {travelConfig.studioLocation}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs opacity-60 mb-1">TO</p>
                        <p className="text-base flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-accent" />
                          {travelConfig.shootLocation}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-xs opacity-60 mb-1">
                          Total Distance
                        </p>
                        <p className="text-2xl">
                          {travelData?.total_distance} mi
                        </p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-xs opacity-60 mb-1">
                          Crew Traveling
                        </p>
                        <p className="text-2xl">{crewTravelData.length}</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-xs opacity-60 mb-1">
                          Free Allowance
                        </p>
                        <p className="text-base">
                          {travelConfig.freeAllowanceMiles} miles
                        </p>
                      </div>
                      <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
                        <p className="text-xs opacity-60 mb-1">Travel Fee</p>
                        <p className="text-2xl text-accent">
                          ${travelData?.total_travel_fee}
                        </p>
                      </div>
                    </div>
                  </div>

                  
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-xs opacity-60 mb-2">
                        BILLING BREAKDOWN
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="opacity-70">Total Distance</span>
                          <span>{travelData?.total_distance} miles</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Free Allowance</span>
                          <span>-20 miles</span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-1 mt-1">
                          <span>Billable Distance</span>
                          <span>
                            {Math.max(
                              0,
                              travelData?.total_distance -
                                20,
                            )}{" "}
                            miles × ${travelConfig.ratePerMile}/mile
                          </span>
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                  
                </div>

                {/* Crew Member Selector */}
                <div>
                  <h3 className="text-lg mb-4 opacity-80">Crew Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {travelDataLoading ? (
                      [0, 1, 2].map((travelCrewSkeleton) => (
                        <ProjectDetailCardShimmer key={travelCrewSkeleton} className="h-20" />
                      ))
                    ) : travelData?.team_members?.map((crew,i) => (
                      <button
                        key={i}
                       
                        className={`p-4 rounded-xl border transition-all text-left bg-accent/10 border-accent/30`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${getRoleColor(crew.color)} flex items-center justify-center text-sm`}
                          >
                            {`${crew.member_name?.split(" ")[0]?.[0] || ""}${
crew.member_name?.split(" ").slice(-1)[0]?.[0] || ""
}`.toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm mb-0.5">{crew.member_name}</p>
                            <p className="text-xs opacity-50">{crew.step_name}</p>
                          </div>
                        </div>
                        {/* <div className="flex items-center justify-between text-xs">
                          <span className="opacity-60">Distance</span>
                          <span className="flex items-center gap-1">
                            <Car className="w-3 h-3" />
                            {crew.distance} mi
                          </span>
                        </div> */}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Crew Travel Timeline */}
               <div className="bg-white/[0.055] border border-white/10 rounded-2xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <MapPinHouse className="w-5 h-5" />
                    <span>Travel Discussions</span>
                  </h3>

                  {/* Comments List */}
                  <div className="space-y-4 mb-6">
                    {travelLoading ? (
                      [0, 1, 2].map((travelDiscussionSkeleton) => (
                        <div key={travelDiscussionSkeleton} className="p-4 rounded-xl bg-white/5">
                          <div className="flex items-start gap-3">
                            <ProjectDetailShimmer className="w-8 h-8 rounded-full" />
                            <div className="flex-1 space-y-2">
                              <ProjectDetailShimmer className="h-4 w-48" />
                              <ProjectDetailShimmer className="h-4 w-full" />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : travelDiscussions?.map((comment, index) => (
                      <motion.div
                        key={comment.travel_discussion_id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl ${
                          comment.message_by_role === "client"
                            ? "bg-accent/10 border border-accent/20"
                            : "bg-white/5"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                              comment.message_by_role === "client"
                                ? "bg-accent/20"
                                : "bg-white/10"
                            }`}
                          >
                            {comment.member_name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">
                                {comment.member_name}
                              </span>
                              {comment.message_by_role === "client" && (
                                <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">
                                  Client
                                </span>
                              )}
                              <span className="text-xs opacity-40">
                                {format(
                                  new Date(comment.created_at),
                                  "MMM dd, h:mm a",
                                )}
                              </span>
                            </div>
                            <p className="text-sm opacity-80">
                              {comment.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex flex-wrap gap-3">
                    <input
                      type="text"
                      value={travelmessage}
                      onChange={(e) => settravelMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendTravelMessage()
                      }
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Reaching the location"
                    />
                    <button
                      disabled={sendingtravelMessage || travelmessage === ""}
                      onClick={handleSendTravelMessage}
                      className="px-4 py-3 bg-accent rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-60"
                    >
                      {sendingtravelMessage ? "..." : <Send className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Invoices Tab */}
           {activeTab === "invoices" && (
              <motion.div
                key="invoices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                  {/* Invoice Header */}
                  <div className="border-b border-white/10 pb-8 mb-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl mb-2">{invoiceData.businessName}</h2>
                        <p className="text-sm opacity-60">Professional Photography Services</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-60 mb-1">INVOICE</p>
                        {/* <p className="text-xl">{invoiceData.invoiceNumber}</p> */}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs opacity-60 mb-1">Issue Date</p>
                        <p>{format(new Date(invoiceData.issueDate), "MMM dd, yyyy")}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-60 mb-1">Due Date</p>
                        <p>{format(new Date(invoiceData.dueDate), "MMM dd, yyyy")}</p>
                      </div>
                      {/* <div>
                        <p className="text-xs opacity-60 mb-1">Payment Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          invoiceData.paymentStatus === "Paid"
                            ? "bg-accent/20 text-accent"
                            : invoiceData.paymentStatus === "Partially Paid"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-orange-500/20 text-orange-300"
                        }`}>
                          {invoiceData.paymentStatus}
                        </span>
                      </div> */}
                    </div>
                  </div>

                  {/* Client Details */}
                  <div className="mb-8">
                    <p className="text-xs opacity-60 mb-2">BILLED TO</p>
                    <p className="text-lg mb-1">{clientData?.client_name}</p>
                    <p className="text-sm opacity-70 capitalize">{clientData?.event_name} • {format(new Date(clientData?.event_date), "MMM dd, yyyy")}</p>
                    <p className="text-sm opacity-70">{clientData?.event_location}</p>
                  </div>

                  {/* Itemized Billing */}
                  <div className="mb-8 overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 text-xs opacity-60">DESCRIPTION</th>
                          <th className="text-right py-3 text-xs opacity-60">QTY</th>
                          <th className="text-right py-3 text-xs opacity-60">RATE</th>
                          <th className="text-right py-3 text-xs opacity-60">AMOUNT</th>
                          {
                          // userRole === "editor" && 
                          <th className="py-3 w-16" />}
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceItems.map((item, index) => (
                          <tr
                            key={item.id}
                            className={`border-b border-white/5 transition-colors ${editingInvoiceRow === index ? "bg-white/5" : "hover:bg-white/[0.03]"}`}
                          >
                            {editingInvoiceRow === index && invoiceRowDraft ? (
                              <>
                                <td className="py-3 pr-3">
                                  <input
                                    type="text"
                                    value={invoiceRowDraft.description}
                                    onChange={e => setInvoiceRowDraft(d => d ? { ...d, description: e.target.value } : d)}
                                    className="w-full bg-white/5 border border-accent/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                                  />
                                </td>
                                <td className="py-3 px-2">
                                  <input
                                    type="number"
                                    min={1}
                                    value={invoiceRowDraft.quantity}
                                    onChange={e => setInvoiceRowDraft(d => d ? { ...d, quantity: Number(e.target.value) } : d)}
                                    className="w-16 bg-white/5 border border-accent/30 rounded-lg px-2 py-1.5 text-sm text-right focus:outline-none focus:border-accent/60 transition-colors"
                                  />
                                </td>
                                <td className="py-3 px-2">
                                  <div className="flex items-center justify-end gap-1">
                                    <span className="text-sm opacity-50">$</span>
                                    <input
                                      type="number"
                                      min={0}
                                      value={invoiceRowDraft.rate}
                                      onChange={e => setInvoiceRowDraft(d => d ? { ...d, rate: Number(e.target.value) } : d)}
                                      className="w-24 bg-white/5 border border-accent/30 rounded-lg px-2 py-1.5 text-sm text-right focus:outline-none focus:border-accent/60 transition-colors"
                                    />
                                  </div>
                                </td>
                                <td className="py-3 text-right text-accent">
                                  ${(invoiceRowDraft.quantity * invoiceRowDraft.rate).toLocaleString()}
                                </td>
                                <td className="py-3 pl-3">
                                  <div className="flex gap-1 justify-end">
                                    <button
                                      onClick={() => saveInvoiceRow(index)}
                                      className="w-7 h-7 rounded-lg bg-accent/20 hover:bg-accent/30 border border-accent/30 flex items-center justify-center transition-colors"
                                    >
                                      <Check className="w-3.5 h-3.5 text-accent" />
                                    </button>
                                    <button
                                      onClick={cancelEditInvoiceRow}
                                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                                    >
                                      <X className="w-3.5 h-3.5 opacity-60" />
                                    </button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="py-4 text-sm">{item.description}</td>
                                <td className="py-4 text-right opacity-70 text-sm">{item.quantity}</td>
                                <td className="py-4 text-right opacity-70 text-sm">${item.rate.toLocaleString()}</td>
                                <td className="py-4 text-right text-sm">${item.amount.toLocaleString()}</td>
                                {
                                // userRole === "editor" &&
                                 (
                                  <td className="py-4 pl-3">
                                    <button
                                      onClick={() => startEditInvoiceRow(index)}
                                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 flex items-center justify-center transition-all group"
                                      title="Edit row"
                                    >
                                      <PenLine className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all" />
                                    </button>
                                  </td>
                                )}
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary */}
                  <div className="flex justify-end mb-8">
                    <div className="w-full md:w-80 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">Subtotal</span>
                        <span>${computedSubtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">Tax (10%)</span>
                        <span>${computedTax.toLocaleString()}</span>
                      </div>
                      {invoiceData.discount > 0 && (
                        <div className="flex justify-between text-sm text-accent">
                          <span>Discount</span>
                          <span>-${invoiceData.discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="border-t border-white/10 pt-3 flex justify-between text-xl">
                        <span>Total</span>
                        <span className="text-accent">${computedTotal.toLocaleString()}</span>
                      </div>
                      {invoiceData.paymentStatus === "Partially Paid" && (
                        <>
                          <div className="flex justify-between text-sm opacity-70">
                            <span>Amount Paid</span>
                            <span>${invoiceData.amountPaid.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-lg border-t border-white/10 pt-3">
                            <span>Balance Due</span>
                            <span className="text-orange-300">${(computedTotal - invoiceData.amountPaid).toLocaleString()}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Payment Method & Notes */}
                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <div>
                      <p className="text-xs opacity-60 mb-1">PAYMENT METHOD</p>
                      <p className="text-sm">{invoiceData.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-2">NOTES</p>
                      <p className="text-sm opacity-80 italic">{invoiceData.notes}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex gap-3">
                    {/* <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button> */}
                  </div>
                </div>
              </motion.div>
            )}
            {/* Contract Tab */}
          {activeTab === "contract" && (
              <motion.div
                key="contract"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                  {/* Contract Title + Edit Toggle */}
                  <div className="text-center mb-12 border-b border-white/10 pb-8 relative">
                    <h2 className="text-3xl md:text-4xl mb-4">Photography Service Agreement</h2>
                    <p className="text-sm opacity-60">Legal Contract</p>
                    {userRole === "editor" && (
                      <button
                        onClick={() => setContractEditing(prev => !prev)}
                        className={`absolute top-0 right-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                          contractEditing
                            ? "bg-accent text-background shadow-lg shadow-accent/20"
                            : "border border-white/10 hover:bg-white/5"
                        }`}
                      >
                        {contractEditing ? (
                          <><Check className="w-4 h-4" /><span>Done Editing</span></>
                        ) : (
                          <><Edit className="w-4 h-4" /><span>Edit Contract</span></>
                        )}
                      </button>
                    )}
                    {contractEditing && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs text-accent"
                      >
                        <PenLine className="w-3 h-3" />
                        Document is now editable — click any section to modify
                      </motion.div>
                    )}
                  </div>

                  {/* Parties */}
                  <div className="mb-8 grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-xs opacity-60 mb-2">PHOTOGRAPHER</p>
                      <p className="text-lg">{invoiceData.businessName}</p>
                      <p className="text-sm opacity-70 mt-1">Professional Photography Services</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-xs opacity-60 mb-2">CLIENT</p>
                      <p className="text-lg">{clientData?.client_name}</p>
                      <p className="text-sm opacity-70 mt-1">{clientData?.event_name} • {format(new Date(clientData?.event_date), "MMM dd, yyyy")}</p>
                    </div>
                  </div>

                  {/* Contract Sections */}
                  <div className="space-y-8 text-sm leading-relaxed">
                    {([
                      { key: "engagement" as const, num: 1, title: "Engagement of Photographer", icon: FileText },
                      { key: "delivery" as const, num: 2, title: "Delivery & Post-Production Terms (Photography)", icon: null },
                      { key: "clarification" as const, num: 3, title: "Important Clarifications:", icon: DollarSign },
                      { key: "fees" as const, num: 4, title: "Fees And Deposit", icon: null },
                      { key: "responsibilities" as const, num: 5, title: " Client Responsibilities", icon: null },
                      { key: "PhotographerResponsibilities" as const, num: 6, title: "Photographer Responsibilities", icon: null },
                      { key: "ArtisticRelease" as const, num: 7, title: "Artistic Release", icon: null },
                      { key: "terms" as const, num: 7, title: "Term and Termination", icon: null },
                      { key: "ownership" as const, num: 7, title: "Ownership of Work Product by Photographer", icon: null },
                      { key: "Indemnity" as const, num: 7, title: "Indemnity and Limitation of Liability", icon: null },
                      { key: "General" as const, num: 7, title: "General", icon: null },
                    ]).map(({ key, num, title, icon: Icon }) => (
                      <section key={key} className={`rounded-xl transition-all ${contractEditing ? "p-4 bg-white/[0.03] border border-white/10 hover:border-accent/20" : ""}`}>
                        <h3 className="text-lg mb-3 flex items-center gap-2">
                          {Icon && <Icon className="w-5 h-5 text-accent" />}
                          {num}. {title}
                        </h3>
                        {contractEditing ? (
                          <textarea
                            value={contractText[key]}
                            onChange={e => setContractText(prev => ({ ...prev, [key]: e.target.value }))}
                            rows={4}
                            className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2.5 text-sm opacity-80 focus:outline-none focus:border-accent/40 transition-colors resize-y leading-relaxed"
                          />
                        ) : (
                          <p className="opacity-80 whitespace-pre-line">{contractText[key]}</p>
                        )}
                      </section>
                    ))}
                  </div>

                  {/* Signatures */}
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-base opacity-60 mb-6">Signatures</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Photographer Signature */}
                      <div>
                        <p className="text-xs opacity-60 mb-4">COMPANY SIGNATURE</p>
                        <div className="border-b border-white/20 pb-2 mb-2">
                          <p className="text-xl italic opacity-70" style={{ fontFamily: "Georgia, serif" }}>Midori Media Company</p>
                        </div>
                        <p className="text-xs opacity-50">Date: {contractStatus && format(new Date(contractStatus?.created_at), "MMM dd, yyyy")}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-accent" />
                          </div>
                          <span className="text-xs text-accent opacity-80">Signed & verified</span>
                        </div>
                      </div>

                      {/* Client Signature */}
                      <div>
                        <p className="text-xs opacity-60 mb-4">CLIENT SIGNATURE</p>
                        {clientSigned ? (
                          <div>
                            {signMode === "type" ? (
                              <div className="border-b border-white/20 pb-2 mb-2">
                                <p className="text-xl italic opacity-90" style={{ fontFamily: "Georgia, serif" }}>{clientSignedName}</p>
                              </div>
                            ) : (
                              <div className="border border-white/10 rounded-xl overflow-hidden mb-2 bg-white/[0.02]">
                                <canvas
                                  ref={signatureCanvasRef}
                                  width={340}
                                  height={80}
                                  className="w-full h-16"
                                />
                              </div>
                            )}
                            <p className="text-xs opacity-50">
                              Date: {clientSignedDate ? format(new Date(clientSignedDate), "MMM dd, yyyy 'at' h:mm a") : ""}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-accent" />
                              </div>
                              <span className="text-xs text-accent opacity-80">Signed by client</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {/* Sign Mode Toggle */}
                           
                           
                              <div>
                                <input
                                  type="text"
                                  value={clientSignedName}
                                  onChange={e => setClientSignedName(e.target.value)}
                                  placeholder="Type your full name..."
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors"
                                  style={{ fontFamily: clientSignedName ? "Georgia, serif" : "inherit", fontStyle: clientSignedName ? "italic" : "normal" }}
                                />
                                {clientSignedName && (
                                  <p className="text-xs opacity-40 mt-1.5">Preview: how your name will appear on the contract</p>
                                )}
                              </div>
                          

                            <button
                              onClick={handleSignContract}
                              disabled={signMode === "type" ? !clientSignedName?.trim() : !hasDrawnSignature}
                              className={`w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all ${
                                (signMode === "type" ? clientSignedName?.trim() : hasDrawnSignature)
                                  ? "bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                                  : "bg-white/5 opacity-40 cursor-not-allowed"
                              }`}
                            >
                              <PenLine className="w-4 h-4" />
                             {signingContract ?'Signing...':'Sign Contract'}
                            </button>
                            <p className="text-xs opacity-40 text-center">By signing, you agree to all terms and conditions outlined in this contract.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {/* <div className="mt-8 flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div> */}
                </div>
              </motion.div>
            )}

            {/* License & Insurance Tab */}
            {activeTab === "license" && (
              <motion.div
                key="license"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 max-w-7xl mx-auto"
              >
                {/* Hidden file inputs */}
                <input ref={licenseInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" multiple className="hidden" onChange={e => handleDocUpload(e, "license")} />
               

                {/* Business License */}
                {(() => {
                  const docs = uploadedDocs.filter(d => d.category === "license");
                  return (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="text-xl mb-1">Business License</h3>
                            <p className="text-sm opacity-60">Upload and manage your business license documents</p>
                          </div>
                        </div>
                        <button
                          onClick={() => licenseInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-full text-sm text-accent transition-all flex-shrink-0"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Upload</span>
                        </button>
                      </div>

                      {licenses?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-white/10 rounded-xl hover:border-accent/20 transition-colors cursor-pointer" onClick={() => licenseInputRef.current?.click()}>
                          <FileText className="w-10 h-10 opacity-20 mb-3" />
                          <p className="text-sm opacity-40 mb-1">No documents uploaded</p>
                          <p className="text-xs opacity-30">Click or drag files to upload your business license</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {licenses?.map(doc => (
                            <motion.div
                              key={doc.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="group flex items-center justify-between p-4 bg-white/[0.04] border border-white/10 rounded-xl hover:bg-white/[0.07] hover:border-white/20 transition-all"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-4 h-4 text-accent" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm truncate">{doc.file_name}</p>
                                  {/* <p className="text-xs opacity-40">{doc.size} • Uploaded {format(new Date(doc.uploadedAt), "MMM dd, yyyy")}</p> */}
                                   <a
    href={doc.preview_url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-accent"
  >
    Open Document
  </a>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                <button
                                onClick={()=>{
                                  handleDownload(doc?.file_id)
                                }}
                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all" title="Download">
                                  <Download className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity" />
                                </button>
                                {/* <button onClick={() => removeDoc(doc.id)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100" title="Remove">
                                  <Trash2 className="w-3.5 h-3.5 opacity-50 hover:text-red-400 transition-colors" />
                                </button> */}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

               

               
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

       <UploadAssetsModal
        open={showUploadModal}
        moodboardModal={moodboardModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={(files, editedStatus, isVendor) => {
          console.log("Uploading", files.length, "files as", editedStatus, isVendor ? "(vendor)" : "");
          console.log(files)
          moodboardModal ? handleUploadFiles(files,clientId,'moodboard',false) :handleUploadFiles(files,clientId,editedStatus,isVendor)
          
          
        }}
      />

      <UploadProgressToast
  uploadProgress={
    uploadProgress
  }
  onDismiss={() =>
    setUploadProgress({})
  }
/>


  {/* Edit Project Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0e0e0e] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-2xl">Edit Project</h2>
                <button onClick={() => setShowEditModal(false)} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs tracking-widest opacity-50 mb-2 block">CLIENT NAME</label>
                  <input
                    type="text"
                    value={editDraft.client_name}
                    onChange={(e) => setEditDraft((p) => ({ ...p, client_name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-widest opacity-50 mb-2 block">EVENT TYPE</label>
                    <select
                      value={editDraft.event_name}
                      onChange={(e) => setEditDraft((p) => ({ ...p, event_name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors appearance-none"
                    >
                      {["Wedding", "Pre-wedding", "Portrait", "Event", "Commercial", "Music Video"].map((t) => (
                        <option key={t} value={t} className="bg-[#0e0e0e]">{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs tracking-widest opacity-50 mb-2 block">EVENT DATE</label>
                    <input
                      type="date"
                      value={editDraft.event_date}
                      onChange={(e) => setEditDraft((p) => ({ ...p, event_date: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-widest opacity-50 mb-2 block">LOCATION</label>
                  <input
                    type="text"
                    value={editDraft.event_location}
                    onChange={(e) => setEditDraft((p) => ({ ...p, event_location: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>

               
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditModal}
                  className="flex-1 py-3 rounded-full bg-accent text-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                >
                  <Save className="w-4 h-4" />
                  {savingEdit ? 'Saving...':'Save'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Step Modal */}
     <AnimatePresence>
        {showAddStepModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowAddStepModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0e0e0e] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-2xl">Add Workflow Step</h2>
                <button onClick={() => setShowAddStepModal(false)} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Step Name */}
                <div>
                  <label className="text-xs tracking-widest opacity-50 mb-2 block">STEP NAME</label>
                  <input
                    type="text"
                    value={newStepName}
                    onChange={(e) => setNewStepName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveAddStep()}
                    placeholder="e.g. Client Review, Final Export..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors"
                    autoFocus
                  />
                </div>

                {/* Assign To */}
                <div>
                  <label className="text-xs tracking-widest opacity-50 mb-2 block">ASSIGN TO</label>
                  <select
                    value={newStepAssignee}
                    onChange={(e) => setNewStepAssignee(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors appearance-none"
                  >
                    {teamMembers?.map((name) => (
                      <option key={name?.member_id} value={name?.member_id} className="bg-[#0e0e0e]">{name?.full_name}</option>
                    ))}
                  </select>
                </div>

                {/* Step Order */}
                <div>
                  <label className="text-xs tracking-widest opacity-50 mb-2 block">STEP ORDER</label>
                  <input
                    type="number"
                    min={1}
                    max={workflowData?.length + 1}
                    value={newStepOrder}
                    onChange={(e) => {
                      const val = e.target.value === "" ? "" : Math.min(workflowData?.length + 1, Math.max(1, Number(e.target.value)));
                      setNewStepOrder(val === "" ? "" : Number(val));
                    }}
                    placeholder={`1 – ${workflowData?.length + 1} (default: end)`}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  <p className="text-xs opacity-40 mt-1.5">Enter a position between 1 and {workflowData?.length + 1}</p>
                </div>

                {/* Current steps preview */}
                <div>
                  <label className="text-xs tracking-widest opacity-50 mb-3 block">CURRENT STEPS</label>
                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  
                  {
                    workflowData?.map((step,i)=>{
 const initials = step?.assigned_member?.split(" ")?.map(w => w[0])?.join("");
                        const statusColor =
                          step?.step_status === "completed" ? "bg-accent/15 border-accent/20" :
                          step?.step_status === "in_progress" ? "bg-blue-500/15 border-blue-500/20" :
                          "bg-white/[0.03] border-white/8";
                        const numColor =
                          step?.step_status === "completed" ? "text-accent" :
                          step?.step_status === "in_progress" ? "text-blue-300" :
                          "text-white/30";

                        return (
                          <div
                            key={step.project_step_id}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${statusColor}`}
                          >
                            <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                              <span className={`text-[10px] font-medium ${numColor}`}>{step?.step_order}</span>
                            </div>
                            <span className="text-sm text-white/70 flex-1 truncate">{step?.step_name}</span>
                            <div
                              className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 ${
                                step?.step_status === "completed" ? "bg-accent/20 border-accent/30" :
                                step?.step_status === "in_progress" ? "bg-blue-500/20 border-blue-500/30" :
                                "bg-white/5 border-white/15"
                              }`}
                            >
                              <span className={`text-[9px] font-medium ${
                                step?.step_status === "completed" ? "text-accent" :
                                step?.status === "in_progress" ? "text-blue-300" :
                                "text-white/40"
                              }`}>{initials}</span>
                            </div>
                          </div>
                        );
                    })
                  }


                   
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowAddStepModal(false)}
                  className="flex-1 py-3 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveAddStep}
                  disabled={!newStepName.trim()}
                  className={`flex-1 py-3 rounded-full text-sm flex items-center justify-center gap-2 transition-colors ${
                    newStepName.trim()
                      ? "bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                      : "bg-white/5 opacity-40 cursor-not-allowed"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  {
                    addingStep ? 'Adding...' : 'Add Step'
                  }
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Vendor Access Modal */}
      <AnimatePresence>
        {showVendorModal && !vendorAgreed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-[#07100d] border border-accent/25 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl shadow-accent/10"
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setShowVendorModal(false);
                  setAssetView("client");
                }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <Share2 className="w-10 h-10 text-accent" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl text-center mb-4">
                Vendor Media Access
              </h2>

              {/* Message */}
              <div className="text-center mb-8 space-y-3 opacity-80">
                <p className="text-base">
                  You are about to access professionally curated media prepared
                  for wedding vendors and collaborators.
                </p>
                <p className="text-base">
                  These images are provided for{" "}
                  <span className="text-accent">
                    promotional and portfolio usage only
                  </span>
                  .
                </p>
                <p className="text-base">
                  Unauthorized redistribution, editing, resale, or commercial
                  misuse is prohibited.
                </p>
              </div>

              {/* Agreement Checkbox */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={vendorAgreed}
                      onChange={(e) => setVendorAgreed(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 appearance-none cursor-pointer checked:bg-accent checked:border-accent transition-all"
                    />
                    {vendorAgreed && (
                      <CheckCircle className="w-5 h-5 text-background absolute pointer-events-none" />
                    )}
                  </div>
                  <span className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    I understand and agree to the usage guidelines. I will use
                    these images responsibly for promotional purposes only and
                    credit Midori Media appropriately.
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setShowVendorModal(false);
                    setAssetView("client");
                    setVendorAgreed(false);
                  }}
                  className="flex-1 px-6 py-3.5 border border-white/10 rounded-full hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowVendorModal(false)}
                  disabled={!vendorAgreed}
                  className={`flex-1 px-6 py-3.5 rounded-full transition-all ${
                    vendorAgreed
                      ? "bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                      : "bg-white/5 opacity-40 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>

              {/* Footer Note */}
              <p className="text-xs text-center opacity-50 mt-6">
                By continuing, you acknowledge that all media remains the
                intellectual property of Midori Media
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for Asset Preview */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAsset(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[80vh] "
            >
              <button
                onClick={() => setSelectedAsset(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedAsset.preview_url}
                alt={selectedAsset.file_name}
                 className="w-full h-auto max-h-[80vh] object-contain rounded-xl md:rounded-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-lg">{selectedAsset.file_name}</p>
                <p className="text-sm opacity-50 capitalize">
                  {selectedAsset.file_type}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for Vendor Image Preview */}
      <AnimatePresence>
        {selectedVendorImage && selectedVendorCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVendorImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedVendorImage(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative">
                <img
                  src={selectedVendorImage.url}
                  alt={selectedVendorImage.name}
                  className="w-full h-auto rounded-2xl"
                />
                {selectedVendorCollection.permissions.watermark && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-white/30 text-6xl font-bold rotate-[-30deg]">
                      Midori Media
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-center flex-1">
                  <p className="text-lg">{selectedVendorImage.name}</p>
                  <p className="text-sm opacity-50">
                    {selectedVendorCollection.vendorName}
                  </p>
                </div>
                {selectedVendorCollection.permissions.download && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm text-white shadow-lg shadow-accent/15 hover:bg-accent/90 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
