import { ElementType, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  Camera,
  Palette,
  Music,
  Play,
  FileCheck,
  Sparkles,
  ChevronDown,
  GripVertical,
  Plus,
  X,
  User,
  UserPlus,
  Mail,
  Phone,
  Search,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { adressautocomplete, createClient, createMember, getTeamMembers, getWorkflowSteps, getWorkflowTemplates } from "../../Utils/Apicalls";
import { toast } from "sonner";

// Mock team members data
const teamMembers = [
  { id: 1, name: "Sarah Chen", role: "Lead Photographer", avatar: "SC", color: "accent" },
  { id: 2, name: "Mike Rodriguez", role: "Videographer", avatar: "MR", color: "blue" },
  { id: 3, name: "Emily Lee", role: "Second Shooter", avatar: "EL", color: "purple" },
  { id: 4, name: "Aman Sharma", role: "Editor", avatar: "AS", color: "orange" },
  { id: 5, name: "Rahul Kumar", role: "Color Grading", avatar: "RK", color: "pink" },
  { id: 6, name: "Aryan Patel", role: "Sound Designer", avatar: "AP", color: "green" },
];


const eventTypes = [
  { value: "wedding", label: "Wedding", icon: Camera },
  { value: "pre-wedding", label: "Pre-Wedding", icon: Sparkles },
  { value: "reception", label: "Reception", icon: Users },
  { value: "engagement", label: "Engagement", icon: Sparkles },
  { value: "haldi", label: "Haldi", icon: Palette },
  { value: "mehendi", label: "Mehendi", icon: Palette },
  { value: "sangeet", label: "Sangeet", icon: Music },
  // { value: "custom", label: "Custom Event", icon: Briefcase },
];



// ─── Avatar helpers ────────────────────────────────────────────────────────────

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = [
  "from-accent/50 to-accent/20",
  "from-blue-500/40 to-blue-500/15",
  "from-purple-500/40 to-purple-500/15",
  "from-orange-500/40 to-orange-500/15",
  "from-pink-500/40 to-pink-500/15",
  "from-teal-500/40 to-teal-500/15",
];

function avatarColor(id: string) {
  const idx = parseInt(id, 10) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx] ?? AVATAR_COLORS[0];
}

// ─── Member Avatar Chip ────────────────────────────────────────────────────────

