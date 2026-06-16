import { useEffect, useState } from "react";
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
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { adressautocomplete, createClient, getTeamMembers, getWorkflowSteps, getWorkflowTemplates } from "../../Utils/Apicalls";
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
  { value: "custom", label: "Custom Event", icon: Briefcase },
];

export default function ClientOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 - Client Details
  const [clientName, setClientName] = useState("");
  const [eventDate, setEventDate] = useState("");
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

useEffect(() => {
  const fetchTeamMembers = async () => {
    try {
      const response =
        await getTeamMembers();

      setTeamMembers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

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

  setTeamAssignments((prev) => {

    const existing =
      prev.find(
        (item) =>
          item.workflow_step_id ===
          workflow_step_id
      );

    if (existing) {
      return prev.map((item) =>
        item.workflow_step_id ===
        workflow_step_id
          ? {
              ...item,
              assigned_member_id,
            }
          : item
      );
    }

    return [
      ...prev,
      {
        workflow_step_id,
        assigned_member_id,
      },
    ];
  });

  setShowAssigneeDropdown(null);
};

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
      eventType,
      selectedLocation,
      workflowSteps,
      teamAssignments,
      workflow_template_id:
        selectedTemplate === "custom"
          ? null
          : selectedTemplate,
    };

    console.log(payload);

    const response =
      await createClient(payload);

    console.log(response);



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
      return clientName && eventDate && eventType && selectedLocation;
    }
    if (currentStep === 2) {
      return selectedTemplate && workflowSteps.length > 0;
    }
    return true;
  };

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
                <h2 className="text-3xl md:text-4xl mb-3 tracking-tight">Client Information</h2>
                <p className="text-base opacity-60">Start by adding essential project details</p>
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
                <div>
                  <label className="block text-sm opacity-70 mb-2">Event Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-4 text-lg focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </div>
                </div>

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
                <div>
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
                </div>
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
                <h2 className="text-3xl md:text-4xl mb-3 tracking-tight">Production Workflow</h2>
                <p className="text-base opacity-60">Choose a workflow template or create your own</p>
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

          {/* Step 3 - Team Assignment */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl mb-3 tracking-tight">Assign Production Team</h2>
                <p className="text-base opacity-60">Assign team members to each workflow step</p>
              </div>

              <div className="space-y-3">
             {workflowSteps.map((step, index) => {
  const assignment = teamAssignments.find(
    (a) =>
      a.workflow_step_id ===
      step.workflow_step_id
  );

  const assignedMember = teamMembers.find(
    (m) =>
      m.member_id ===
      assignment?.assigned_member_id
  );

  return (
    <motion.div
      key={step.workflow_step_id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-xl"
    >
      <div className="flex-1">
        <p className="text-base">
          {step.step_name}
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() =>
            setShowAssigneeDropdown(
              showAssigneeDropdown ===
                step.workflow_step_id
                ? null
                : step.workflow_step_id
            )
          }
          className="min-w-[220px] px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-left flex items-center gap-3 hover:bg-white/10 transition-all"
        >
          {assignedMember ? (
            <>
              <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs">
                {assignedMember.full_name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="flex-1">
                <p className="text-sm">
                  {assignedMember.full_name}
                </p>

                <p className="text-xs opacity-50">
                  {assignedMember.role}
                </p>
              </div>
            </>
          ) : (
            <>
              <Users className="w-5 h-5 opacity-40" />
              <span className="opacity-60">
                Assign team member
              </span>
            </>
          )}

          <ChevronDown
            className={`w-4 h-4 opacity-40 ml-auto transition-transform ${
              showAssigneeDropdown ===
              step.workflow_step_id
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {showAssigneeDropdown ===
            step.workflow_step_id && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="absolute top-full mt-2 left-0 right-0 bg-secondary border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20"
            >
              {teamMembers.map((member) => (
                <button
                  key={member.member_id}
                  onClick={() =>
                    handleAssignTeamMember(
                      step.workflow_step_id,
                      member.member_id
                    )
                  }
                  className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all flex items-center gap-3 border-b border-white/5 last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs">
                    {member.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm">
                      {member.full_name}
                    </p>

                    <p className="text-xs opacity-50">
                      {member.role}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
})}
              </div>
            </motion.div>
          )}

          {/* Step 4 - Review */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl mb-3 tracking-tight">Review Production Setup</h2>
                <p className="text-base opacity-60">Confirm all details before launching the project</p>
              </div>

              <div className="space-y-6">
                {/* Client Information */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl">Client Information</h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-sm text-accent hover:opacity-80 transition-opacity"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs opacity-60 mb-1">Client Name</p>
                      <p className="text-base">{clientName}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">Event Type</p>
                      <p className="text-base capitalize">{eventTypes.find((t) => t.value === eventType)?.label}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">Event Date</p>
                      <p className="text-base">{new Date(eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">Location</p>
                      <p className="text-base">{selectedLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Workflow Timeline */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl">Workflow Timeline</h3>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-sm text-accent hover:opacity-80 transition-opacity"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-2">
                    {workflowSteps.map((step, index) => (
                      <div
                        key={step.workflow_step_id}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                      >
                        <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <p className="text-sm">{step.step_name}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs opacity-50 mt-3">{workflowSteps?.length} total steps</p>
                </div>

                {/* Assigned Team */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl">Assigned Team</h3>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="text-sm text-accent hover:opacity-80 transition-opacity"
                    >
                      Edit
                    </button>
                  </div>
                 <div className="space-y-2">
  {workflowSteps?.map((step) => {

    const assignment =
      teamAssignments.find(
        (a) =>
          a.workflow_step_id ===
          step.workflow_step_id
      );

    const assignedMember =
      teamMembers.find(
        (m) =>
          m.member_id ===
          assignment?.assigned_member_id
      );

    if (!assignedMember) return null;

    return (
      <div
        key={step.workflow_step_id}
        className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
      >
        <p className="text-sm opacity-70">
          {step.step_name}
        </p>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs">
            {assignedMember.full_name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <p className="text-sm">
              {assignedMember.full_name}
            </p>

            <p className="text-xs opacity-50">
              {assignedMember.role}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>
                </div>
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
