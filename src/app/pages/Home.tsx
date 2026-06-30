import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Camera, Video, User, ArrowRight, Check, TrendingUp, Phone, Mail, Menu } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import TestimonialCarousel3D from "../components/TestimonialCarousel3D";
import PortfolioFolders from "../components/PortfolioFolders";

import HeroSlide1 from '../../assets/IMG_1495(1).jpg'
import HeroSlide2 from '../../assets/IMG_1501(1).jpeg'
import HeroSlide3 from '../../assets/IMG_5048(1).jpg'

import HeroSlideMobile1 from '../../assets/IMG_0289.jpeg'
import HeroSlideMobile2 from '../../assets/IMG_8243.jpg'
import HeroSlideMobile3 from '../../assets/IMG_8592.jpg'

import Rajmahal from '../../assets/Rajmahal.jpeg'
import Recologo  from'../../assets/RecoLogo.png'
import Rently from '../../assets/Rently logo.png'
import Super8 from '../../assets/super8.png'



export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [currentSlide, setCurrentSlide] = useState(0);

const isMobile = window.matchMedia("(max-width: 600px)").matches;

  const heroSlides = [
    {
      image: isMobile?HeroSlideMobile3:HeroSlide1,
      title: "Crafting Visual Stories That Don't Fade",
      description: "Premium creative production for brands and individuals who demand excellence."
    },
    {
                  image: isMobile?HeroSlideMobile2:HeroSlide2,


      title: "Where Process Meets Artistry",
      description: "Structured workflows that deliver cinematic quality, every single time."
    },
    {
                image: isMobile?HeroSlideMobile1:HeroSlide3,


      title: "Editorial Precision, Creative Vision",
      description: "Modeling portfolios and brand campaigns that capture authentic presence."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const services = [
    {
      icon: Camera,
      title: "Photography",
      description: "Editorial, commercial, and lifestyle photography that captures moments with precision and artistry."
    },
    {
      icon: Video,
      title: "Videography",
      description: "Cinematic storytelling through motion—from brand films to event coverage."
    },
    {
      icon: User,
      title: "Modeling Portfolios",
      description: "Professional portfolio development that elevates careers and captures authentic presence."
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Strategic digital campaigns and brand growth through targeted marketing and social media management."
    }
  ];

  const processSteps = [
    { number: "01", title: "Client Onboarding", description: "Understanding your vision, goals, and creative direction." },
    { number: "02", title: "Moodboard & Planning", description: "Collaborative visual planning to align on aesthetic and approach." },
    { number: "03", title: "Shoot Execution", description: "Professional production with meticulous attention to detail." },
    { number: "04", title: "Editing Pipeline", description: "Post-production refinement to deliver cinematic quality." },
    { number: "05", title: "Delivery & Access", description: "Organized delivery system with ongoing client access." }
  ];


  const [MenuOpen,setMenuOpen] = useState(false)
  return (
    <div className="relative bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 flex items-center justify-between backdrop-blur-sm bg-background/80"
      >
        <Menu onClick={()=>{setMenuOpen(!MenuOpen)}}/>
            {MenuOpen &&<motion.div 
             initial={{ y: -100 }}
        animate={{ y: 0 }}
            className="flex flex-col gap-2  p-3 rounded-xl text-accent absolute top-full bg-white">
          <a onClick={()=>{setMenuOpen(!MenuOpen)}} href="#portfolio" className="block text-sm opacity-70 hover:opacity-100  transition-opacity">Portfolio</a>
          <a onClick={()=>{setMenuOpen(!MenuOpen)}} href="#services" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Services</a>
          <a onClick={()=>{setMenuOpen(!MenuOpen)}} href="#process" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Process</a>
          <Link onClick={()=>{setMenuOpen(!MenuOpen)}} to="/workspace" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
            Enter Workspace
          </Link>
            </motion.div>}

        <Link to="/" className="text-xl md:text-2xl tracking-tight">Midori Media</Link>
        <div className="flex gap-4 md:gap-8 items-center">
          <a href="#portfolio" className="hidden sm:block text-sm opacity-70 hover:opacity-100 transition-opacity ">Portfolio</a>
          <a href="#services" className="hidden sm:block text-sm opacity-70 hover:opacity-100 transition-opacity">Services</a>
          <a href="#process" className="hidden md:block text-sm opacity-70 hover:opacity-100 transition-opacity">Process</a>
          <Link to="/workspace" className="hidden lg:block text-sm opacity-70 hover:opacity-100 transition-opacity">
            Enter Workspace
          </Link>
          <Link
            to="/wedding-builder"
            className="flex items-center gap-1.5 border border-accent/50 text-accent px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm rounded-full hover:bg-accent/10 hover:border-accent transition-all duration-300"
            style={{ boxShadow: "0 0 16px rgba(45,95,79,0.15)" }}
          >
            <span>Build Your Package</span>
          </Link>
        
        </div>
      </motion.nav>

      {/* Hero Section - Vertical Carousel */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, filter: "brightness(1.5) blur(20px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
              <img
                src={heroSlides[currentSlide].image}
                alt="Midori Media"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 h-full flex items-center md:justify-end justify-center px-4 md:px-6 max-w-7xl mx-auto">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-xl text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-80 mb-8 md:mb-12">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a href="#portfolio" className="bg-accent px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 rounded-full">
                View Portfolio <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <Link to="/booking" className="border border-white/20 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:bg-white/5 transition-colors rounded-full text-center">
                Book a Shoot
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 md:bottom-12 right-4 md:right-6 z-30 flex flex-col gap-2 md:gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-0.5 transition-all ${
                currentSlide === index
                  ? "h-12 md:h-16 bg-accent"
                  : "h-6 md:h-8 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Visual Identity Statement */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-4 md:mb-6">VISUAL STORYTELLING</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 max-w-3xl mx-auto leading-tight">
              Every frame carries intention. Every project reflects a system.
            </h2>
            <p className="text-base md:text-xl opacity-70 max-w-2xl mx-auto">
              We don't chase trends—we build narratives that resonate, with the technical precision and creative direction that separates good from unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-3 md:mb-4">WHAT WE DO</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl">Services</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="border border-white/10 p-8 md:p-12 hover:border-accent/50 transition-all duration-500 h-full rounded-2xl md:rounded-3xl">
                  <service.icon className="w-10 h-10 md:w-12 md:h-12 mb-6 md:mb-8 text-accent" strokeWidth={1.5} />
                  <h3 className="text-xl md:text-2xl mb-3 md:mb-4">{service.title}</h3>
                  <p className="opacity-70 leading-relaxed text-sm md:text-base">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Digital Marketing - Centered on second row */}
          <div className="flex justify-center mt-4 md:mt-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1.333rem)] max-w-md"
            >
              <div className="border border-white/10 p-8 md:p-12 hover:border-accent/50 transition-all duration-500 h-full rounded-2xl md:rounded-3xl">
                <TrendingUp className="w-10 h-10 md:w-12 md:h-12 mb-6 md:mb-8 text-accent" strokeWidth={1.5} />
                <h3 className="text-xl md:text-2xl mb-3 md:mb-4">{services[3].title}</h3>
                <p className="opacity-70 leading-relaxed text-sm md:text-base">{services[3].description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio - Folder Based */}
      <section id="portfolio" className="py-16 md:py-24 lg:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-3 md:mb-4">OUR WORK</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4">Portfolio</h2>
            <p className="text-base md:text-lg opacity-70 max-w-2xl">
              Browse through our curated wedding projects. Each folder tells a unique story.
            </p>
          </motion.div>

          <PortfolioFolders />
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20 text-center"
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-3 md:mb-4">HOW WE WORK</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">The Process</h2>
            <p className="text-base md:text-xl opacity-70 max-w-2xl mx-auto">
              A structured workflow designed for clarity, collaboration, and exceptional results.
            </p>
          </motion.div>

          <div className="space-y-1">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 16 }}
                className="border-l-2 md:border-l-4 border-accent/20 pl-6 md:pl-12 py-6 md:py-8 hover:border-accent transition-all duration-300 group cursor-pointer rounded-r-xl md:rounded-r-2xl"
              >
                <div className="flex items-start gap-4 md:gap-8">
                  <div className="text-4xl md:text-6xl opacity-20 group-hover:opacity-40 transition-opacity font-light">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl mb-1 md:mb-2">{step.title}</h3>
                    <p className="opacity-70 text-sm md:text-base">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Midori Media */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-3 md:mb-4">THE DIFFERENCE</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-8 md:mb-12">Why Midori Media</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Check className="w-6 h-6 md:w-8 md:h-8 text-accent mb-4 md:mb-6" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl mb-3 md:mb-4">Transparent Workflow System</h3>
              <p className="opacity-70 leading-relaxed text-sm md:text-base">
                No black boxes. You see every stage of production, from concept to final delivery, with clear timelines and milestones.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Check className="w-6 h-6 md:w-8 md:h-8 text-accent mb-4 md:mb-6" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl mb-3 md:mb-4">Client Collaboration</h3>
              <p className="opacity-70 leading-relaxed text-sm md:text-base">
                Moodboards, feedback loops, and creative alignment at every step. Your input shapes the final vision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Check className="w-6 h-6 md:w-8 md:h-8 text-accent mb-4 md:mb-6" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl mb-3 md:mb-4">Structured Editing Pipeline</h3>
              <p className="opacity-70 leading-relaxed text-sm md:text-base">
                Professional post-production with consistent quality standards, color grading, and cinematic finishing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Check className="w-6 h-6 md:w-8 md:h-8 text-accent mb-4 md:mb-6" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl mb-3 md:mb-4">Professional Delivery System</h3>
              <p className="opacity-70 leading-relaxed text-sm md:text-base">
                Organized asset delivery with ongoing access. Your content is archived, accessible, and ready when you need it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - 3D Carousel */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-secondary/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-3 md:mb-4">CLIENT FEEDBACK</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4">What Our Clients Say</h2>
            <p className="text-sm md:text-base opacity-60 max-w-2xl mx-auto">
              Real experiences from those who trusted us with their vision
            </p>
          </motion.div>

          <TestimonialCarousel3D />
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs md:text-sm tracking-widest text-accent mb-3 md:mb-4">PARTNERSHIPS</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6">Trusted by Leading Brands</h2>
              <p className="text-base md:text-lg opacity-70 leading-relaxed mb-6 md:mb-8">
                We've had the privilege of collaborating with renowned brands and luxury establishments across the globe, delivering exceptional visual content that elevates their stories.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {[
                  { number: "150+", label: "Projects" },
                  { number: "20+", label: "Cities" },
                  { number: "5", label: "Countries" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center md:text-left"
                  >
                    <div className="text-2xl md:text-3xl lg:text-4xl text-accent mb-1">{stat.number}</div>
                    <div className="text-xs md:text-sm opacity-60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Logo Grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 bg-white/5 backdrop-blur-sm"
            >
             <div className="columns-2 sm:columns-3 gap-6 md:gap-8">
  {[
    { name: "Rajmahal", logo: Rajmahal },
    { name: "Rently", logo: Rently },
    { name: "Super8", logo: Super8 },
    { name: "Recologo", logo: Recologo },
  ].map((brand, index) => (
    <motion.div
      key={brand.name}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`
        break-inside-avoid mb-6
        flex items-center justify-center
        rounded-2xl overflow-hidden
        

        ${
          index % 4 === 0
            ? "h-32"
            : index % 3 === 0
            ? "h-24"
            : "h-20"
        }
      `}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="w-full h-full object-contain"
      />
    </motion.div>
  ))}
</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strong Closing CTA */}
      <section className="relative py-24 md:py-32 lg:py-40 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1758613653843-87c253aea8cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzU5NDczMDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Studio"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8 leading-tight">
            Let's Create Something That Stands Out
          </h2>
          <p className="text-base md:text-xl opacity-80 mb-8 md:mb-12 max-w-2xl mx-auto">
            Ready to elevate your brand with visual content that doesn't fade?
          </p>
          <Link to="/booking" className="inline-block bg-accent px-8 md:px-12 py-4 md:py-5 text-base md:text-lg hover:bg-accent/90 transition-colors rounded-full">
            Start Your Project
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl md:text-2xl mb-3 md:mb-4">Midori Media</div>
              <p className="text-xs md:text-sm opacity-60 mb-4">Premium creative production</p>
              <div className="space-y-2">
                <a href="tel:+15551234567" className="flex items-center gap-2 text-xs md:text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all group">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>+1 (555) 123-4567</span>
                </a>
                <a href="mailto:hello@midorimedia.com" className="flex items-center gap-2 text-xs md:text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all group">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>hello@midorimedia.com</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xs md:text-sm tracking-widest mb-3 md:mb-4 opacity-60">SERVICES</h4>
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Photography</div>
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Videography</div>
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Modeling Portfolios</div>
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Digital Marketing</div>
              </div>
            </div>
            <div>
              <h4 className="text-xs md:text-sm tracking-widest mb-3 md:mb-4 opacity-60">COMPANY</h4>
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">About</div>
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Process</div>
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Contact</div>
              </div>
            </div>
            <div>
              <h4 className="text-xs md:text-sm tracking-widest mb-3 md:mb-4 opacity-60">CONNECT</h4>
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Instagram</div>
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">LinkedIn</div>
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Email</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm opacity-60">
            <div>© 2026 Midori Media. All rights reserved.</div>
            <div className="flex gap-6 md:gap-8">
              <div className="hover:opacity-100 transition-opacity cursor-pointer">Privacy</div>
              <div className="hover:opacity-100 transition-opacity cursor-pointer">Terms</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}