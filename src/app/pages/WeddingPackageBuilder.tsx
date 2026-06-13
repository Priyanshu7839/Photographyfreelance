import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Video,
  Music,
  Users,
  Star,
  Check,
  Plus,
  Minus,
  ArrowRight,
  X,
  Clock,
  Image,
  Layers,
  Plane,
  BookOpen,
  Zap,
  Phone,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Package {
  id: string;
  name: string;
  price: number;
  priceLabel?: string;
  features: string[];
  highlight?: boolean;
  note?: string;
}

interface ServiceType {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  packages: Package[];
  videoAddonNote?: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const SERVICE_TYPES: ServiceType[] = [
  {
    id: "portrait",
    label: "Portrait Sessions",
    subtitle: "Graduation, Seniors, Couples, Lifestyle & More",
    icon: Camera,
    packages: [
      {
        id: "portrait-essential",
        name: "Essential",
        price: 150,
        features: ["30 Minutes", "1 Outfit", "15 Edited Photos"],
      },
      {
        id: "portrait-signature",
        name: "Signature",
        price: 200,
        highlight: true,
        features: ["1 Hour", "2 Outfits", "30 Edited Photos"],
      },
      {
        id: "portrait-premium",
        name: "Premium",
        price: 275,
        features: ["90 Minutes", "3 Outfits", "50 Edited Photos"],
      },
    ],
  },
  {
    id: "events",
    label: "Events",
    subtitle: "Birthdays, Parties, Showers, Corporate Events & More",
    icon: Users,
    packages: [
      {
        id: "events-1hr",
        name: "1 Hour",
        price: 150,
        priceLabel: "$150/hr",
        features: ["50+ Edited Photos", "High Quality Coverage", "Online Gallery"],
      },
      {
        id: "events-2hr",
        name: "2 Hours",
        price: 250,
        priceLabel: "$125/hr",
        highlight: true,
        features: ["100+ Edited Photos", "Consistent Coverage", "Online Gallery"],
      },
      {
        id: "events-3hr",
        name: "3+ Hours",
        price: 330,
        priceLabel: "$110/hr",
        features: ["150+ Edited Photos", "Priority Delivery", "Online Gallery"],
        note: "Video Add-On Available · +$100/hr",
      },
    ],
    videoAddonNote: "+$100/hr",
  },
  {
    id: "weddings",
    label: "Weddings",
    subtitle: "Full Day, Half Day & Intimate Coverage",
    icon: Sparkles,
    packages: [
      {
        id: "wedding-tier1",
        name: "Tier 1",
        price: 1800,
        highlight: true,
        features: [
          "8 Hours Coverage",
          "3 Photographer",
          "400+ Edited Photos",
          "1 Week Turnaround",
        ],
      },
      {
        id: "wedding-tier2",
        name: "Tier 2",
        price: 1200,
        features: [
          "6 Hours Coverage",
          "1 Photographer",
          "200+ Edited Photos",
          "1 Week Turnaround",
        ],
        note: "Video Add-On Available",
      },
      {
        id: "wedding-tier3",
        name: "Tier 3",
        price: 600,
        features: [
          "4 Hours Coverage",
          "1 Photographer",
          "50–150 Photos",
          "2 Week Turnaround",
        ],
        note: "Video Add-On Available",
      },
    ],
  },
  {
    id: "musicvideos",
    label: "Music Videos",
    subtitle: "Artist Promos, Singles, Visual Storytelling",
    icon: Music,
    packages: [
      {
        id: "mv-tier3",
        name: "Tier 3",
        price: 400,
        features: ["1 Location", "2–3 Hours", "Basic Editing"],
      },
      {
        id: "mv-tier2",
        name: "Tier 2",
        price: 700,
        highlight: true,
        features: ["Multiple Locations", "4–6 Hours", "Cinematic Edits"],
      },
      {
        id: "mv-tier1",
        name: "Tier 1",
        price: 1000,
        features: ["Full Production Concept", "Advanced Editing", "Teaser Clips"],
      },
    ],
  },
  {
    id: "content",
    label: "Content Creator",
    subtitle: "Brand Content, Social Media, Ongoing Packages",
    icon: Video,
    packages: [
      {
        id: "content-starter",
        name: "Starter",
        price: 150,
        features: ["2 Reels", "15 Photos", "1 Hour"],
      },
      {
        id: "content-growth",
        name: "Growth",
        price: 300,
        highlight: true,
        features: ["5 Reels", "30 Photos", "2 Hours"],
      },
      {
        id: "content-monthly",
        name: "Monthly Content",
        price: 600,
        priceLabel: "$600+/mo",
        features: ["Weekly Content", "Reels + Photos", "Social Media Focused"],
      },
    ],
  },
];

interface AddOn {
  id: string;
  label: string;
  price: number;
  priceLabel: string;
  icon: React.ElementType;
}

const ADD_ONS: AddOn[] = [
  { id: "extra-photos", label: "Additional Edited Photos", price: 50, priceLabel: "+$50", icon: Image },
  { id: "rush", label: "Rush Delivery", price: 75, priceLabel: "+$75", icon: Zap },
  { id: "second-photo", label: "Second Photographer", price: 75, priceLabel: "+$75/hr", icon: Camera },
  { id: "drone", label: "Drone Footage", price: 100, priceLabel: "+$100", icon: Plane },
  { id: "video-addon", label: "Video Add-On", price: 100, priceLabel: "+$100/hr", icon: Video },
  { id: "extra-time", label: "Extra Shoot Time", price: 100, priceLabel: "+$100/hr", icon: Clock },
  { id: "album", label: "Premium Album", price: 150, priceLabel: "+$150", icon: BookOpen },
  { id: "studio", label: "Reserved Professional Studio", price: 85, priceLabel: "+$85/hr", icon: Layers },
];

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const start = prev.current;
    const end = value;
    const duration = 500;
    const startTime = performance.now();
    function tick(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(start + (end - start) * ease));
      if (t < 1) requestAnimationFrame(tick);
      else prev.current = end;
    }
    requestAnimationFrame(tick);
  }, [value]);

  return <>{fmt(displayed)}</>;
}

