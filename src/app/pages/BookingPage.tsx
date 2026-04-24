import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Camera, Video, User, ArrowRight, ArrowLeft, Check } from "lucide-react";

type FormData = {
  projectType: string;
  projectScope: string;
  timeline: string;
  vision: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  additionalDetails: string;
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    projectScope: "",
    timeline: "",
    vision: "",
    name: "",
    email: "",
    phone: "",
    budget: "",
    additionalDetails: ""
  });

  const totalSteps = 5;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setCurrentStep(totalSteps + 1);
  };

  const projectTypes = [
    { icon: Camera, title: "Photography", description: "Editorial, commercial, and lifestyle photography" },
    { icon: Video, title: "Videography", description: "Cinematic storytelling and brand films" },
    { icon: User, title: "Modeling Portfolio", description: "Professional portfolio development" }
  ];

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "$10,000+"
  ];

  const timelines = [
    "Within 2 weeks",
    "Within 1 month",
    "1-2 months",
    "2-3 months",
    "Flexible timeline"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 flex items-center justify-between backdrop-blur-sm bg-background/80"
      >
        <Link to="/" className="text-xl md:text-2xl tracking-tight">Midori Media</Link>
        <Link to="/" className="text-xs md:text-sm opacity-70 hover:opacity-100 transition-opacity">
          ← Back to Home
        </Link>
      </motion.nav>

      <div className="relative z-10 pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-3 md:mb-4">BOOK YOUR PROJECT</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">Let's Create Together</h1>
            <p className="text-base md:text-xl opacity-70">
              Tell us about your vision and we'll bring it to life
            </p>
          </motion.div>

          {/* Progress Bar */}
          {currentStep <= totalSteps && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 md:mb-12"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4 text-xs md:text-sm">
                <div className="opacity-60">Step {currentStep} of {totalSteps}</div>
                <div className="opacity-60">{Math.round((currentStep / totalSteps) * 100)}% Complete</div>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Step Indicators */}
              <div className="flex justify-between mt-6 md:mt-8">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      index + 1 <= currentStep ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-1 md:mb-2 transition-colors ${
                        index + 1 < currentStep
                          ? "bg-accent"
                          : index + 1 === currentStep
                          ? "border-2 border-accent"
                          : "border border-white/20"
                      }`}
                    >
                      {index + 1 < currentStep ? (
                        <Check className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        <span className="text-xs md:text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div className="text-[10px] md:text-xs text-center opacity-60 max-w-[60px] md:max-w-[80px]">
                      {index === 0 && "Project"}
                      {index === 1 && "Details"}
                      {index === 2 && "Contact"}
                      {index === 3 && "Budget"}
                      {index === 4 && "Review"}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            {/* Step 1: Project Type */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">What type of project do you have in mind?</h2>
                  <p className="opacity-70 text-sm md:text-base">Select the service that best fits your needs</p>
                </div>

                <div className="grid gap-3 md:gap-4">
                  {projectTypes.map((type) => (
                    <motion.button
                      key={type.title}
                      onClick={() => updateFormData("projectType", type.title)}
                      whileHover={{ x: 8 }}
                      className={`border p-6 md:p-8 text-left transition-all rounded-2xl md:rounded-3xl ${
                        formData.projectType === type.title
                          ? "border-accent bg-accent/10"
                          : "border-white/10 hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-start gap-4 md:gap-6">
                        <type.icon className="w-8 h-8 md:w-10 md:h-10 text-accent flex-shrink-0" strokeWidth={1.5} />
                        <div>
                          <h3 className="text-lg md:text-xl mb-1 md:mb-2">{type.title}</h3>
                          <p className="opacity-70 text-xs md:text-sm">{type.description}</p>
                        </div>
                        {formData.projectType === type.title && (
                          <Check className="w-5 h-5 md:w-6 md:h-6 text-accent ml-auto flex-shrink-0" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">Tell us about your project</h2>
                  <p className="opacity-70 text-sm md:text-base">Help us understand your vision and requirements</p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-xs md:text-sm tracking-widest text-accent mb-2 md:mb-3">
                      PROJECT SCOPE
                    </label>
                    <textarea
                      value={formData.projectScope}
                      onChange={(e) => updateFormData("projectScope", e.target.value)}
                      placeholder="Describe the scope of your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 min-h-[100px] md:min-h-[120px] text-sm md:text-base focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm tracking-widest text-accent mb-2 md:mb-3">
                      TIMELINE
                    </label>
                    <div className="grid gap-2 md:gap-3">
                      {timelines.map((timeline) => (
                        <button
                          key={timeline}
                          onClick={() => updateFormData("timeline", timeline)}
                          className={`border p-3 md:p-4 text-left transition-all rounded-xl md:rounded-2xl text-sm md:text-base ${
                            formData.timeline === timeline
                              ? "border-accent bg-accent/10"
                              : "border-white/10 hover:border-accent/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{timeline}</span>
                            {formData.timeline === timeline && (
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm tracking-widest text-accent mb-2 md:mb-3">
                      CREATIVE VISION
                    </label>
                    <textarea
                      value={formData.vision}
                      onChange={(e) => updateFormData("vision", e.target.value)}
                      placeholder="Share your creative vision, references, or inspiration..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 min-h-[100px] md:min-h-[120px] text-sm md:text-base focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">How can we reach you?</h2>
                  <p className="opacity-70 text-sm md:text-base">Your contact information helps us get in touch</p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-xs md:text-sm tracking-widest text-accent mb-2 md:mb-3">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-sm md:text-base focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm tracking-widest text-accent mb-2 md:mb-3">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-sm md:text-base focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm tracking-widest text-accent mb-2 md:mb-3">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-sm md:text-base focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Budget & Additional Details */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">Budget and final details</h2>
                  <p className="opacity-70 text-sm md:text-base">This helps us tailor our proposal to your needs</p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-xs md:text-sm tracking-widest text-accent mb-2 md:mb-3">
                      BUDGET RANGE
                    </label>
                    <div className="grid gap-2 md:gap-3">
                      {budgetRanges.map((budget) => (
                        <button
                          key={budget}
                          onClick={() => updateFormData("budget", budget)}
                          className={`border p-3 md:p-4 text-left transition-all rounded-xl md:rounded-2xl text-sm md:text-base ${
                            formData.budget === budget
                              ? "border-accent bg-accent/10"
                              : "border-white/10 hover:border-accent/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{budget}</span>
                            {formData.budget === budget && (
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm tracking-widest text-accent mb-2 md:mb-3">
                      ADDITIONAL DETAILS (OPTIONAL)
                    </label>
                    <textarea
                      value={formData.additionalDetails}
                      onChange={(e) => updateFormData("additionalDetails", e.target.value)}
                      placeholder="Any other details you'd like to share..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 min-h-[100px] md:min-h-[120px] text-sm md:text-base focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">Review your submission</h2>
                  <p className="opacity-70 text-sm md:text-base">Please review your information before submitting</p>
                </div>

                <div className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-4 md:space-y-6">
                  <div>
                    <div className="text-xs md:text-sm tracking-widest text-accent mb-1 md:mb-2">PROJECT TYPE</div>
                    <div className="text-base md:text-lg">{formData.projectType}</div>
                  </div>

                  <div className="border-t border-white/10 pt-4 md:pt-6">
                    <div className="text-xs md:text-sm tracking-widest text-accent mb-1 md:mb-2">PROJECT SCOPE</div>
                    <div className="opacity-80 text-sm md:text-base">{formData.projectScope || "Not provided"}</div>
                  </div>

                  <div className="border-t border-white/10 pt-4 md:pt-6">
                    <div className="text-xs md:text-sm tracking-widest text-accent mb-1 md:mb-2">TIMELINE</div>
                    <div className="opacity-80 text-sm md:text-base">{formData.timeline}</div>
                  </div>

                  <div className="border-t border-white/10 pt-4 md:pt-6">
                    <div className="text-xs md:text-sm tracking-widest text-accent mb-1 md:mb-2">CREATIVE VISION</div>
                    <div className="opacity-80 text-sm md:text-base">{formData.vision || "Not provided"}</div>
                  </div>

                  <div className="border-t border-white/10 pt-4 md:pt-6">
                    <div className="text-xs md:text-sm tracking-widest text-accent mb-1 md:mb-2">CONTACT</div>
                    <div className="opacity-80 text-sm md:text-base">
                      {formData.name}<br />
                      {formData.email}<br />
                      {formData.phone}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 md:pt-6">
                    <div className="text-xs md:text-sm tracking-widest text-accent mb-1 md:mb-2">BUDGET</div>
                    <div className="opacity-80 text-sm md:text-base">{formData.budget}</div>
                  </div>

                  {formData.additionalDetails && (
                    <div className="border-t border-white/10 pt-4 md:pt-6">
                      <div className="text-xs md:text-sm tracking-widest text-accent mb-1 md:mb-2">ADDITIONAL DETAILS</div>
                      <div className="opacity-80 text-sm md:text-base">{formData.additionalDetails}</div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {currentStep === totalSteps + 1 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 md:py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 md:w-24 md:h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
                >
                  <Check className="w-10 h-10 md:w-12 md:h-12" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl mb-3 md:mb-4">Thank You!</h2>
                <p className="text-base md:text-xl opacity-70 mb-8 md:mb-12 max-w-lg mx-auto px-4">
                  We've received your project inquiry. Our team will review your submission and get back to you within 24-48 hours.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-accent px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:bg-accent/90 transition-colors rounded-full"
                >
                  Back to Home <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep <= totalSteps && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 md:gap-4 mt-8 md:mt-12"
            >
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="flex-1 border border-white/20 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base hover:bg-white/5 transition-colors rounded-full flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Previous</span><span className="sm:hidden">Prev</span>
                </button>
              )}
              {currentStep < totalSteps && (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !formData.projectType) ||
                    (currentStep === 2 && (!formData.timeline)) ||
                    (currentStep === 3 && (!formData.name || !formData.email))
                  }
                  className="flex-1 bg-accent px-6 md:px-8 py-3 md:py-4 text-sm md:text-base hover:bg-accent/90 transition-colors rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              )}
              {currentStep === totalSteps && (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.budget}
                  className="flex-1 bg-accent px-6 md:px-8 py-3 md:py-4 text-sm md:text-base hover:bg-accent/90 transition-colors rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Submit Project</span><span className="sm:hidden">Submit</span> <Check className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}