function MemberChip({ member, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      className="inline-flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-white/[0.06] border border-white/10"
    >
      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${avatarColor(member.member_id)} flex items-center justify-center text-[10px] font-medium flex-shrink-0`}>
        {member.avatar || initials(member.full_name)}
      </div>
      <span className="text-xs text-white/75 whitespace-nowrap">{member.full_name}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="w-4 h-4 rounded-full bg-white/10 hover:bg-red-500/40 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <X size={8} />
        </button>
      )}
    </motion.div>
  );
}



// ─── Add Member Mini-Form ──────────────────────────────────────────────────────

interface NewMemberForm { name: string; role: string; email: string; phone: string; password:string }

function AddMemberForm({
  onAdd,
  onCancel,
  fetchTeam
}) {
  const [form, setForm] = useState<NewMemberForm>({ name: "", role: "", email: "", phone: "",password:"" });
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => { nameRef.current?.focus(); }, []);

  const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex =
  /^\+?[1-9]\d{9,14}$/;

const nameRegex =
  /^[A-Za-z\s'-]{2,50}$/;

  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const isValid = form.name.trim() && form.role.trim() &&form.email.trim() && form.phone.trim() && form.password.trim();;
  const [adding,setAdding] = useState(false)
 async function submit() {
  const name = form.name.trim();
  const role = form.role.trim();
  const email = form.email.trim();  
  const phone = form.phone.trim();
  const password = form.password.trim()
  

  if (!name) {
    toast("Name is required");
    return;
  }

  if (!nameRegex.test(name)) {
    toast("Enter a valid name");
    return;
  }

  if (!role) {
    toast("Role is required");
    return;
  }

  if (!email) {
    toast("Email is required");
    return;
  }

  if (!emailRegex.test(email)) {
    toast("Enter a valid email");
    return;
  }

  if (!phone) {
    toast("Phone number is required");
    return;
  }

  if (!phoneRegex.test(phone)) {
    toast("Enter a valid phone number");
    return;
  }


  if (!password) {
  toast("Password is required");
  return;
}

if (!passwordRegex.test(password)) {
  toast(
    "Password must be at least 8 characters and contain both uppercase and lowercase letters."
  );
  return;
}



 
  

  
try {
    setAdding(true);

    const res = await createMember({
      name,
      role,
      email,
      phone,
      password,
    });

    toast.success(res.message || "Member created successfully!");

    fetchTeam()


    

    setForm({
      name: "",
      role: "",
      email: "",
      phone: "",
      password: "",
    });
  } catch (err: any) {
    toast.error(
      err.response?.data?.message ||
        "Failed to create member."
    );
  } finally {
    setAdding(false);
    onCancel()

    
  }
}
  const field = (
    label: string,
    key: keyof NewMemberForm,
    placeholder: string,
    Icon: ElementType,
    type = "text",
    required = false
  ) => (
    <div>
      <label className="block text-[10px] tracking-[0.15em] uppercase text-white/30 mb-1.5">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <div className="relative">
        <Icon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
        <input
          ref={key === "name" ? nameRef : undefined}
          type={type}
          value={form[key]}
          onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="w-full bg-white/[0.04] border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all"
        />
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-2 p-4 rounded-xl bg-accent/[0.04] border border-accent/15">
        <p className="text-xs tracking-[0.15em] uppercase text-accent/70 mb-3">New Team Member</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {field("Full Name", "name", "Jane Smith", User, "text", true)}
          {field("Role ", "role", "Photographer", Briefcase, "text", true)}
          {field("Email", "email", "jane@studio.com", Mail, "email")}
          {field("Phone", "phone", "+1 (555) 000-0000", Phone, "tel")}
          {field("Password", "password", "shh...", Phone, "password")}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-white/10 text-white/40 text-xs hover:text-white/60 hover:border-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!isValid}
            className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
              isValid
                ? "bg-accent text-white hover:bg-accent/90"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            <UserPlus size={12} />
          {adding?'Adding...':'Add Member'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step Assignee Picker ──────────────────────────────────────────────────────

function StepAssigneePicker({
  step,
  allMembers,
  assignedIds,
  onToggle,
  onAddMember,
  fetchTeam
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setShowAddForm(false);
        setSearch("");
      }
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const filtered = allMembers.filter(
    (m) =>
      m?.full_name?.toLowerCase()?.includes(search?.toLowerCase()) ||
      m?.role?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const assignedMembers = allMembers?.filter((m) => assignedIds?.includes(m.member_id));

  return (
    <div ref={ref} className="relative">
      {/* Assigned chips + add button */}
      <div className="flex flex-wrap gap-1.5 items-center min-h-[36px]">
        <AnimatePresence>
          {assignedMembers?.map((m) => (
            <MemberChip
              key={m.id}
              member={m}
              onRemove={() => onToggle(m.member_id)}
            />
          ))}
        </AnimatePresence>
        <button
          onClick={() => { setOpen((p) => !p); setShowAddForm(false); }}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-all duration-200 ${
            open
              ? "bg-accent/15 border-accent/40 text-accent"
              : assignedMembers?.length > 0
              ? "bg-white/[0.04] border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              : "bg-white/[0.04] border-white/10 border-dashed text-white/35 hover:border-accent/40 hover:text-white/60"
          }`}
        >
          <Plus size={11} />
          {assignedMembers?.length === 0 ? "Assign" : "Add"}
        </button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full mt-2 w-72 bg-[#101410] border border-white/10 rounded-2xl shadow-2xl z-30 overflow-hidden"
          >
            {/* Search */}
            <div className="p-3 border-b border-white/6">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search team..."
                  className="w-full bg-white/[0.04] border border-white/8 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-accent/40 transition-all"
                />
              </div>
            </div>

            {/* Member list */}
            <div className="max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-xs text-white/25 text-center py-5">No members found</p>
              ) : (
                filtered.map((member) => {
                  const isSelected = assignedIds?.includes(member.member_id);
                  return (
                    <button
                      key={member.member_id}
                      onClick={() => onToggle(member.member_id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 transition-all hover:bg-white/[0.04] ${
                        isSelected ? "bg-accent/[0.06]" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor(member.member_id)} flex items-center justify-center text-xs font-medium flex-shrink-0`}>
                        {member.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm text-white/80 truncate">{member.full_name}</p>
                        <p className="text-xs text-white/35 truncate">{member.role}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? "bg-accent border-accent"
                          : "border-white/15"
                      }`}>
                        {isSelected && <Check size={10} className="text-white" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Add new member */}
            <div className="border-t border-white/6 p-3">
              <AnimatePresence>
                {showAddForm ? (
                  <AddMemberForm
                    onAdd={(member) => {
                      onAddMember(member);
                      onToggle(member.id);
                      setShowAddForm(false);
                      
                    }}
                    onCancel={() => setShowAddForm(false)}
                    fetchTeam={()=>fetchTeam()}
                    
                  />
                ) : (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAddForm(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-white/10 text-white/35 text-xs hover:border-accent/30 hover:text-white/60 hover:bg-accent/[0.04] transition-all"
                  >
                    <UserPlus size={13} />
                    Add new team member
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function ClientOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 - Client Details
  const [clientName, setClientName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [showEventTypeDropdown, setShowEventTypeDropdown] = useState(false);

  // Step 2 - Workflow Configuration
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [workflowSteps, setWorkflowSteps] = useState<any[]>([]);
  const [newStepName, setNewStepName] = useState("");

  // Step 3 - Team Assignment
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState<number | null>(null);

  const steps = [
    { number: 1, title: "Client Details", icon: User },
    { number: 2, title: "Workflow Setup", icon: Briefcase },
    { number: 3, title: "Team Assignment", icon: Users },
    { number: 4, title: "Review", icon: FileCheck },
  ];


const [templates, setTemplates] = useState([]);
const [teamAssignments, setTeamAssignments] = useState([]);
const [teamMembers, setTeamMembers] = useState([]);



useEffect(() => {
  if (workflowSteps?.length) {
    setTeamAssignments(
      workflowSteps.map((step) => ({
        workflow_step_id:
          step.workflow_step_id,
        assigned_member_ids: [],
        date: "",
        time: "",
        venue: "",
      }))
    );
  }
}, [workflowSteps]);



const [query, setQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [selectedLocation, setSelectedLocation] = useState(null);
const [loading, setLoading] = useState(false);

const handleSearch = async (value) => {
  setQuery(value);
  setSelectedLocation(null); // user changed text, selection invalid now

  if (!value.trim()) {
    setSuggestions([]);
    return;
  }

  setLoading(true);

  try {
    const response = await adressautocomplete(value);

    setSuggestions(
      response?.data?.results?.map((item) => ({
        label: item.address_line1,
        data: item,
      })) || []
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const fetchTemplates = async () => {
    try {
      const response =
        await getWorkflowTemplates();
       

      setTemplates([
  ...response.data,
  {
    workflow_template_id: "custom",
    template_name: "Custom Workflow",
    template_description:
      "Create your own workflow"
  }
])
    } catch (error) {
      console.error(error.message);
    }
  };

  fetchTemplates();
}, []);

const fetchTeamMembers = async () => {
    try {
      const response =
        await getTeamMembers();

      setTeamMembers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

useEffect(() => {
  

  fetchTeamMembers();
}, []);

  const handleTemplateSelect = async(templateId: string) => {
      if(templateId === 'custom') setWorkflowSteps([])

    setSelectedTemplate(templateId);
     const response =
      await getWorkflowSteps(templateId);

    setWorkflowSteps(response.data);
  };

   

  const handleAddStep = () => {
    if (newStepName.trim()) {
      const newStep = {
        workflow_step_id: workflowSteps.length + 1,
        step_name: newStepName,
        assignee: null,
      };
      setWorkflowSteps([...workflowSteps, newStep]);
      setNewStepName("");
    }
  };

  const handleRemoveStep = (stepId: number) => {
    setWorkflowSteps(workflowSteps.filter((step) => step.workflow_step_id !== stepId));
  };

const handleAssignTeamMember = (
  workflow_step_id,
  assigned_member_id
) => {
  setTeamAssignments((prev) =>
    prev.map((item) =>
      item.workflow_step_id === workflow_step_id
        ? {
            ...item,
            assigned_member_ids: item.assigned_member_ids.includes(
              assigned_member_id
            )
              ? item.assigned_member_ids.filter(
                  (id) => id !== assigned_member_id
                )
              : [
                  ...item.assigned_member_ids,
                  assigned_member_id,
                ],
          }
        : item
    )
  );
};


const handleUpdateStepSchedule = (
  workflow_step_id,
  field,
  value
) => {
  setTeamAssignments((prev) =>
    prev.map((item) =>
      item.workflow_step_id ===
      workflow_step_id
        ? {
            ...item,
            [field]: value,
          }
        : item
    )
  );
};




  // Unique assigned members across all steps (for review)
const allAssignedIds = Array.from(
  new Set(
    teamAssignments.flatMap(
      (assignment) => assignment.assigned_member_ids
    )
  )
);

const allAssignedMembers = teamMembers.filter((member) =>
  allAssignedIds.includes(member.member_id)
);


  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [Launching,setLaunching] = useState(false)

  const handleCreateProject = async () => {

    setLaunching(true)
  try {
    const payload = {
    
       clientName,
      eventDate,
      eventEndDate,
      eventType,
      selectedLocation,
      workflowSteps,
      teamAssignments,
      workflow_template_id:
        selectedTemplate === "custom"
          ? null
          : selectedTemplate,
    };

    const response =
      await createClient(payload);



    toast.success(
      "Client created successfully"
    );

  } catch (error) {
    console.error(error);

    toast.error(error.message);
  }finally{
    setLaunching(false)
    navigate("/dashboard");

  }
};

  const canProceed = () => {
    if (currentStep === 1) {
      return clientName  && eventType 
    }
    if (currentStep === 2) {
      return selectedTemplate && workflowSteps.length > 0;
    }

    if(currentStep ===3 ){
      return eachoneAssigned
    }
    return true;
  };


  const today = new Date().toISOString().split("T")[0];

  


  const eachoneAssigned = workflowSteps.every((step) => {
  const assignment = teamAssignments.find(
    (a) => a.workflow_step_id === step.workflow_step_id
  );

  return assignment?.assigned_member_ids?.length > 0;
});

useEffect(()=>{
  console.log(teamAssignments)
},[teamAssignments])
  return (
    <div className="relative bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 flex items-center justify-between backdrop-blur-sm bg-background/80"
      >
        <Link to="/" className="text-xl md:text-2xl tracking-tight">
          Midori Media
        </Link>
        <Link
          to="/dashboard"
          className="text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          Cancel
        </Link>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-28 md:pt-32 px-4 md:px-6 max-w-5xl mx-auto pb-20">
        {/* Progress Stepper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10 -z-10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-accent"
              />
            </div>

            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;

              return (
                <div key={step.number} className="flex flex-col items-center relative z-10">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.9,
                      backgroundColor: isCompleted || isActive ? "rgb(45, 95, 79)" : "rgba(255, 255, 255, 0.05)",
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 border-2 transition-all ${
                      isCompleted || isActive
                        ? "border-accent shadow-lg shadow-accent/20"
                        : "border-white/10"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-background" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive ? "text-background" : "opacity-40"}`} />
                    )}
                  </motion.div>
                  <p className={`text-xs md:text-sm text-center max-w-[80px] ${isActive ? "opacity-100" : "opacity-50"}`}>
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 1 - Client Details */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                 <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Step 1 of 4</p>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight">Client Information</h2>
                <p className="text-sm text-white/40">Start with the essentials — we'll build the rest around these details.</p>
              </div>

              <div className="space-y-6">
                {/* Client Name */}
                <div>
                  <label className="block text-sm opacity-70 mb-2">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-accent/50 transition-all"
                  />
                </div>

                {/* Event Date */}
                {/* <div className="flex items-center gap-2">
                  <div className="w-full">
                  <label className="block text-sm opacity-70 mb-2">Event Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                    <input
                    min={today}
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 text-lg focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm opacity-70 mb-2">Event End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                    <input
                      type="date"
                      value={eventEndDate}
                      min={eventDate}
                      onChange={(e) => setEventEndDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 text-lg focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </div>
                </div>

                </div> */}
                {/* Event Type */}
                <div>
                  <label className="block text-sm opacity-70 mb-2">Event Type</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowEventTypeDropdown(!showEventTypeDropdown)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-lg text-left flex items-center justify-between focus:outline-none focus:border-accent/50 transition-all hover:bg-white/10"
                    >
                      <span className={eventType ? "opacity-100" : "opacity-40"}>
                        {eventType
                          ? eventTypes.find((t) => t.value === eventType)?.label
                          : "Select event type"}
                      </span>
                      <ChevronDown className={`w-5 h-5 opacity-40 transition-transform ${showEventTypeDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {showEventTypeDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full mt-2 left-0 right-0 bg-secondary border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20"
                        >
                          {eventTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <button
                                key={type.value}
                                onClick={() => {
                                  setEventType(type.value);
                                  setShowEventTypeDropdown(false);
                                }}
                                className="w-full px-6 py-3.5 text-left hover:bg-white/5 transition-all flex items-center gap-3 border-b border-white/5 last:border-0"
                              >
                                <Icon className="w-5 h-5 opacity-60" />
                                <span>{type.label}</span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Event Location */}
                {/* <div>
                  <label className="block text-sm opacity-70 mb-2">Event Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                    <input
                      type="text"
                    
                      value={query}
    onChange={(e) => handleSearch(e.target.value)}
                      
                      placeholder="Enter event location"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 text-lg focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </div>

                  {suggestions.length > 0 && (
    <div className=" top-full mt-4 bg-black border max-h-60 overflow-y-auto z-50 rounded-xl border-accent/50" >
      {suggestions.map((item, index) => (
        <div
          key={index}
          className="p-2 cursor-pointer hover:bg-white/50 text-accent px-4"
          onClick={() => {
            setQuery(item.label);
            setSelectedLocation(item.label);
            setSuggestions([]);
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )}
                </div> */}
              </div>
            </motion.div>
          )}

          {/* Step 2 - Workflow Configuration */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                   <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Step 2 of 4</p>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight">Production Workflow</h2>
                <p className="text-sm text-white/40">Pick a template or build a custom pipeline — you can edit steps below.</p>
              </div>

              {/* Template Selection */}
              <div className="grid md:grid-cols-2 gap-4">
                {templates?.map((template) => {
                  // const Icon = template.icon;
                  return (
                    <motion.button
                      key={template?.workflow_template_id}
                      onClick={() => handleTemplateSelect(template?.workflow_template_id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-2xl border-2 transition-all text-left ${
                        selectedTemplate === template?.workflow_template_id
                          ? "bg-accent/10 border-accent shadow-lg shadow-accent/20"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedTemplate === template.id ? "bg-accent/20" : "bg-white/10"
                        }`}>
                        <Icon className={`w-6 h-6 ${selectedTemplate === template.id ? "text-accent" : "opacity-60"}`} />
                        </div> */}
                        <div className="flex-1">
                          <h3 className="text-lg mb-1">{template?.template_name}</h3>
                          <p className="text-sm opacity-60">{template?.template_description}</p>
                          {/* <p className="text-xs opacity-40 mt-2">{template.steps.length} steps</p> */}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Workflow Steps */}
              {(workflowSteps.length > 0 || selectedTemplate==='custom') &&(
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl">Workflow Steps</h3>
                    <span className="text-sm opacity-60">{workflowSteps?.length} steps</span>
                  </div>

                  <div className="space-y-2">
                    {workflowSteps?.map((step, index) => (
                      <motion.div
                        key={step.workflow_step_id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl group hover:bg-white/10 transition-all"
                      >
                        {/* <GripVertical className="w-5 h-5 opacity-30 cursor-move" /> */}
                        <div className="w-10 h-10 bg-gray-500 rounded-full font-bold flex items-center justify-center ">
                          {
                            index + 1
                          }

                        </div>
                        <div className="flex-1">
                          <p className="text-base">{step.step_name}</p>
                        </div>
                        {selectedTemplate === "custom" && (
                          <button
                            onClick={() => handleRemoveStep(step.workflow_step_id)}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Add Custom Step */}
                  {selectedTemplate === "custom" && (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newStepName}
                        onChange={(e) => setNewStepName(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddStep()}
                        placeholder="Add custom step..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-all"
                      />
                      <button
                        onClick={handleAddStep}
                        className="px-4 py-3 bg-accent rounded-xl hover:bg-accent/90 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Add Step</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

         

           {/* ── Step 3: Team Assignment ── */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Step 3 of 4</p>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight">Assign Production Team</h2>
                <p className="text-sm text-white/40">Assign one or more team members to each step. You can add new members on the fly.</p>
              </div>

              <div className="space-y-2">
                {workflowSteps.map((step, index) => {

  const assignment = teamAssignments?.find(
    (a) =>
      a.workflow_step_id ===
      step.workflow_step_id
  );

  

  
  
                  const hasAssignees = assignment?.assigned_member_ids?.length > 0;

                  console.log(teamAssignments?.[index-1]?.date)
          
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className={`px-5 py-4 rounded-2xl border transition-all duration-200 ${
                        hasAssignees
                          ? "bg-accent/[0.04] border-accent/15"
                          : "bg-white/[0.03] border-white/8"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Step number */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                          hasAssignees
                            ? "bg-accent/20 border border-accent/35 text-accent"
                            : "bg-white/[0.05] border border-white/10 text-white/30"
                        }`}>
                          {hasAssignees ? <Check size={11} /> : index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium mb-2.5 transition-colors ${hasAssignees ? "text-white/85" : "text-white/55"}`}>
                            {step.step_name}
                          </p>
                          <StepAssigneePicker
                            step={step}
                            allMembers={teamMembers}
                            assignedIds={assignment?.assigned_member_ids || []}
                            onToggle={(memberId) => handleAssignTeamMember(step.workflow_step_id, memberId)}

                            fetchTeam={()=> fetchTeamMembers()}
                            
                            // onAddMember={handleAddMember}
                          />

                           <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className="relative">
                              <Calendar size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                              <input
                                type="date"

                                  min = {index === 0 ?today : teamAssignments?.[index-1]?.date}
                                  disabled={
  index > 0 &&
  !teamAssignments?.find(
    (a) =>
      a.workflow_step_id ===
      workflowSteps[index - 1].workflow_step_id
  )?.date
}
                               value={assignment?.date || ""}
                               onChange={(e) =>
    handleUpdateStepSchedule(
      step.workflow_step_id,
      "date",
      e.target.value
    )
  }
                                className="w-full bg-white/[0.04] border border-white/8 rounded-lg pl-7 pr-2 py-1.5 text-xs text-white/70 placeholder-white/20 outline-none focus:border-accent/40 focus:bg-white/[0.06] transition-all [color-scheme:dark]"
                              />
                            </div>
                            <div className="relative">
                              <Clock size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                              <input
                                type="time"
                                 value={assignment?.time || ""}
  onChange={(e) =>
    handleUpdateStepSchedule(
      step.workflow_step_id,
      "time",
      e.target.value
    )
  }
                                className="w-full bg-white/[0.04] border border-white/8 rounded-lg pl-7 pr-2 py-1.5 text-xs text-white/70 placeholder-white/20 outline-none focus:border-accent/40 focus:bg-white/[0.06] transition-all [color-scheme:dark]"
                              />
                            </div>
                            
                            <div className="relative">
                              <Briefcase size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                              <input
                                type="text"
                                value={assignment?.venue || ""}
  onChange={(e) =>
    handleUpdateStepSchedule(
      step.workflow_step_id,
      "venue",
      e.target.value
    )
  }
                                placeholder="Venue name"
                                className="w-full bg-white/[0.04] border border-white/8 rounded-lg pl-7 pr-2 py-1.5 text-xs text-white/70 placeholder-white/20 outline-none focus:border-accent/40 focus:bg-white/[0.06] transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Team roster summary */}
              {allAssignedMembers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
                >
                  <p className="text-xs tracking-[0.18em] uppercase text-white/25 mb-4">Crew on this project</p>
                  <div className="flex flex-wrap gap-2">
                    {allAssignedMembers?.map((m) => (
                      <div key={m.member_id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${avatarColor(m.id)} flex items-center justify-center text-[9px] font-medium`}>
                         {initials(m.full_name)}
                        </div>
                        <span className="text-xs text-white/60">{m.full_name}</span>
                        <span className="text-[10px] text-white/25">· {m.role}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

         {/* ── Step 4: Review ── */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Step 4 of 4</p>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight">Review & Launch</h2>
                <p className="text-sm text-white/40">Everything looks good? Launch the project and your team will be notified.</p>
              </div>

              <div className="space-y-4">
                {/* Client Info */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
                    <p className="text-xs tracking-[0.18em] uppercase text-white/30">Client</p>
                    <button onClick={() => setCurrentStep(1)} className="text-xs text-accent hover:text-accent/70 transition-colors">
                      Edit
                    </button>
                  </div>
                  <div className="px-6 py-4 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      { label: "Name", value: clientName },
                      { label: "Event Type", value: eventTypes.find((t) => t.value === eventType)?.label ?? "" },
                      
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-1">{label}</p>
                        <p className="text-sm text-white/75">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow + Team */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
                    <p className="text-xs tracking-[0.18em] uppercase text-white/30">Workflow & Team</p>
                    <button onClick={() => setCurrentStep(3)} className="text-xs text-accent hover:text-accent/70 transition-colors">
                      Edit
                    </button>
                  </div>
                  <div className="px-6 py-4 space-y-2">
                    {workflowSteps?.map((step, index) => {
                     const assignment = teamAssignments.find(
    (a) => a.workflow_step_id === step.workflow_step_id
  );

  const assigned = teamMembers.filter((member) =>
    assignment?.assigned_member_ids?.includes(member.member_id)
  );
                      return (
                        <div
                          key={step.workflow_step_id}
                          className="flex items-center gap-3 py-2.5 border-b border-white/4 last:border-0"
                        >
                          <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-[11px] text-accent/60 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-sm text-white/60 flex-1">{step.step_name}</p>
                          {assigned.length > 0 ? (
                            <div className="flex items-center gap-1.5">
                              <div className="flex -space-x-1.5">
                                {assigned.slice(0, 4).map((m) => (
                                  <div
                                    key={m.member_id}
                                    title={m.full_name}
                                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${avatarColor(m.member_id)} border border-background flex items-center justify-center text-[9px] font-medium`}
                                  >
                                    {initials(m.full_name)}
                                  </div>
                                ))}
                                {assigned.length > 4 && (
                                  <div className="w-6 h-6 rounded-full bg-white/10 border border-background flex items-center justify-center text-[9px] text-white/50">
                                    +{assigned.length - 4}
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-white/35 hidden sm:block">
                                {assigned.length === 1 ? assigned[0].full_name : `${assigned.length} members`}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-white/20 italic">Unassigned</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-6 py-3 border-t border-white/6 flex items-center justify-between">
                    <span className="text-xs text-white/20">{workflowSteps?.length} steps total</span>
                    <span className="text-xs text-white/20">{allAssignedMembers?.length} crew members</span>
                  </div>
                </div>

                {/* Full crew list */}
                {allAssignedMembers.length > 0 && (
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/6">
                      <p className="text-xs tracking-[0.18em] uppercase text-white/30">Full Crew Roster</p>
                    </div>
                    <div className="px-6 py-4 space-y-3">
                  {allAssignedMembers.map((member) => {
  const stepsForMember = workflowSteps.filter((step) => {
    const assignment = teamAssignments.find(
      (a) => a.workflow_step_id === step.workflow_step_id
    );

    return assignment?.assigned_member_ids?.includes(member.member_id);
  });

  return (
    <div key={member.member_id} className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor(
          member.member_id
        )} flex items-center justify-center text-xs font-medium flex-shrink-0`}
      >
        {initials(member.full_name)}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/75">{member.full_name}</p>
        <p className="text-xs text-white/30">{member.role}</p>
      </div>

      <div className="flex flex-wrap gap-1 justify-end max-w-[40%]">
        {stepsForMember.map((step) => (
          <span
            key={step.workflow_step_id}
            className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/8 text-white/30 whitespace-nowrap"
          >
            {step.step_name}
          </span>
        ))}
      </div>
    </div>
  );
})}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex items-center justify-between"
        >
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3.5 border border-white/10 rounded-full transition-all ${
              currentStep === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-white/5"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-full transition-all ${
                canProceed()
                  ? "bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20"
                  : "bg-white/5 opacity-40 cursor-not-allowed"
              }`}
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleCreateProject}
              className="flex items-center gap-2 px-8 py-3.5 bg-accent rounded-full hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all"
            >
              <Check className="w-5 h-5" />
              <span>
                {
                  Launching ?'Launching...':'Launch Project'
                }
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