// ─── Service Type Card ─────────────────────────────────────────────────────────

function ServiceTypeCard({
  service,
  active,
  onClick,
}: {
  service: ServiceType;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = service.icon;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 overflow-hidden group ${
        active
          ? "border-accent bg-accent/10"
          : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      {active && (
        <motion.div
          layoutId="serviceActive"
          className="absolute inset-0 rounded-2xl"
          style={{ boxShadow: "0 0 40px rgba(45,95,79,0.25) inset" }}
        />
      )}
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
            active ? "bg-accent/20" : "bg-white/5"
          }`}
        >
          <Icon size={18} className={active ? "text-accent" : "text-white/50"} />
        </div>
        <div className="min-w-0">
          <p className={`font-medium transition-colors duration-300 ${active ? "text-white" : "text-white/80"}`}>
            {service.label}
          </p>
          <p className="text-xs text-white/35 mt-0.5 leading-snug">{service.subtitle}</p>
        </div>
        {active && (
          <div className="ml-auto flex-shrink-0">
            <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
              <Check size={10} className="text-white" />
            </div>
          </div>
        )}
      </div>
    </motion.button>
  );
}

// ─── Package Card ──────────────────────────────────────────────────────────────

function PackageCard({
  pkg,
  active,
  onClick,
}: {
  pkg: Package;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full text-left rounded-2xl border overflow-hidden transition-all duration-300 ${
        active
          ? "border-accent bg-gradient-to-b from-accent/15 to-accent/5"
          : pkg.highlight
          ? "border-white/20 bg-white/[0.04] hover:border-white/30"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
      style={
        active
          ? { boxShadow: "0 0 30px rgba(45,95,79,0.2), 0 4px 24px rgba(0,0,0,0.4)" }
          : {}
      }
    >
      {pkg.highlight && !active && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      )}
      {active && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      )}

      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            {pkg.highlight && (
              <span className="inline-block text-[10px] tracking-[0.15em] uppercase text-accent mb-2 px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10">
                Popular
              </span>
            )}
            <h4 className="text-lg font-medium text-white">{pkg.name}</h4>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-light transition-colors duration-300 ${active ? "text-accent" : "text-white"}`}>
              {pkg.priceLabel ? pkg.priceLabel.split("/")[0] : fmt(pkg.price)}
            </p>
            {pkg.priceLabel && pkg.priceLabel.includes("/") && (
              <p className="text-xs text-white/30">/{pkg.priceLabel.split("/")[1]}</p>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-5">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${active ? "bg-accent/25" : "bg-white/8"}`}>
                <Check size={9} className={active ? "text-accent" : "text-white/50"} />
              </div>
              <span className="text-sm text-white/60">{f}</span>
            </li>
          ))}
        </ul>

        {/* Note */}
        {pkg.note && (
          <p className="text-xs text-white/30 mt-3 pt-3 border-t border-white/8">{pkg.note}</p>
        )}

        {/* Select indicator */}
        <div
          className={`mt-4 py-2.5 rounded-xl border text-center text-sm font-medium transition-all duration-300 ${
            active
              ? "border-accent bg-accent text-white"
              : "border-white/10 text-white/40 group-hover:border-white/20"
          }`}
        >
          {active ? "Selected" : "Select Package"}
        </div>
      </div>
    </motion.button>
  );
}

