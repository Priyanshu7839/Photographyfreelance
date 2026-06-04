import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Video,
  Plane,
  BookOpen,
  Cloud,
  Film,
  Wifi,
  Sun,
  Music,
  Flower,
  Star,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Check,
  Download,
  Phone,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

// ─── Pricing Data ─────────────────────────────────────────────────────────────

const STYLES = [
  {
    id: "candid",
    label: "Candid Photography",
    description: "Unscripted, authentic moments captured as they unfold—raw emotion preserved forever.",
    price: 40000,
    icon: Camera,
  },
  {
    id: "traditional",
    label: "Traditional Photography",
    description: "Timeless, posed compositions that honour cultural heritage and family legacy.",
    price: 35000,
    icon: Star,
  },
  {
    id: "cinematic",
    label: "Cinematic Wedding Coverage",
    description: "Hollywood-grade visual storytelling with dramatic lighting and film-grade colour science.",
    price: 75000,
    icon: Film,
  },
  {
    id: "documentary",
    label: "Documentary Style",
    description: "Immersive journalistic coverage that tells your wedding day as it truly was.",
    price: 60000,
    icon: Video,
  },
];

const SERVICES = [
  { id: "photos", label: "Traditional Photos", price: 15000, icon: Camera },
  { id: "film", label: "Wedding Film", price: 25000, icon: Film },
  { id: "teaser", label: "Cinematic Teaser", price: 12000, icon: Sparkles },
  { id: "drone", label: "Drone Coverage", price: 18000, icon: Plane },
  { id: "streaming", label: "Live Streaming", price: 20000, icon: Wifi },
  { id: "prewedding", label: "Pre-Wedding Shoot", price: 22000, icon: Sun },
  { id: "reels", label: "Reel Creation", price: 10000, icon: Video },
];

const EVENTS = [
  { id: "haldi", label: "Haldi", price: 8000, icon: Sun },
  { id: "mehendi", label: "Mehendi", price: 8000, icon: Flower },
  { id: "sangeet", label: "Sangeet", price: 12000, icon: Music },
  { id: "wedding", label: "Wedding Ceremony", price: 0, icon: Star },
  { id: "reception", label: "Reception", price: 10000, icon: Sparkles },
];

const DELIVERABLES = [
  { id: "album", label: "Premium Album", price: 15000, icon: BookOpen },
  { id: "raw", label: "Raw Footage", price: 8000, icon: Film },
  { id: "reels", label: "Instagram Reels", price: 10000, icon: Video },
  { id: "highlight", label: "Highlight Film", price: 12000, icon: Sparkles },
  { id: "cloud", label: "Cloud Gallery Access", price: 5000, icon: Cloud },
];

const TRAVEL_TIERS = [
  { label: "Within city (< 50 km)", max: 50, fee: 0 },
  { label: "Short distance (51–100 km)", max: 100, fee: 5000 },
  { label: "Medium distance (101–200 km)", max: 200, fee: 12000 },
  { label: "Long distance (> 200 km)", max: Infinity, fee: 25000 },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const start = prev.current;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prev.current = end;
    }

    requestAnimationFrame(tick);
  }, [value]);

  return <>{fmt(displayed)}</>;
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────

const STEP_LABELS = ["Style", "Services", "Events", "Deliverables", "Location", "Summary"];

function StepProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEP_LABELS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-500 ${
                  done
                    ? "bg-accent text-white"
                    : active
                    ? "border border-accent text-accent"
                    : "border border-white/20 text-white/30"
                }`}
              >
                {done ? <Check size={12} /> : i + 1}
              </div>
              <span
                className={`text-[10px] tracking-wide hidden md:block transition-all duration-300 ${
                  active ? "text-accent" : done ? "text-white/60" : "text-white/20"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`h-px w-8 md:w-12 mx-1 transition-all duration-500 ${
                  done ? "bg-accent" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Floating Price Summary ───────────────────────────────────────────────────

interface SummaryData {
  style: (typeof STYLES)[0] | null;
  services: string[];
  events: string[];
  deliverables: string[];
  travelFee: number;
  location: string;
}

function totalFrom(data: SummaryData) {
  const styleBase = data.style?.price ?? 0;
  const servicesTotal = data.services.reduce(
    (sum, id) => sum + (SERVICES.find((s) => s.id === id)?.price ?? 0),
    0
  );
  const eventsTotal = data.events.reduce(
    (sum, id) => sum + (EVENTS.find((e) => e.id === id)?.price ?? 0),
    0
  );
  const deliverablesTotal = data.deliverables.reduce(
    (sum, id) => sum + (DELIVERABLES.find((d) => d.id === id)?.price ?? 0),
    0
  );
  const subtotal = styleBase + servicesTotal + eventsTotal + deliverablesTotal + data.travelFee;
  const tax = Math.round(subtotal * 0.18);
  return { styleBase, servicesTotal, eventsTotal, deliverablesTotal, subtotal, tax, total: subtotal + tax };
}

function FloatingQuote({ data, step }: { data: SummaryData; step: number }) {
  const [expanded, setExpanded] = useState(false);
  const { subtotal, tax, total } = totalFrom(data);

  if (step === 5) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      className="fixed right-4 md:right-6 bottom-6 z-40 w-72 md:w-80"
    >
      <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-4 flex items-center justify-between text-left"
        >
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-0.5">Live Estimate</p>
            <p className="text-2xl font-light text-white tracking-tight">
              <AnimatedNumber value={total} />
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/30">incl. GST</span>
            {expanded ? (
              <ChevronDown size={16} className="text-accent" />
            ) : (
              <ChevronUp size={16} className="text-accent" />
            )}
          </div>
        </button>

        {/* Progress bar */}
        <div className="px-5 pb-3">
          <div className="w-full h-px bg-white/5 relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-accent"
              animate={{ width: `${((step) / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-2 border-t border-white/5 pt-4">
                {data.style && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">{data.style.label}</span>
                    <span className="text-white">{fmt(data.style.price)}</span>
                  </div>
                )}
                {data.services.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Services ({data.services.length})</span>
                    <span className="text-white">
                      {fmt(data.services.reduce((s, id) => s + (SERVICES.find((x) => x.id === id)?.price ?? 0), 0))}
                    </span>
                  </div>
                )}
                {data.events.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Events ({data.events.length})</span>
                    <span className="text-white">
                      {fmt(data.events.reduce((s, id) => s + (EVENTS.find((x) => x.id === id)?.price ?? 0), 0))}
                    </span>
                  </div>
                )}
                {data.deliverables.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Deliverables ({data.deliverables.length})</span>
                    <span className="text-white">
                      {fmt(data.deliverables.reduce((s, id) => s + (DELIVERABLES.find((x) => x.id === id)?.price ?? 0), 0))}
                    </span>
                  </div>
                )}
                {data.travelFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Travel</span>
                    <span className="text-white">{fmt(data.travelFee)}</span>
                  </div>
                )}
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">GST 18%</span>
                  <span className="text-white">{fmt(tax)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-white">Total</span>
                  <span className="text-accent">{fmt(total)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Step Wrappers ────────────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    filter: "blur(8px)",
  }),
};

// ─── Step 1 — Photography Style ───────────────────────────────────────────────

