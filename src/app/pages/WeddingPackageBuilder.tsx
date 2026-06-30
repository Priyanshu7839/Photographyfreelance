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
  ArrowLeft,
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
  MapPin,
  Mail,
  User,
  CheckCircle2,
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
          "1 Photographer",
          "400+ Edited Photos",
          "1 Week Turnaround",
        ],
      },
      {
        id: "wedding-tier2",
        name: "Tier 2",
        price: 1200,
        features: [
          "8 Hours Coverage",
          "1 Photographer",
          "400+ Edited Photos",
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
          "1 Week Turnaround",
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
        <motion.button
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
          {selectedPackage ? "Book This Package" : "Select a Package to Continue"}
          {selectedPackage && <ArrowRight size={16} />}
        </motion.button>
      </div>
    </div>
  );
}

// ─── Booking Modal ─────────────────────────────────────────────────────────────

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  date: string;
  notes: string;
}

function BookingModal({
  serviceType,
  selectedPackage,
  addOns,
  total,
  onClose,
}: {
  serviceType: ServiceType | null;
  selectedPackage: Package | null;
  addOns: string[];
  total: number;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    date: "",
    notes: "",
  });

  const selectedAddOns = addOns.map((id) => ADD_ONS.find((a) => a.id === id)!).filter(Boolean);

  function update(field: keyof BookingFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function canProceed() {
    if (step === 1) return form.name.trim() && form.email.trim();
    if (step === 2) return form.phone.trim() && form.location.trim();
    return true;
  }

  const inputCls =
    "w-full bg-white/[0.04] border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-200";

  const labelCls = "block text-xs tracking-[0.15em] uppercase text-white/35 mb-2";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280, delay: 0.05 }}
          className="relative w-full max-w-md bg-[#0c0f0d] border border-white/10 rounded-3xl overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative px-8 py-12 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 20 }}
              className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 size={28} className="text-accent" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-light text-white mb-3"
            >
              Request Received
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-white/45 leading-relaxed mb-8"
            >
              Thank you, {form.name.split(" ")[0]}. Your inquiry for the{" "}
              <span className="text-white/70">{selectedPackage?.name}</span> package has been
              received. Our team will review your details and reach out within 24 hours to
              confirm availability and walk you through next steps.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/8 mb-8"
            >
              <span className="text-xs text-white/40">{serviceType?.label}</span>
              <span className="w-px h-3 bg-white/15" />
              <span className="text-xs text-accent">{selectedPackage?.name}</span>
              <span className="w-px h-3 bg-white/15" />
              <span className="text-xs text-white/40">{fmt(total)}</span>
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-accent/15 border border-accent/25 text-accent text-sm hover:bg-accent/20 transition-all duration-200"
            >
              Back to Package Builder
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full max-w-lg bg-[#0c0f0d] border border-white/10 rounded-3xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-56 h-56 bg-accent/8 rounded-full blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-start justify-between px-7 pt-7 pb-5 border-b border-white/6">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-1">
              {step === 1
                ? "Step 1 of 3 · Your Info"
                : step === 2
                ? "Step 2 of 3 · Event Details"
                : "Step 3 of 3 · Review & Confirm"}
            </p>
            <h2 className="text-xl font-light text-white">
              {step === 1
                ? "Tell us about yourself"
                : step === 2
                ? "Where and when?"
                : "Almost there"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all mt-0.5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-white/5">
          <motion.div
            className="h-full bg-accent/60"
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Package summary strip */}
        <div className="flex items-center gap-3 px-7 py-3 bg-white/[0.02] border-b border-white/6">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <p className="text-xs text-white/40 flex-1">
            {serviceType?.label} ·{" "}
            <span className="text-white/60">{selectedPackage?.name}</span>
            {selectedAddOns.length > 0 && (
              <span className="text-white/30">
                {" "}+ {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? "s" : ""}
              </span>
            )}
          </p>
          <span className="text-sm font-light text-accent">{fmt(total)}</span>
        </div>

        {/* Form body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="px-7 py-6 space-y-5"
          >
            {step === 1 && (
              <>
                <div>
                  <label className={labelCls}>Full Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={inputCls + " pl-9"}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputCls + " pl-9"}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputCls + " pl-9"}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Location / City</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="New York, NY or venue name"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      className={inputCls + " pl-9"}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>
                    Preferred Date{" "}
                    <span className="text-white/20 normal-case tracking-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <CalendarDays size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      className={inputCls + " pl-9 [color-scheme:dark]"}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-white/25 mb-3">Your Request Summary</p>
                  {[
                    { icon: User, label: "Name", value: form.name },
                    { icon: Mail, label: "Email", value: form.email },
                    { icon: Phone, label: "Phone", value: form.phone },
                    { icon: MapPin, label: "Location", value: form.location },
                    ...(form.date ? [{ icon: CalendarDays, label: "Date", value: form.date }] : []),
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon size={13} className="text-white/25 flex-shrink-0" />
                      <span className="text-xs text-white/30 w-14 flex-shrink-0">{label}</span>
                      <span className="text-sm text-white/70 truncate">{value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <label className={labelCls}>
                    Anything else we should know?{" "}
                    <span className="text-white/20 normal-case tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Special requirements, venue details, creative vision..."
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    className={inputCls + " resize-none"}
                  />
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="px-7 pb-7 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-white/10 text-white/40 text-sm hover:text-white/70 hover:border-white/20 transition-all"
            >
              <ArrowLeft size={14} />
              Back
            </button>
          )}
          {step < 3 ? (
            <motion.button
              whileHover={canProceed() ? { scale: 1.02 } : {}}
              whileTap={canProceed() ? { scale: 0.98 } : {}}
              onClick={() => canProceed() && setStep((s) => s + 1)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                canProceed()
                  ? "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              Continue
              <ArrowRight size={15} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSubmitted(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all duration-200"
            >
              Submit Request
              <CheckCircle2 size={15} />
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
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
  const [bookingOpen, setBookingOpen] = useState(false);

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
    if (selectedPackage) setBookingOpen(true);
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

              {/* Response time nudge */}
              <div className="mt-4 rounded-xl border border-white/8 p-4 flex items-center gap-3">
                <Clock size={14} className="text-white/30 flex-shrink-0" />
                <p className="text-xs text-white/30">
                  We typically respond within{" "}
                  <span className="text-white/50">24 hours</span> of receiving your request.
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

      {/* Booking flow modal */}
      <AnimatePresence>
        {bookingOpen && (
          <BookingModal
            serviceType={serviceType}
            selectedPackage={selectedPackage}
            addOns={selectedAddOns}
            total={total}
            onClose={() => setBookingOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
