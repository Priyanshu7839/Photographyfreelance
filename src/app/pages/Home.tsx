import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Camera, Video, User, ArrowRight, Check, X, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { attachPreviewUrls, getHomepagemages } from "../../Apicalls/Apicalls";
import HeroSlide1 from '../../assets/IMG_1495(1).jpg'
import HeroSlide2 from '../../assets/IMG_1501(1).jpeg'
import HeroSlide3 from '../../assets/IMG_5048(1).jpg'


import HeroSlideMobile1 from '../../assets/IMG_0289.jpeg'
import HeroSlideMobile2 from '../../assets/IMG_8243.jpg'
import HeroSlideMobile3 from '../../assets/IMG_8592.jpg'



type Collaboration = {
  name: string;
  logo: string;
  category: string;
  description: string;
  outcome: string;
  thumbnail: string;
  featured?: boolean;
};

function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl bg-white/5 border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent animate-shimmer" />

          {/* Content placeholders */}
          <div className="absolute inset-0 flex items-end p-4 md:p-8">
            <div className="w-full space-y-2">
              <div className="h-3 w-16 bg-white/10 rounded-full" />
              <div className="h-4 w-3/4 bg-white/10 rounded" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const collaborations: Collaboration[] = [
  {
    name: "Four Seasons Resorts",
    logo: "https://logo.clearbit.com/fourseasons.com",
    category: "Luxury",
    description: "Multi-day luxury wedding documentation",
    outcome: "Captured 3-day destination wedding in Bali featuring 200+ guests",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    featured: true
  },
  {
    name: "Vogue India",
    logo: "https://logo.clearbit.com/vogue.com",
    category: "Celebrity",
    description: "Celebrity wedding editorial coverage",
    outcome: "Featured spread across 12 pages with exclusive behind-the-scenes content",
    thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
    featured: true
  },
  {
    name: "Taj Hotels",
    logo: "https://logo.clearbit.com/tajhotels.com",
    category: "Luxury",
    description: "Exclusive palace wedding cinematography",
    outcome: "Full-scale production for royal destination wedding in Udaipur",
    thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800"
  },
  {
    name: "Condé Nast",
    logo: "https://logo.clearbit.com/condenast.com",
    category: "Corporate",
    description: "Brand campaign photography",
    outcome: "Luxury lifestyle campaign shoot across Mumbai and Goa",
    thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800"
  },
  {
    name: "Ritz-Carlton",
    logo: "https://logo.clearbit.com/ritzcarlton.com",
    category: "Destination",
    description: "International wedding videography",
    outcome: "Cinematic highlight film for 250-guest destination wedding",
    thumbnail: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800"
  },
  {
    name: "Sabyasachi",
    logo: "https://logo.clearbit.com/sabyasachi.com",
    category: "Celebrity",
    description: "Designer bridal campaign",
    outcome: "Exclusive campaign shoot for new bridal couture collection",
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800"
  },
  {
    name: "Oberoi Hotels",
    logo: "https://logo.clearbit.com/oberoihotels.com",
    category: "Luxury",
    description: "Premium wedding documentation",
    outcome: "3-day luxury wedding with international guests in Jaipur",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
  },
  {
    name: "Anita Dongre",
    logo: "https://logo.clearbit.com/anitadongre.com",
    category: "Corporate",
    description: "Fashion week documentation",
    outcome: "Runway and backstage coverage for Lakmé Fashion Week",
    thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800"
  },
  {
    name: "The Leela Palaces",
    logo: "https://logo.clearbit.com/theleela.com",
    category: "Destination",
    description: "Heritage property wedding",
    outcome: "Full wedding coverage at palatial resort in Udaipur",
    thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800"
  },
  {
    name: "Harper's Bazaar",
    logo: "https://logo.clearbit.com/harpersbazaar.com",
    category: "Celebrity",
    description: "Celebrity engagement shoot",
    outcome: "Exclusive editorial feature for high-profile couple",
    thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800"
  },
  {
    name: "Tarun Tahiliani",
    logo: "https://logo.clearbit.com/taruntahiliani.com",
    category: "Luxury",
    description: "Couture collection campaign",
    outcome: "Luxury brand campaign featuring celebrity models",
    thumbnail: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800"
  },
  {
    name: "ITC Hotels",
    logo: "https://logo.clearbit.com/itchotels.com",
    category: "Destination",
    description: "Multi-venue wedding coverage",
    outcome: "Week-long wedding festivities across multiple ITC properties",
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800"
  }
];