function Step1({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-10 md:mb-14">
        <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Step 1 of 5</p>
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          What type of photography<br />
          <em className="not-italic text-white/40">experience are you looking for?</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STYLES.map((style) => {
          const Icon = style.icon;
          const active = selected === style.id;
          return (
            <motion.button
              key={style.id}
              onClick={() => onSelect(style.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative text-left p-6 md:p-8 rounded-2xl border transition-all duration-300 overflow-hidden group ${
                active
                  ? "border-accent bg-accent/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="styleActive"
                  className="absolute inset-0 rounded-2xl ring-1 ring-accent/40"
                  style={{ boxShadow: "0 0 40px rgba(45,95,79,0.3) inset" }}
                />
              )}
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${active ? "bg-accent/20" : "bg-white/5"}`}>
                  <Icon size={20} className={active ? "text-accent" : "text-white/50"} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{style.label}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-5">{style.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30 tracking-wide">Starting from</span>
                  <span className={`text-base font-medium transition-colors duration-300 ${active ? "text-accent" : "text-white"}`}>
                    {fmt(style.price)}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2 — Services ────────────────────────────────────────────────────────

function Step2({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-10 md:mb-14">
        <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Step 2 of 5</p>
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          What services would you<br />
          <em className="not-italic text-white/40">like to include?</em>
        </h2>
        <p className="text-sm text-white/30 mt-3">Select all that apply — each updates your live estimate.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          const active = selected.includes(service.id);
          return (
            <motion.button
              key={service.id}
              onClick={() => onToggle(service.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative text-left p-5 rounded-2xl border transition-all duration-300 overflow-hidden ${
                active
                  ? "border-accent bg-accent/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${active ? "bg-accent/20" : "bg-white/5"}`}>
                  <Icon size={16} className={active ? "text-accent" : "text-white/50"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white mb-1">{service.label}</p>
                  <p className={`text-sm transition-colors duration-300 ${active ? "text-accent" : "text-white/40"}`}>
                    +{fmt(service.price)}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${active ? "border-accent bg-accent" : "border-white/20"}`}>
                  {active && <Check size={10} className="text-white" />}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 3 — Events ──────────────────────────────────────────────────────────

function Step3({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-10 md:mb-14">
        <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Step 3 of 5</p>
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          Which events should<br />
          <em className="not-italic text-white/40">we cover?</em>
        </h2>
        <p className="text-sm text-white/30 mt-3">Wedding ceremony coverage is always included.</p>
      </div>
      <div className="space-y-3">
        {EVENTS.map((event) => {
          const Icon = event.icon;
          const active = selected.includes(event.id);
          const isWedding = event.id === "wedding";
          return (
            <motion.button
              key={event.id}
              onClick={() => !isWedding && onToggle(event.id)}
              whileHover={!isWedding ? { x: 4 } : {}}
              className={`w-full text-left px-6 py-5 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
                active
                  ? "border-accent bg-accent/10"
                  : isWedding
                  ? "border-white/20 bg-white/5 cursor-default opacity-70"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${active ? "bg-accent/20" : "bg-white/5"}`}>
                  <Icon size={16} className={active ? "text-accent" : "text-white/40"} />
                </div>
                <div>
                  <p className="text-base font-medium text-white">{event.label}</p>
                  {isWedding && <p className="text-xs text-white/30 mt-0.5">Always included</p>}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm transition-colors duration-300 ${active ? "text-accent" : "text-white/30"}`}>
                  {event.price === 0 ? "Included" : `+${fmt(event.price)}`}
                </span>
                {!isWedding && (
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${active ? "border-accent bg-accent" : "border-white/20"}`}>
                    {active && <Check size={10} className="text-white" />}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 4 — Deliverables ────────────────────────────────────────────────────

function Step4({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-10 md:mb-14">
        <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Step 4 of 5</p>
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          What final deliverables<br />
          <em className="not-italic text-white/40">would you like?</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DELIVERABLES.map((del) => {
          const Icon = del.icon;
          const active = selected.includes(del.id);
          return (
            <motion.button
              key={del.id}
              onClick={() => onToggle(del.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative text-left p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${
                active
                  ? "border-accent bg-accent/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${active ? "bg-accent/20" : "bg-white/5"}`}>
                  <Icon size={18} className={active ? "text-accent" : "text-white/40"} />
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${active ? "border-accent bg-accent" : "border-white/20"}`}>
                  {active && <Check size={10} className="text-white" />}
                </div>
              </div>
              <p className="text-base font-medium text-white mb-1">{del.label}</p>
              <p className={`text-sm transition-colors duration-300 ${active ? "text-accent" : "text-white/40"}`}>
                +{fmt(del.price)}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 5 — Travel & Location ───────────────────────────────────────────────

function Step5({
  location,
  travelFee,
  onLocationChange,
  onTierSelect,
}: {
  location: string;
  travelFee: number;
  onLocationChange: (v: string) => void;
  onTierSelect: (fee: number) => void;
}) {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  function handleTier(tier: (typeof TRAVEL_TIERS)[0], i: number) {
    setSelectedTier(i);
    onTierSelect(tier.fee);
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-10 md:mb-14">
        <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Step 5 of 5</p>
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          Where is your<br />
          <em className="not-italic text-white/40">event located?</em>
        </h2>
      </div>

      <div className="space-y-6">
        {/* Location Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Enter city or venue name..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-white/25 focus:outline-none focus:border-accent/50 transition-colors text-base"
          />
        </div>

        {/* Distance Tier Selection */}
        <div>
          <p className="text-sm text-white/40 mb-3 tracking-wide">Select approximate travel distance:</p>
          <div className="space-y-3">
            {TRAVEL_TIERS.map((tier, i) => {
              const active = selectedTier === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => handleTier(tier, i)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left px-6 py-4 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
                    active
                      ? "border-accent bg-accent/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <span className="text-sm text-white/80">{tier.label}</span>
                  <span className={`text-sm font-medium transition-colors duration-300 ${active ? "text-accent" : "text-white/40"}`}>
                    {tier.fee === 0 ? "No charge" : `+${fmt(tier.fee)}`}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {travelFee > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-accent/5 border border-accent/20"
          >
            <MapPin size={16} className="text-accent flex-shrink-0" />
            <p className="text-sm text-white/60">
              Estimated travel charge: <span className="text-accent font-medium">{fmt(travelFee)}</span>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Step 6 — Final Summary ───────────────────────────────────────────────────

function FinalSummary({ data }: { data: SummaryData }) {
  const { styleBase, servicesTotal, eventsTotal, deliverablesTotal, subtotal, tax, total } = totalFrom(data);

  const selectedServices = data.services.map((id) => SERVICES.find((s) => s.id === id)!).filter(Boolean);
  const selectedEvents = data.events.map((id) => EVENTS.find((e) => e.id === id)!).filter(Boolean);
  const selectedDeliverables = data.deliverables.map((id) => DELIVERABLES.find((d) => d.id === id)!).filter(Boolean);

  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const quoteId = `MM-${Date.now().toString().slice(-6)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-accent mb-2">Quote Generated</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">Your Package Summary</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/30 mb-1">Quote #{quoteId}</p>
            <p className="text-xs text-white/30">{today}</p>
          </div>
        </div>
        <div className="h-px bg-white/10" />
      </div>

      {/* Line Items */}
      <div className="space-y-6">
        {/* Style */}
        {data.style && (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/30 mb-3">Photography Style</p>
            <div className="flex items-center justify-between">
              <span className="text-white">{data.style.label}</span>
              <span className="text-white">{fmt(styleBase)}</span>
            </div>
          </div>
        )}

        <div className="h-px bg-white/5" />

        {/* Services */}
        {selectedServices.length > 0 && (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/30 mb-3">Services</p>
            <div className="space-y-2">
              {selectedServices.map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent/60" />
                    <span className="text-white/70 text-sm">{s.label}</span>
                  </div>
                  <span className="text-white/70 text-sm">{fmt(s.price)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1">
                <span className="text-white/40 text-sm">Services subtotal</span>
                <span className="text-white text-sm">{fmt(servicesTotal)}</span>
              </div>
            </div>
          </div>
        )}

        {selectedEvents.length > 0 && <div className="h-px bg-white/5" />}

        {/* Events */}
        {selectedEvents.length > 0 && (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/30 mb-3">Event Coverage</p>
            <div className="space-y-2">
              {selectedEvents.map((e) => (
                <div key={e.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent/60" />
                    <span className="text-white/70 text-sm">{e.label}</span>
                  </div>
                  <span className="text-white/70 text-sm">{e.price === 0 ? "Included" : fmt(e.price)}</span>
                </div>
              ))}
              {eventsTotal > 0 && (
                <div className="flex justify-between pt-1">
                  <span className="text-white/40 text-sm">Events subtotal</span>
                  <span className="text-white text-sm">{fmt(eventsTotal)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedDeliverables.length > 0 && <div className="h-px bg-white/5" />}

        {/* Deliverables */}
        {selectedDeliverables.length > 0 && (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/30 mb-3">Deliverables</p>
            <div className="space-y-2">
              {selectedDeliverables.map((d) => (
                <div key={d.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent/60" />
                    <span className="text-white/70 text-sm">{d.label}</span>
                  </div>
                  <span className="text-white/70 text-sm">{fmt(d.price)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1">
                <span className="text-white/40 text-sm">Deliverables subtotal</span>
                <span className="text-white text-sm">{fmt(deliverablesTotal)}</span>
              </div>
            </div>
          </div>
        )}

        {data.travelFee > 0 && <div className="h-px bg-white/5" />}

        {/* Travel */}
        {data.travelFee > 0 && (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-white/30 mb-3">Travel & Location</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-white/40" />
                <span className="text-white/70 text-sm">{data.location || "Location charges"}</span>
              </div>
              <span className="text-white/70 text-sm">{fmt(data.travelFee)}</span>
            </div>
          </div>
        )}

        {/* Totals */}
        <div className="h-px bg-white/10" />

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-white/50">Subtotal</span>
            <span className="text-white">{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">GST (18%)</span>
            <span className="text-white">{fmt(tax)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-white/10">
            <span className="text-lg font-medium text-white">Total Estimate</span>
            <span className="text-2xl font-light text-accent">{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-white/25 mt-6 leading-relaxed">
        This is an indicative estimate. Final pricing may vary based on event duration, specific requirements, and logistics. Contact us to finalise your package.
      </p>

      {/* Actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-all duration-200"
        >
          <Download size={15} />
          Download Quote
        </button>
        <Link
          to="/booking"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-accent/40 text-accent text-sm hover:bg-accent/10 transition-all duration-200"
        >
          <CalendarDays size={15} />
          Schedule Call
        </Link>
        <a
          href="tel:+919999999999"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-white text-sm hover:bg-accent/90 transition-all duration-200"
        >
          <Phone size={15} />
          Send Inquiry
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main Builder ─────────────────────────────────────────────────────────────

export default function WeddingPackageBuilder() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const [style, setStyle] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>(["wedding"]);
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [travelFee, setTravelFee] = useState(0);

  const summaryData: SummaryData = {
    style: STYLES.find((s) => s.id === style) ?? null,
    services,
    events,
    deliverables,
    travelFee,
    location,
  };

  function toggleArr(arr: string[], id: string, set: (v: string[]) => void) {
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  }

  function canAdvance() {
    if (step === 0) return !!style;
    if (step === 1) return services.length > 0;
    if (step === 2) return events.length > 0;
    if (step === 3) return deliverables.length > 0;
    if (step === 4) return true;
    return true;
  }

  function advance() {
    if (!canAdvance()) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, 5));
  }

  function back() {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  const isFinal = step === 5;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-5 border-b border-white/5 relative z-30">
        <Link to="/" className="text-xl tracking-tight text-white/90 hover:text-white transition-colors">
          Midori Media
        </Link>
        <div className="flex items-center gap-4">
          {!isFinal && (
            <StepProgress current={step} />
          )}
          <Link to="/" className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <X size={18} />
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col relative z-10">
        <div className="flex-1 px-4 md:px-8 py-10 md:py-16 pb-32 overflow-y-auto">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto"
            >
              {step === 0 && (
                <Step1 selected={style} onSelect={(id) => { setStyle(id); }} />
              )}
              {step === 1 && (
                <Step2 selected={services} onToggle={(id) => toggleArr(services, id, setServices)} />
              )}
              {step === 2 && (
                <Step3 selected={events} onToggle={(id) => {
                  if (id === "wedding") return;
                  toggleArr(events, id, setEvents);
                }} />
              )}
              {step === 3 && (
                <Step4 selected={deliverables} onToggle={(id) => toggleArr(deliverables, id, setDeliverables)} />
              )}
              {step === 4 && (
                <Step5
                  location={location}
                  travelFee={travelFee}
                  onLocationChange={setLocation}
                  onTierSelect={setTravelFee}
                />
              )}
              {step === 5 && (
                <FinalSummary data={summaryData} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        {!isFinal && (
          <div className="fixed bottom-0 left-0 right-0 z-30 px-4 md:px-8 py-5 border-t border-white/5 bg-background/90 backdrop-blur-lg flex items-center justify-between">
            <button
              onClick={back}
              disabled={step === 0}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm transition-all duration-200 ${
                step === 0
                  ? "text-white/20 cursor-not-allowed"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="flex items-center gap-3">
              {step < 4 && (
                <button
                  onClick={advance}
                  disabled={!canAdvance()}
                  className="text-xs text-white/30 hover:text-white/50 transition-colors px-3 py-2"
                >
                  Skip
                </button>
              )}
              <motion.button
                onClick={advance}
                disabled={step === 0 && !style}
                whileHover={canAdvance() ? { scale: 1.03 } : {}}
                whileTap={canAdvance() ? { scale: 0.97 } : {}}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  canAdvance()
                    ? "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20"
                    : "bg-white/5 text-white/25 cursor-not-allowed"
                }`}
              >
                {step === 4 ? "View Summary" : "Continue"}
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        )}

        {/* Edit selections on final */}
        {isFinal && (
          <div className="fixed bottom-0 left-0 right-0 z-30 px-4 md:px-8 py-5 border-t border-white/5 bg-background/90 backdrop-blur-lg flex items-center justify-between">
            <button
              onClick={() => { setDir(-1); setStep(0); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <ArrowLeft size={16} />
              Edit Selections
            </button>
            <p className="text-xs text-white/20 hidden md:block">Quote valid for 30 days · Midori Media</p>
          </div>
        )}
      </div>

      {/* Floating quote panel */}
      <FloatingQuote data={summaryData} step={step} />
    </div>
  );
}