// ─── Add-On Chip ───────────────────────────────────────────────────────────────

function AddOnChip({
  addon,
  active,
  onClick,
}: {
  addon: AddOn;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = addon.icon;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-300 overflow-hidden ${
        active
          ? "border-accent bg-accent/12"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
      style={active ? { boxShadow: "0 0 20px rgba(45,95,79,0.15)" } : {}}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${active ? "bg-accent/20" : "bg-white/5"}`}>
        <Icon size={14} className={active ? "text-accent" : "text-white/40"} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/80 leading-tight">{addon.label}</p>
        <p className={`text-xs mt-0.5 transition-colors duration-300 ${active ? "text-accent" : "text-white/35"}`}>
          {addon.priceLabel}
        </p>
      </div>
      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${active ? "border-accent bg-accent" : "border-white/20"}`}>
        {active ? <Check size={9} className="text-white" /> : <Plus size={9} className="text-white/30" />}
      </div>
    </motion.button>
  );
}

// ─── Summary Card ──────────────────────────────────────────────────────────────

function SummaryCard({
  serviceType,
  selectedPackage,
  addOns,
  onBook,
}: {
  serviceType: ServiceType | null;
  selectedPackage: Package | null;
  addOns: string[];
  onBook: () => void;
}) {
  const basePrice = selectedPackage?.price ?? 0;
  const addOnsTotal = addOns.reduce((sum, id) => sum + (ADD_ONS.find((a) => a.id === id)?.price ?? 0), 0);
  const total = basePrice + addOnsTotal;

  const selectedAddOns = addOns.map((id) => ADD_ONS.find((a) => a.id === id)!).filter(Boolean);

  const estimatedDelivery =
    selectedPackage?.features.find((f) => f.toLowerCase().includes("week"))
      ? selectedPackage.features.find((f) => f.toLowerCase().includes("week"))!
      : addOns.includes("rush")
      ? "3–5 Business Days"
      : serviceType?.id === "portrait" || serviceType?.id === "events"
      ? "1–2 Weeks"
      : "2–3 Weeks";

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8">
        <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-1">Package Summary</p>
        <p className="text-2xl font-light text-white">
          <AnimatedNumber value={total} />
        </p>
        {total > 0 && (
          <p className="text-xs text-white/25 mt-1">Estimated total</p>
        )}
      </div>

      <div className="px-6 py-5 space-y-4">
        {/* Service */}
        <div>
          <p className="text-xs tracking-[0.15em] uppercase text-white/25 mb-2">Service</p>
          {serviceType ? (
            <p className="text-sm text-white/70">{serviceType.label}</p>
          ) : (
            <p className="text-sm text-white/25 italic">Not selected</p>
          )}
        </div>

        {/* Package */}
        <div>
          <p className="text-xs tracking-[0.15em] uppercase text-white/25 mb-2">Package</p>
          {selectedPackage ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">{selectedPackage.name}</p>
              <p className="text-sm text-white/70">{fmt(selectedPackage.price)}</p>
            </div>
          ) : (
            <p className="text-sm text-white/25 italic">Not selected</p>
          )}
        </div>

        {/* Coverage */}
        {selectedPackage && (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/25 mb-2">Coverage</p>
            {selectedPackage.features.slice(0, 2).map((f) => (
              <p key={f} className="text-sm text-white/50">{f}</p>
            ))}
          </div>
        )}

        {/* Add-ons */}
        {selectedAddOns.length > 0 && (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/25 mb-2">Add-ons</p>
            <div className="space-y-1.5">
              {selectedAddOns.map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <p className="text-sm text-white/50">{a.label}</p>
                  <p className="text-sm text-white/50">{a.priceLabel}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delivery */}
        {selectedPackage && (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/25 mb-2">Est. Delivery</p>
            <p className="text-sm text-white/50">{estimatedDelivery}</p>
          </div>
        )}

        {/* Divider */}
        {total > 0 && (
          <>
            <div className="h-px bg-white/8" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Total</span>
              <span className="text-lg font-light text-accent">{fmt(total)}</span>
            </div>
          </>
        )}
      </div>

      {/* CTAs */}
      <div className="px-6 pb-6 space-y-3">
        {/* <motion.button
          onClick={onBook}
          disabled={!selectedPackage}
          whileHover={selectedPackage ? { scale: 1.02 } : {}}
          whileTap={selectedPackage ? { scale: 0.98 } : {}}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 ${
            selectedPackage
              ? "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20"
              : "bg-white/5 text-white/20 cursor-not-allowed"
          }`}
        >
          Book This Package
          <ArrowRight size={16} />
        </motion.button> */}
        <Link
          to="/booking"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/12 text-white/50 text-sm hover:border-white/25 hover:text-white/80 transition-all duration-200"
        >
          Request Custom Quote
        </Link>
      </div>
    </div>
  );
}