function CollaborationsShowcase() {
  const [selectedBrand, setSelectedBrand] = useState<Collaboration | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
    }
    if (touchStart - touchEnd < -75) {
      // Swiped right
    }
  };

  const featuredCollaborations = collaborations.filter(c => c.featured);
  const regularCollaborations = collaborations.filter(c => !c.featured);

  return (
    <>
      {/* Featured Collaborations */}
      <div className="mb-12 sm:mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <div className="text-xs md:text-sm tracking-widest text-accent/60 mb-2">FEATURED</div>
          <h3 className="text-xl sm:text-2xl md:text-3xl">Signature Collaborations</h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {featuredCollaborations.map((collab, index) => (
            <motion.div
              key={collab.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedBrand(collab)}
              className="group relative cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl aspect-[4/3] bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-500">
                <img
                  src={collab.thumbnail}
                  alt={collab.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Logo overlay */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/20 flex items-center justify-center p-2 sm:p-3">
                  <img
                    src={collab.logo}
                    alt={collab.name}
                    className="w-full h-full object-contain opacity-90"
                  />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="px-2 sm:px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] sm:text-xs backdrop-blur-sm border border-accent/30">
                      {collab.category}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">{collab.name}</h4>
                  <p className="text-xs sm:text-sm md:text-base opacity-80 mb-2 sm:mb-3 line-clamp-2">{collab.description}</p>
                  <p className="text-[10px] sm:text-xs md:text-sm opacity-60 line-clamp-2">{collab.outcome}</p>

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-3 sm:mt-4 text-accent text-xs sm:text-sm hidden md:flex"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Regular Collaborations Grid */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">All Collaborations</h3>
          <p className="text-xs sm:text-sm md:text-base opacity-60">Hover or tap to explore each story</p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {regularCollaborations.map((collab, index) => (
            <motion.div
              key={collab.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedBrand(collab)}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl aspect-square bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-500 p-4 md:p-6 flex items-center justify-center">
                {/* Logo */}
                <img
                  src={collab.logo}
                  alt={collab.name}
                  className="w-full h-16 md:h-20 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-[10px] backdrop-blur-sm border border-accent/30">
                    {collab.category}
                  </span>
                </div>

                {/* Name on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-xs md:text-sm text-center">{collab.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipeable Cards */}
        <div className="md:hidden relative">
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {regularCollaborations.map((collab, index) => (
              <motion.div
                key={collab.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedBrand(collab)}
                className="flex-shrink-0 snap-center w-[240px] sm:w-[280px]"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-white/5 border border-white/10 active:border-accent/50 transition-colors">
                  <img
                    src={collab.thumbnail}
                    alt={collab.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Logo */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 flex items-center justify-center p-2">
                    <img
                      src={collab.logo}
                      alt={collab.name}
                      className="w-full h-full object-contain opacity-90"
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <span className="inline-block px-2 py-1 rounded-full bg-accent/20 text-accent text-xs backdrop-blur-sm border border-accent/30 mb-2">
                      {collab.category}
                    </span>
                    <h4 className="text-base sm:text-lg mb-2">{collab.name}</h4>
                    <p className="text-xs opacity-70 line-clamp-2">{collab.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-4 w-4 sm:w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-4 sm:w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBrand(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-background/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBrand(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden">
                  <img
                    src={selectedBrand.thumbnail}
                    alt={selectedBrand.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                  {/* Logo */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 flex items-center justify-center p-3 sm:p-4 mb-4 sm:mb-6">
                    <img
                      src={selectedBrand.logo}
                      alt={selectedBrand.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Category */}
                  <span className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/20 text-accent text-[10px] sm:text-xs backdrop-blur-sm border border-accent/30 mb-3 sm:mb-4 w-fit">
                    {selectedBrand.category}
                  </span>

                  {/* Name */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">{selectedBrand.name}</h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg md:text-xl opacity-80 mb-4 sm:mb-6">{selectedBrand.description}</p>

                  {/* Outcome */}
                  <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="text-[10px] sm:text-xs tracking-widest text-accent mb-1.5 sm:mb-2">OUTCOME</div>
                    <p className="text-xs sm:text-sm md:text-base opacity-90">{selectedBrand.outcome}</p>
                  </div>

                  {/* CTA */}
                  <button className="flex items-center gap-2 text-accent text-xs sm:text-sm hover:gap-3 transition-all">
                    <span>View Full Case Study</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllPortfolio, setShowAllPortfolio] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<typeof portfolioItems[0] | null>(null);

  useEffect(() => {
    if (selectedPortfolioItem?.media_type === "video" && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, [selectedPortfolioItem]);

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
    }
  ];

  const [portfolioItems,setportfolioItems] = useState([])
  const [page,setpage] = useState(1)
  const [totalpage,settotalpage] = useState(1)
  const [pageLoading,setpageloading] = useState(false)

const cacheRef = useRef({});

useEffect(() => {
  const fetchImages = async () => {
    const key = `${activeFilter}-${page}`;
    const cache = cacheRef.current;

    setpageloading(true)

    // ✅ Use cache
    if (cache[key]) {
      if (page === 1) {
        setportfolioItems(cache[key]);
      } else {
        setportfolioItems(prev => [...prev, ...cache[key]]);
      }
      return;
    }

    // ❗ Fetch
    const response = await getHomepagemages(page, activeFilter);

    settotalpage(response.data.totalPages);

    const urls = await attachPreviewUrls(response?.data?.data);
    console.log(urls)

    // Save to cache
    cacheRef.current[key] = urls;

    if (page === 1) {
      setportfolioItems(urls);
    } else {
      setportfolioItems(prev => [...prev, ...urls]);
    }

    setpageloading(false)
  };

  fetchImages();
}, [page, activeFilter]);
  // const portfolioItems = [
  //   { variant_type: "Modeling", type: "image", image: "https://images.unsplash.com/photo-1646105659698-1389145bf6a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWwlMjBwb3J0cmFpdCUyMHN0dWRpb3xlbnwxfHx8fDE3NzU5NDczMDR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  //   { variant_type: "Commercial", type: "video", video: "https://filestorage.35cbfc65bfded3ac6edb95cd26fa5e24.r2.cloudflarestorage.com/uploads/1777007692901-A_0049C268A250909_205921EJ_CANON.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=c48cb9dd3639baccae9081905577c30b%2F20260424%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260424T071450Z&X-Amz-Expires=3600&X-Amz-Signature=85b9105a125c59aa83b4ddbde195d4b782d6caa66bbb2fb13dc28022cfcd5f2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject" },
  //   { variant_type: "Events", type: "image", image: "https://images.unsplash.com/photo-1758390851225-63cbe6306f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbiUyMGJlaGluZCUyMHRoZSUyMHNjZW5lc3xlbnwxfHx8fDE3NzU5NDczMDR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  //   { variant_type: "Modeling", type: "video", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", },
  //   { variant_type: "Commercial", type: "image", image: "https://images.unsplash.com/photo-1745848038063-bbb6fc8c8867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzU5NDczMDV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  //   { variant_type: "Modeling", type: "video", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", },
  //   { variant_type: "Events", type: "video", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800" },
  //   { variant_type: "Commercial", type: "image", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800" },
  //   { variant_type: "Modeling", type: "video", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"},
  //   { variant_type: "Events", type: "image", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800" },
  //   { variant_type: "Commercial", type: "video", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
  //   { variant_type: "Modeling", type: "image", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800" }
  // ];


   
  
  const processSteps = [
    { number: "01", title: "Client Onboarding", description: "Understanding your vision, goals, and creative direction." },
    { number: "02", title: "Moodboard & Planning", description: "Collaborative visual planning to align on aesthetic and approach." },
    { number: "03", title: "Shoot Execution", description: "Professional production with meticulous attention to detail." },
    { number: "04", title: "Editing Pipeline", description: "Post-production refinement to deliver cinematic quality." },
    { number: "05", title: "Delivery & Access", description: "Organized delivery system with ongoing client access." }
  ];

  const filteredPortfolio = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.variant_type === activeFilter);

  const displayedPortfolio = showAllPortfolio ? filteredPortfolio : filteredPortfolio;

 

  return (
    <div className="relative bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 flex items-center justify-between backdrop-blur-sm bg-background/80"
      >
        <Link to="/" className="text-xl md:text-2xl tracking-tight">Midori Media</Link>
        <div className="flex gap-4 md:gap-8 items-center">
          <a href="#portfolio" className="hidden sm:block text-sm opacity-70 hover:opacity-100 transition-opacity">Portfolio</a>
          <a href="#services" className="hidden sm:block text-sm opacity-70 hover:opacity-100 transition-opacity">Services</a>
          <a href="#process" className="hidden md:block text-sm opacity-70 hover:opacity-100 transition-opacity">Process</a>
          <Link to="/booking" className="bg-accent px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm hover:bg-accent/90 transition-colors rounded-full">
            Book a Shoot
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
              <button className="bg-accent px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 rounded-full">
                View Portfolio <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
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
            {services.map((service, index) => (
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
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="portfolio" className="py-16 md:py-24 lg:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-3 md:mb-4">SELECTED WORK</div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl">Portfolio</h2>
              <div className="flex gap-2 md:gap-4 flex-wrap">
                {["All", "Modelling", "Events", "Marketing"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setShowAllPortfolio(false);
                      setpage(1);
setportfolioItems([]);
                    }}
                    className={`text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 transition-colors ${
                      activeFilter === filter
                        ? "text-accent border-b border-accent"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {
            pageLoading? 
          <PortfolioSkeleton/>
            :
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {displayedPortfolio.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPortfolioItem(item)}
                className="relative aspect-[3/4] overflow-hidden group cursor-pointer rounded-xl md:rounded-2xl"
              >
                {item.media_type === "video" ? (
                  <>
                    <video
                      preload="metadata"
                      muted
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                      className="w-full h-full object-cover"
                    >
                      <source src={item.url} type="video/mp4" />
                    </video>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2">
                      <Video className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </>
                ) : (
                  <img
                    src={item.url}
                    alt={item.variant_type}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-8">
                  <div className="text-xs md:text-sm tracking-widest">{item.variant_type}</div>
                </div>
              </motion.div>
            ))}
          </div>
          }
          
         

          {totalpage > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12 md:mt-16"
            >
              <button
                onClick={() => {
                  if(page < totalpage) {
                    setpage(page + 1)
                  }
                  else{
                    setpage(1)
                  }
                }}
                className="border border-accent text-accent px-6 md:px-8 py-3 md:py-4 text-sm md:text-base hover:bg-accent hover:text-background transition-colors rounded-full"
              >
                {page === totalpage ? "Show Less" : `Show More`}
              </button>
            </motion.div>
          )}

          {/* Portfolio Preview Modal */}
          <AnimatePresence>
            {selectedPortfolioItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPortfolioItem(null)}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-5xl w-full bg-background/95 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedPortfolioItem(null)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>

                  {/* variant_type Badge */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-accent/20 text-accent text-xs md:text-sm backdrop-blur-sm border border-accent/30">
                      {selectedPortfolioItem.variant_type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-8">
                    {selectedPortfolioItem.media_type === "video" ? (
                      <div className="relative aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden">
                        <video
                          ref={videoRef}
                          key={selectedPortfolioItem.url}
                          controls
                          playsInline
                          className="w-full h-full"
                          src={selectedPortfolioItem.url}
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={selectedPortfolioItem.url}
                          alt={selectedPortfolioItem.variant_type}
                          className="w-full h-auto max-h-[80vh] object-contain rounded-xl md:rounded-2xl"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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

      {/* Testimonials */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-8 md:mb-12">CLIENT FEEDBACK</div>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-12">
              <div className="border border-white/10 p-6 md:p-12 rounded-2xl md:rounded-3xl">
                <p className="text-base md:text-xl mb-6 md:mb-8 leading-relaxed opacity-90">
                  "The process was seamless from start to finish. Midori Media delivered exactly what we envisioned—with a level of professionalism that's rare to find."
                </p>
                <div className="text-xs md:text-sm opacity-60">— Sarah Chen, Brand Director</div>
              </div>
              <div className="border border-white/10 p-6 md:p-12 rounded-2xl md:rounded-3xl">
                <p className="text-base md:text-xl mb-6 md:mb-8 leading-relaxed opacity-90">
                  "They didn't just take photos—they captured the essence of our campaign. The attention to detail and creative direction was outstanding."
                </p>
                <div className="text-xs md:text-sm opacity-60">— Marcus Johnson, Creative Lead</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collaborations That Define Our Craft */}
      <section className="relative py-24 md:py-32 lg:py-40 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="text-xs md:text-sm tracking-widest text-accent mb-4 md:mb-6 uppercase">Collaborations That Define Our Craft</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8 leading-tight max-w-4xl mx-auto">
              From Intimate Weddings to Large-Scale Productions
            </h2>

            {/* Dynamic Stats Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 md:mb-16"
            >
              {[
                { number: "150+", label: "Weddings" },
                { number: "20+", label: "Cities" },
                { number: "5", label: "Countries" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl text-accent mb-2">{stat.number}</div>
                  <div className="text-xs md:text-sm opacity-60 tracking-widest uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {["All", "Luxury", "Destination", "Celebrity", "Corporate"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm transition-all ${
                    activeFilter === filter
                      ? "bg-accent text-background"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Brand Showcase */}
          <CollaborationsShowcase />
        </div>

        {/* Subtle Divider */}
        <div className="max-w-7xl mx-auto mt-20 md:mt-32">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
              <p className="text-xs md:text-sm opacity-60">Premium creative production</p>
            </div>
            <div>
              <h4 className="text-xs md:text-sm tracking-widest mb-3 md:mb-4 opacity-60">SERVICES</h4>
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Photography</div>
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Videography</div>
                <div className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">Modeling Portfolios</div>
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