import { useEffect, useState } from "react";
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
} from "lucide-react";
import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  addMoodboardDiscussion,
  addMoodboardSong,
  addTravelDiscussion,
  assignGears,
  deleteMoodboardSong,
  getAllGears,
  getClientAssets,
  getClientHeader,
  getClientNotes,
  getClientOverview,
  getClientWorkflow,
  getMoodboardAssets,
  getMoodboardDiscussions,
  getMoodboardSongs,
  getProductionOverview,
  getProductionSetup,
  getTravelData,
  getTravelDiscussions,
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
      blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
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

  useEffect(() => {
    const fetchClientHeader = async () => {
      try {
        const response = await getClientHeader(clientId);
        setClientData(response.data);
      } catch (error) {
        console.error(error);

        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientHeader();
  }, [clientId]);

  const handleWorkflowAction = async (action) => {
    try {
      const response = await updateWorkflowStatus(clientId, action);

      toast.success(response.message);

      // Optional:
      // Refresh overview/header data
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
      const response = await getClientNotes(clientId);

      setClientNotes(response.data?.client_notes || "");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSaveNotes = async () => {

    if(user.role){
      toast.error("Only clients can Add Notes")
      return; 
    }
    try {
      
      setSavingNotes(true);

      const response = await updateClientNotes(clientId, clientNotes);

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

      setOverviewData(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOverviewLoading(false);
    }
  };

  const fetchWorkflow = async () => {
    console.log("hello");
    try {
      setWorkflowLoading(true);

      const response = await getClientWorkflow(clientId);
      console.log(response.data);
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
const fetchMoodboardAssets =
  async () => {
    try {
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
  }, [activeTab]);



  return (
    <div className="relative bg-background text-foreground min-h-screen">
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
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
            <div>
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
                <p className="text-sm opacity-60 mb-5">Project Status</p>
                <div className="flex items-center gap-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      clientData?.project_status === "Completed"
                        ? "bg-accent/20 text-accent"
                        : clientData?.project_status === "In Progress"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-orange-500/20 text-orange-300"
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
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto">
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
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-70"
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
                {/* Current Active Step */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4">Current Active Step</h3>
                  {workflowSteps.find((s) => s.status === "in_progress") && (
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
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                        In Progress
                      </span>
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
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
                              new Date(activity.created_at),
                              "MMM dd, yyyy 'at' h:mm a",
                            )}
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
                        <div className="flex gap-3">
                          {["edited", "unedited"].map((set) => (
                            <button
                             onClick={() =>
      changeFilter(set)
    }
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
                        className="flex items-center gap-2 px-4 py-2.5 bg-accent rounded-full text-sm hover:bg-accent/90 transition-colors">
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

                    {/* Asset Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {currentAssets?.map((asset, index) => (
                        <motion.div
                          key={asset.file_id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedAsset(asset)}
                          className="group relative aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-accent/50 transition-all"
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

                  </>
                )}

                {/* Vendor Media Access View */}
                {assetView === "vendor" && vendorAgreed && (
                  <div className="space-y-6">
                    {/* Vendor Collections Grid */}
                    {!selectedVendorCollection && (
                      <>
                        <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-6">
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
                                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-accent/50 hover:bg-white/10 transition-all"
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
                                            ? "bg-orange-500/20 text-orange-300"
                                            : "bg-red-500/20 text-red-300"
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

                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
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
                                  <button className="flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm hover:bg-accent/90 transition-colors">
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
                                className="group relative aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-accent/50 transition-all"
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
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
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
                              <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              <span>
                                Unauthorized redistribution, editing, or resale
                                is prohibited
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              <span>
                                Commercial use beyond portfolio display requires
                                written authorization
                              </span>
                            </li>
                          </ul>
                        </div>

                        {/* Analytics (Admin Only) */}
                        {userRole === "editor" && (
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
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
                  {workflowData?.map((step, index) => {
                    const isCompleted = step.step_status === "completed";
                    const isInProgress = step.step_status === "in_progress";
                    const isPending = step.step_status === "pending";
                    const isLocked =
                      index > 0 &&
                      workflowData[index - 1].status !== "completed";

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
                          <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-white/10">
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
                                ? "border-blue-500/30 bg-blue-500/5"
                                : isLocked
                                  ? "border-white/10 opacity-50"
                                  : "border-white/10"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              {/* Status Icon */}
                              <div
                                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                  isCompleted
                                    ? "bg-accent/20"
                                    : isInProgress
                                      ? "bg-blue-500/20"
                                      : "bg-white/5"
                                }`}
                              >
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
                                          ? "bg-blue-500/20 text-blue-300"
                                          : isLocked
                                            ? "bg-white/5 text-white/40"
                                            : "bg-orange-500/20 text-orange-300"
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
                            {isPending && !isLocked && step.is_my_step && (
                              <button
                                onClick={() => handleWorkflowAction("start")}
                                className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-accent/10 hover:border-accent/30 transition-all whitespace-nowrap"
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
                                    handleWorkflowAction("working")
                                  }
                                  className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-accent/10 hover:border-accent/30 transition-all whitespace-nowrap"
                                >
                                  Mark Activity
                                </button>
                              )}
                            {!isCompleted && !isLocked && step.is_my_step && (
                              <button
                                onClick={() => handleWorkflowAction("finish")}
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

                  <div className="w-full flex items-center justify-end">
                    <button
                      disabled={savingNotes}
                      onClick={handleSaveNotes}
                      className="px-4 py-3 mt-4 w-full bg-accent rounded-xl hover:bg-accent/90 transition-colors"
                    >
                      {savingNotes ? "Saving..." : "Save"}
                    </button>
                  </div>
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
                    {songs?.map((song, index) => (
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
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full mb-4">
                    <h3 className="text-xl ">Reference Materials</h3>

                   {!user.role &&    <button 
                         onClick={() => {setShowUploadModal(true)
    setMoodboardModal(true)

                         }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-accent rounded-full text-sm hover:bg-accent/90 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>Upload Assets</span>
                        </button>} 
                </div>
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {moodboardAssets?.map((asset, index) => (
                        <motion.div
                          key={asset.file_id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedAsset(asset)}
                          className="group relative aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-accent/50 transition-all"
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
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Moodboard Discussion</span>
                  </h3>

                  {/* Comments List */}
                  <div className="space-y-4 mb-6">
                    {discussions?.map((comment, index) => (
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
                  <div className="flex gap-3">
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
              
                  <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-6">
                    <h3 className="text-xl mb-4">Production Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    

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
                    </div>
                  </div>
                

                {/* Crew Members Production Setup */}
                <div className="space-y-6">
                  {productionSetup?.map((member, index) => (
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
                            {(
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
             
                  {/* <div className="flex gap-3">
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
                <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-6">
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
                  
                </div>

                {/* Crew Member Selector */}
                <div>
                  <h3 className="text-lg mb-4 opacity-80">Crew Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {travelData?.team_members?.map((crew,i) => (
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
               <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <MapPinHouse className="w-5 h-5" />
                    <span>Travel Discussions</span>
                  </h3>

                  {/* Comments List */}
                  <div className="space-y-4 mb-6">
                    {travelDiscussions?.map((comment, index) => (
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
                  <div className="flex gap-3">
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
                        <h2 className="text-3xl mb-2">
                          {invoiceData.businessName}
                        </h2>
                        <p className="text-sm opacity-60">
                          Professional Photography Services
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-60 mb-1">INVOICE</p>
                        <p className="text-xl">{invoiceData.invoiceNumber}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs opacity-60 mb-1">Issue Date</p>
                        <p>
                          {format(
                            new Date(invoiceData.issueDate),
                            "MMM dd, yyyy",
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs opacity-60 mb-1">Due Date</p>
                        <p>
                          {format(
                            new Date(invoiceData.dueDate),
                            "MMM dd, yyyy",
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs opacity-60 mb-1">
                          Payment Status
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs ${
                            invoiceData.paymentStatus === "Paid"
                              ? "bg-accent/20 text-accent"
                              : invoiceData.paymentStatus === "Partially Paid"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-orange-500/20 text-orange-300"
                          }`}
                        >
                          {invoiceData.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Client Details */}
                  <div className="mb-8">
                    <p className="text-xs opacity-60 mb-2">BILLED TO</p>
                    <p className="text-lg mb-1">{mockProject.clientName}</p>
                    <p className="text-sm opacity-70">
                      {mockProject.eventType} •{" "}
                      {format(new Date(mockProject.eventDate), "MMM dd, yyyy")}
                    </p>
                    <p className="text-sm opacity-70">{mockProject.location}</p>
                  </div>

                  {/* Itemized Billing */}
                  <div className="mb-8 overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 text-xs opacity-60">
                            DESCRIPTION
                          </th>
                          <th className="text-right py-3 text-xs opacity-60">
                            QTY
                          </th>
                          <th className="text-right py-3 text-xs opacity-60">
                            RATE
                          </th>
                          <th className="text-right py-3 text-xs opacity-60">
                            AMOUNT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.items.map((item, index) => (
                          <tr key={index} className="border-b border-white/5">
                            <td className="py-4">{item.description}</td>
                            <td className="py-4 text-right opacity-70">
                              {item.quantity}
                            </td>
                            <td className="py-4 text-right opacity-70">
                              ${item.rate.toLocaleString()}
                            </td>
                            <td className="py-4 text-right">
                              ${item.amount.toLocaleString()}
                            </td>
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
                        <span>${invoiceData.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="opacity-60">Tax (10%)</span>
                        <span>${invoiceData.tax.toLocaleString()}</span>
                      </div>
                      {invoiceData.discount > 0 && (
                        <div className="flex justify-between text-sm text-accent">
                          <span>Discount</span>
                          <span>-${invoiceData.discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="border-t border-white/10 pt-3 flex justify-between text-xl">
                        <span>Total</span>
                        <span className="text-accent">
                          ${invoiceData.total.toLocaleString()}
                        </span>
                      </div>
                      {invoiceData.paymentStatus === "Partially Paid" && (
                        <>
                          <div className="flex justify-between text-sm opacity-70">
                            <span>Amount Paid</span>
                            <span>
                              ${invoiceData.amountPaid.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg border-t border-white/10 pt-3">
                            <span>Balance Due</span>
                            <span className="text-orange-300">
                              $
                              {(
                                invoiceData.total - invoiceData.amountPaid
                              ).toLocaleString()}
                            </span>
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
                      <p className="text-sm opacity-80 italic">
                        {invoiceData.notes}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {userRole === "editor" && (
                    <div className="mt-8 flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                        <Edit className="w-4 h-4" />
                        <span>Edit Invoice</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  )}
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
                  {/* Contract Title */}
                  <div className="text-center mb-12 border-b border-white/10 pb-8">
                    <h2 className="text-3xl md:text-4xl mb-4">
                      Photography Service Agreement
                    </h2>
                    <p className="text-sm opacity-60">
                      Legal Contract between Photographer and Client
                    </p>
                  </div>

                  {/* Parties */}
                  <div className="mb-8 grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-xs opacity-60 mb-2">PHOTOGRAPHER</p>
                      <p className="text-lg">{invoiceData.businessName}</p>
                      <p className="text-sm opacity-70 mt-1">
                        Professional Photography Services
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-xs opacity-60 mb-2">CLIENT</p>
                      <p className="text-lg">{mockProject.clientName}</p>
                      <p className="text-sm opacity-70 mt-1">
                        {mockProject.eventType} •{" "}
                        {format(
                          new Date(mockProject.eventDate),
                          "MMM dd, yyyy",
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Contract Sections */}
                  <div className="space-y-8 text-sm leading-relaxed">
                    <section>
                      <h3 className="text-lg mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-accent" />
                        1. Scope of Work
                      </h3>
                      <p className="opacity-80">
                        The Photographer agrees to provide professional
                        photography and videography services for the Client's{" "}
                        {mockProject.eventType.toLowerCase()}
                        on{" "}
                        {format(
                          new Date(mockProject.eventDate),
                          "MMMM dd, yyyy",
                        )}{" "}
                        at {mockProject.location}. Services include event
                        coverage, pre-event shoot, post-production editing,
                        color grading, and final delivery of digital assets.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg mb-3">2. Deliverables</h3>
                      <ul className="list-disc list-inside space-y-2 opacity-80">
                        <li>
                          500+ professionally edited high-resolution photographs
                        </li>
                        <li>
                          5-7 minute highlight video with cinematic color
                          grading
                        </li>
                        <li>
                          Digital delivery via secure online gallery within 6
                          weeks
                        </li>
                        <li>
                          Full-resolution download rights for personal use
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg mb-3 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-accent" />
                        3. Payment Terms
                      </h3>
                      <p className="opacity-80 mb-3">
                        Total project cost:{" "}
                        <span className="text-accent">
                          ${invoiceData.total.toLocaleString()}
                        </span>
                      </p>
                      <ul className="list-disc list-inside space-y-2 opacity-80">
                        <li>
                          50% deposit (${invoiceData.total * 0.5}) due upon
                          contract signing to secure the date
                        </li>
                        <li>Remaining 50% due on or before the event date</li>
                        <li>
                          Late payments subject to 5% monthly interest charge
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg mb-3">
                        4. Cancellation & Refund Policy
                      </h3>
                      <p className="opacity-80">
                        Cancellations made more than 60 days prior to the event:
                        75% refund of deposit. Cancellations made 30-60 days
                        prior: 50% refund. Cancellations less than 30 days
                        prior: No refund. Photographer may cancel due to
                        illness, emergency, or force majeure with full refund of
                        all payments received.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg mb-3">
                        5. Usage Rights & Copyright
                      </h3>
                      <p className="opacity-80 mb-3">
                        The Photographer retains full copyright of all images
                        and videos. The Client receives unlimited personal usage
                        rights for the delivered content. Commercial use
                        requires separate written authorization. The
                        Photographer reserves the right to use images for
                        portfolio, marketing, and promotional purposes unless
                        explicitly restricted by Client in writing.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg mb-3">6. Liability Clause</h3>
                      <p className="opacity-80">
                        The Photographer's liability is limited to a refund of
                        payments made. The Photographer is not liable for missed
                        shots due to obstructions, lighting conditions, or other
                        circumstances beyond reasonable control. The
                        Photographer maintains backup equipment but is not
                        liable for technical failures beyond their control.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg mb-3">7. Force Majeure</h3>
                      <p className="opacity-80">
                        Neither party shall be liable for failure to perform due
                        to causes beyond reasonable control including natural
                        disasters, acts of terrorism, pandemic, government
                        restrictions, or other unforeseeable circumstances. In
                        such cases, the contract may be rescheduled or
                        terminated with full refund.
                      </p>
                    </section>
                  </div>

                  {/* Signatures */}
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-xs opacity-60 mb-4">
                          PHOTOGRAPHER SIGNATURE
                        </p>
                        <div className="border-b border-white/20 pb-2 mb-2">
                          <p className="text-lg italic opacity-60">
                            Sarah Chen
                          </p>
                        </div>
                        <p className="text-xs opacity-50">
                          Date:{" "}
                          {format(
                            new Date(invoiceData.issueDate),
                            "MMM dd, yyyy",
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs opacity-60 mb-4">
                          CLIENT SIGNATURE
                        </p>
                        <div className="border-b border-white/20 pb-2 mb-2">
                          <p className="text-lg italic opacity-60">
                            {mockProject.clientName}
                          </p>
                        </div>
                        <p className="text-xs opacity-50">
                          Date:{" "}
                          {format(
                            new Date(invoiceData.issueDate),
                            "MMM dd, yyyy",
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {userRole === "editor" && (
                    <div className="mt-8 flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                        <Upload className="w-4 h-4" />
                        <span>Upload Contract</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  )}
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
                className="space-y-6"
              >
                {/* Business License */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-1">Business License</h3>
                      <p className="text-sm opacity-60">
                        Verified and registered business entity
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs opacity-60 mb-1">LICENSE NUMBER</p>
                      <p className="text-base">BL-2024-PHOTO-8742</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">
                        ISSUING AUTHORITY
                      </p>
                      <p className="text-base">California State Board</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">VALIDITY PERIOD</p>
                      <p className="text-base">Jan 2024 - Jan 2027</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Insurance */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-1">
                        Professional Liability Insurance
                      </h3>
                      <p className="text-sm opacity-60">
                        Comprehensive coverage for equipment and liability
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-xs opacity-60 mb-1">PROVIDER</p>
                      <p className="text-base">Hiscox Insurance Company</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">POLICY NUMBER</p>
                      <p className="text-base">HSX-PROF-2024-5691</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">COVERAGE TYPE</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-2 py-1 rounded-full bg-white/5 text-xs">
                          Equipment Coverage
                        </span>
                        <span className="px-2 py-1 rounded-full bg-white/5 text-xs">
                          General Liability
                        </span>
                        <span className="px-2 py-1 rounded-full bg-white/5 text-xs">
                          Professional Indemnity
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">VALIDITY</p>
                      <p className="text-base">Mar 2024 - Mar 2027</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-xs opacity-60 mb-2">COVERAGE AMOUNT</p>
                    <p className="text-lg">
                      $2,000,000 General Liability • $500,000 Equipment Coverage
                    </p>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-1">
                        Professional Certifications
                      </h3>
                      <p className="text-sm opacity-60">
                        Industry-recognized qualifications
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="mb-2">
                        Certified Professional Photographer (CPP)
                      </p>
                      <p className="text-xs opacity-60">
                        Professional Photographers of America • 2023
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="mb-2">
                        Advanced Wedding Photography Specialist
                      </p>
                      <p className="text-xs opacity-60">
                        Wedding & Portrait Photographers Int'l • 2022
                      </p>
                    </div>
                  </div>
                </div>

                {/* Document Attachments */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl mb-4">Document Attachments</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-accent" />
                        <div>
                          <p className="text-sm">Business_License_2024.pdf</p>
                          <p className="text-xs opacity-50">248 KB</p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-accent" />
                        <div>
                          <p className="text-sm">
                            Insurance_Certificate_2024.pdf
                          </p>
                          <p className="text-xs opacity-50">512 KB</p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {userRole === "editor" && (
                    <button className="mt-4 flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full text-sm hover:bg-white/5 transition-all">
                      <Upload className="w-4 h-4" />
                      <span>Upload Document</span>
                    </button>
                  )}
                </div>
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
              className="relative bg-background border border-accent/20 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl shadow-accent/10"
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
              <div className="flex gap-3">
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
            className="fixed inset-0 z-50 bg-black/90 bg] flex items-center justify-center p-4"
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
                  <button className="flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm hover:bg-accent/90 transition-colors">
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