// ─── Mobile Summary Drawer ─────────────────────────────────────────────────────

function MobileSummaryBar({
  total,
  packageName,
  onClick,
}: {
  total: number;
  packageName: string | null;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-white/8 bg-black/80 backdrop-blur-xl px-4 py-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/35">
            {packageName ? packageName : "No package selected"}
          </p>
          <p className="text-xl font-light text-white">{fmt(total)}</p>
        </div>
        <button
          onClick={onClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          Summary
          <ChevronUp size={14} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Mobile Summary Modal ──────────────────────────────────────────────────────

function MobileSummaryModal({
  serviceType,
  selectedPackage,
  addOns,
  onClose,
  onBook,
}: {
  serviceType: ServiceType | null;
  selectedPackage: Package | null;
  addOns: string[];
  onClose: () => void;
  onBook: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col justify-end"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative bg-[#0e0e0e] border-t border-white/10 rounded-t-3xl max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3 sticky top-0 bg-[#0e0e0e]">
          <p className="text-sm font-medium text-white">Package Summary</p>
          <button onClick={onClose} className="p-1 text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-6">
          <SummaryCard
            serviceType={serviceType}
            selectedPackage={selectedPackage}
            addOns={addOns}
            onBook={onBook}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function WeddingPackageBuilder() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const serviceType = SERVICE_TYPES.find((s) => s.id === selectedServiceId) ?? null;
  const selectedPackage =
    serviceType?.packages.find((p) => p.id === selectedPackageId) ?? null;

  const total =
    (selectedPackage?.price ?? 0) +
    selectedAddOns.reduce((sum, id) => sum + (ADD_ONS.find((a) => a.id === id)?.price ?? 0), 0);

  function selectService(id: string) {
    if (id !== selectedServiceId) {
      setSelectedServiceId(id);
      setSelectedPackageId(null);
    }
  }

  function toggleAddOn(id: string) {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleBook() {
    window.location.href = "/booking";
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-100px] left-1/4 w-[700px] h-[700px] bg-accent/4 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-[80px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-5 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <Link to="/" className="text-xl tracking-tight text-white/90 hover:text-white transition-colors">
          Midori Media
        </Link>
        <Link to="/" className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <X size={18} />
        </Link>
      </nav>

      {/* Page header */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 pt-14 pb-10 text-center max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase text-accent mb-4"
        >
          Build Your Perfect Package
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-light text-white leading-tight mb-4"
        >
          Build Your<br />
          <span className="text-white/35">Perfect Package</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-white/40 max-w-xl mx-auto"
        >
          Professional photography and videography packages tailored to your vision.
        </motion.p>
      </div>

      {/* Main layout */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 pb-36 lg:pb-16">
        <div className="lg:grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Left: Steps */}
          <div className="space-y-14">
            {/* ── Step 1 ── */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-accent">1</span>
                </div>
                <div>
                  <h2 className="text-white font-medium">Choose Service Type</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_TYPES.map((s) => (
                  <ServiceTypeCard
                    key={s.id}
                    service={s}
                    active={selectedServiceId === s.id}
                    onClick={() => selectService(s.id)}
                  />
                ))}
              </div>

              {/* Package cards */}
              <AnimatePresence mode="wait">
                {serviceType && (
                  <motion.div
                    key={serviceType.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6"
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <div className="h-px flex-1 bg-white/8" />
                      <p className="text-xs tracking-[0.2em] uppercase text-white/30 px-3">
                        {serviceType.label} Packages
                      </p>
                      <div className="h-px flex-1 bg-white/8" />
                    </div>
                    <div className={`grid gap-4 ${serviceType.packages.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                      {serviceType.packages.map((pkg) => (
                        <PackageCard
                          key={pkg.id}
                          pkg={pkg}
                          active={selectedPackageId === pkg.id}
                          onClick={() => setSelectedPackageId(pkg.id === selectedPackageId ? null : pkg.id)}
                        />
                      ))}
                    </div>
                    {serviceType.videoAddonNote && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/8"
                      >
                        <Video size={14} className="text-accent flex-shrink-0" />
                        <p className="text-sm text-white/40">
                          Video Add-On Available · <span className="text-accent">{serviceType.videoAddonNote}</span>
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* ── Step 2 ── */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors duration-300 ${selectedPackage ? "bg-accent/20 border-accent/40" : "bg-white/5 border-white/15"}`}>
                  <span className={`text-xs font-medium transition-colors duration-300 ${selectedPackage ? "text-accent" : "text-white/30"}`}>2</span>
                </div>
                <div>
                  <h2 className={`font-medium transition-colors duration-300 ${selectedPackage ? "text-white" : "text-white/30"}`}>
                    Add Optional Services
                  </h2>
                  <p className="text-xs text-white/25 mt-0.5">Select all that apply — prices update live</p>
                </div>
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 transition-opacity duration-300 ${selectedPackage ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                {ADD_ONS.map((addon) => (
                  <AddOnChip
                    key={addon.id}
                    addon={addon}
                    active={selectedAddOns.includes(addon.id)}
                    onClick={() => toggleAddOn(addon.id)}
                  />
                ))}
              </div>
            </section>

            {/* ── Step 3 (mobile only label) ── */}
            <section className="lg:hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors duration-300 ${selectedPackage ? "bg-accent/20 border-accent/40" : "bg-white/5 border-white/15"}`}>
                  <span className={`text-xs font-medium transition-colors duration-300 ${selectedPackage ? "text-accent" : "text-white/30"}`}>3</span>
                </div>
                <h2 className={`font-medium transition-colors duration-300 ${selectedPackage ? "text-white" : "text-white/30"}`}>
                  Package Summary
                </h2>
              </div>
              <div className={`transition-opacity duration-300 ${selectedPackage ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                <SummaryCard
                  serviceType={serviceType}
                  selectedPackage={selectedPackage}
                  addOns={selectedAddOns}
                  onBook={handleBook}
                />
              </div>
            </section>
          </div>

          {/* Right: Sticky Summary (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors duration-300 ${selectedPackage ? "bg-accent/20 border-accent/40" : "bg-white/5 border-white/15"}`}>
                  <span className={`text-xs font-medium transition-colors duration-300 ${selectedPackage ? "text-accent" : "text-white/30"}`}>3</span>
                </div>
                <h2 className={`font-medium transition-colors duration-300 ${selectedPackage ? "text-white" : "text-white/30"}`}>
                  Package Summary
                </h2>
              </div>
              <div className={`transition-opacity duration-400 ${selectedPackage ? "opacity-100" : "opacity-40"}`}>
                <SummaryCard
                  serviceType={serviceType}
                  selectedPackage={selectedPackage}
                  addOns={selectedAddOns}
                  onBook={handleBook}
                />
              </div>

              {/* Contact nudge */}
              <div className="mt-4 rounded-xl border border-white/8 p-4 flex items-center gap-3">
                <Phone size={14} className="text-white/30 flex-shrink-0" />
                <p className="text-xs text-white/30">
                  Need something custom?{" "}
                  <Link to="/booking" className="text-accent hover:underline">
                    Let's talk
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <MobileSummaryBar
        total={total}
        packageName={
          selectedPackage
            ? `${serviceType?.label} · ${selectedPackage.name}`
            : null
        }
        onClick={() => setMobileSummaryOpen(true)}
      />

      {/* Mobile summary modal */}
      <AnimatePresence>
        {mobileSummaryOpen && (
          <MobileSummaryModal
            serviceType={serviceType}
            selectedPackage={selectedPackage}
            addOns={selectedAddOns}
            onClose={() => setMobileSummaryOpen(false)}
            onBook={handleBook}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
