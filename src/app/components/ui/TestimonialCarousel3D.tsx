import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    quote: "The process was seamless from start to finish. Midori Media delivered exactly what we envisioned—with a level of professionalism that's rare to find.",
    author: "Sarah Chen",
    role: "Brand Director",
    company: "Luxe Brands",
    rating: 5
  },
  {
    quote: "They didn't just take photos—they captured the essence of our campaign. The attention to detail and creative direction was outstanding.",
    author: "Marcus Johnson",
    role: "Creative Lead",
    company: "Vogue Studios",
    rating: 5
  },
  {
    quote: "Working with Midori Media transformed our brand's visual identity. Their cinematic approach brought our story to life in ways we never imagined.",
    author: "Priya Sharma",
    role: "Marketing Director",
    company: "Heritage Hotels",
    rating: 5
  },
  {
    quote: "From concept to delivery, every frame was meticulously crafted. The team's dedication to quality is unmatched in the industry.",
    author: "James Mitchell",
    role: "CEO",
    company: "Mitchell & Co.",
    rating: 5
  },
  {
    quote: "The final portfolio exceeded all expectations. Their ability to capture authentic moments while maintaining artistic vision is incredible.",
    author: "Aisha Rahman",
    role: "Fashion Model",
    rating: 5
  },
  {
    quote: "Midori Media's workflow transparency and collaborative approach made the entire production effortless. Truly a world-class experience.",
    author: "David Park",
    role: "Events Manager",
    company: "Park Events",
    rating: 5
  },
  {
    quote: "The cinematic quality and storytelling depth they brought to our wedding film was beyond anything we could have hoped for.",
    author: "Isabella Costa",
    role: "Bride",
    rating: 5
  },
  {
    quote: "Their technical expertise combined with creative vision resulted in campaign content that drove unprecedented engagement for our brand.",
    author: "Robert Kim",
    role: "Digital Strategist",
    company: "TrendWave",
    rating: 5
  },
  {
    quote: "Every detail was thoughtfully executed. The team's passion for their craft shines through in every single frame.",
    author: "Nina Patel",
    role: "Art Director",
    company: "Studio Collective",
    rating: 5
  },
  {
    quote: "They transformed our vision into a visual masterpiece. The professionalism and artistry are second to none.",
    author: "Thomas Laurent",
    role: "Founder",
    company: "Laurent Couture",
    rating: 5
  }
];

export default function TestimonialCarousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const getCardPosition = (index: number) => {
    const total = testimonials.length;
    const diff = ((index - activeIndex + total) % total) - Math.floor(total / 2);

    const angle = (diff * 30);
    const translateZ = -Math.abs(diff) * 150;
    const translateY = Math.abs(diff) * 20;
    const opacity = Math.max(0.2, 1 - Math.abs(diff) * 0.25);
    const scale = Math.max(0.7, 1 - Math.abs(diff) * 0.15);
    const blur = Math.abs(diff) * 2;

    return {
      transform: `
        perspective(1200px)
        rotateY(${angle}deg)
        translateZ(${translateZ}px)
        translateY(${translateY}px)
        scale(${scale})
      `,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: 100 - Math.abs(diff)
    };
  };

  return (
    <div
      className="relative w-full py-12 md:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Carousel Container */}
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
          {testimonials.map((testimonial, index) => {
            const position = getCardPosition(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[75%] md:w-[650px] cursor-pointer"
                style={{
                  ...position,
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onClick={() => setActiveIndex(index)}
                whileHover={isActive ? { scale: 1.02 } : {}}
              >
                <div className={`
                  relative bg-gradient-to-br from-black/10 to-black/5 backdrop-blur-xl
                  border-2 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12
                  transition-all duration-500
                  ${isActive
                    ? 'border-accent/60 shadow-2xl shadow-accent/20'
                    : 'border-white/10'
                  }
                `}>
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 md:w-16 md:h-16 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/30">
                    <Quote className="w-5 h-5 md:w-7 md:h-7 text-accent fill-accent/20" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4 md:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 text-accent fill-accent"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className={`
                    mb-6 md:mb-8 leading-relaxed
                    transition-all duration-500
                    ${isActive
                      ? 'text-base sm:text-lg md:text-xl opacity-95'
                      : 'text-sm sm:text-base md:text-lg opacity-70'
                    }
                  `}>
                    "{testimonial.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                      <span className="text-accent text-lg md:text-xl">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className={`
                        transition-all duration-500
                        ${isActive
                          ? 'text-base md:text-lg'
                          : 'text-sm md:text-base'
                        }
                      `}>
                        {testimonial.author}
                      </div>
                      <div className="text-xs md:text-sm opacity-60">
                        {testimonial.role}
                        {testimonial.company && ` • ${testimonial.company}`}
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator Glow */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 -z-10 bg-accent/10 rounded-2xl md:rounded-3xl blur-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8 md:mt-12">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
              transition-all duration-300 rounded-full
              ${index === activeIndex
                ? 'w-8 md:w-12 h-2 md:h-2.5 bg-accent'
                : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/30 hover:bg-white/50'
              }
            `}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center gap-3 mt-6 text-xs md:text-sm opacity-60">
        <span>{activeIndex + 1}</span>
        <div className="w-12 md:w-16 h-px bg-white/20">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? '100%' : '0%' }}
            key={activeIndex}
          />
        </div>
        <span>{testimonials.length}</span>
      </div>
    </div>
  );
}
