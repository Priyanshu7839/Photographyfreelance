import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getHomepageFolderImages, getHomepageFolders } from "../../Utils/Apicalls";
import { toast } from "sonner";

type PortfolioImage = {
  url: string;
  caption?: string;
};

type PortfolioFolder = {
  id: string;
  name: string;
  coverImage: string;
  location?: string;
  eventType?: string;
  year?: string;
  images: PortfolioImage[];
};


// Pinterest-style skeleton heights in px — varied to mimic masonry boards
const SKELETON_HEIGHTS_PX = [256, 320, 208, 288, 240, 352];

function PinterestSkeleton({ index }: { index: number }) {
  const heightPx = SKELETON_HEIGHTS_PX[index % SKELETON_HEIGHTS_PX.length];
  return (
    <div className="flex flex-col gap-2.5">
      {/* Card block */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          height: heightPx,
          background: "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.03) 100%)",
        }}
      >
        {/* shimmer sweep */}
        <div
          className="absolute inset-0 animate-[pinterest-shimmer_1.8s_ease-in-out_infinite]"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
            animationDelay: `${index * 0.15}s`,
          }}
        />
      </div>

      {/* Title text bar */}
      <div
        className="h-3.5 rounded-full bg-white/[0.06] overflow-hidden relative"
        style={{ width: `${55 + ((index * 17) % 35)}%` }}
      >
        <div
          className="absolute inset-0 animate-[pinterest-shimmer_1.8s_ease-in-out_infinite]"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
            animationDelay: `${index * 0.15 + 0.1}s`,
          }}
        />
      </div>

      {/* Subtitle bar */}
      <div
        className="h-2.5 rounded-full bg-white/[0.04] overflow-hidden relative"
        style={{ width: `${35 + ((index * 11) % 25)}%` }}
      >
        <div
          className="absolute inset-0 animate-[pinterest-shimmer_1.8s_ease-in-out_infinite]"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
            animationDelay: `${index * 0.15 + 0.2}s`,
          }}
        />
      </div>
    </div>
  );
}

function CarouselSkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
      {/* main card skeleton */}
      <div className="w-[85%] sm:w-[75%] md:w-[60%] aspect-[3/2] rounded-xl md:rounded-2xl bg-white/5 border-2 border-white/10 overflow-hidden relative">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 to-transparent" />
      </div>
      {/* caption skeleton */}
      <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />
      {/* progress bar skeleton */}
      <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/20">
        <div className="h-3 w-6 rounded bg-white/20 animate-pulse" />
        <div className="w-24 h-px bg-white/20" />
        <div className="h-3 w-6 rounded bg-white/20 animate-pulse" />
      </div>
    </div>
  );
}
const portfolioFolders: PortfolioFolder[] = [
  {
    id: "events",
    name: "Events",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    location: "Weddings & Celebrations",
    eventType: "Photography & Videography",
    year: "2024-2025",
    images: [
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200", caption: "Destination Wedding" },
      { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200", caption: "Bridal Portraits" },
      { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200", caption: "Palace Ceremonies" },
      { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200", caption: "Reception Coverage" },
      { url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200", caption: "Celebration Moments" },
      { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200", caption: "Traditional Rituals" },
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200", caption: "Beach Weddings" },
      { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200", caption: "Evening Celebrations" }
    ]
  },
  {
    id: "modelling",
    name: "Modelling",
    coverImage: "https://images.unsplash.com/photo-1646105659698-1389145bf6a0?w=800",
    location: "Fashion & Editorial",
    eventType: "Studio & Outdoor",
    year: "2024-2025",
    images: [
      { url: "https://images.unsplash.com/photo-1646105659698-1389145bf6a0?w=1200", caption: "Fashion Editorial" },
      { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200", caption: "Studio Portraits" },
      { url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200", caption: "Commercial Shoots" },
      { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200", caption: "Lifestyle Photography" },
      { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200", caption: "Creative Concepts" },
      { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200", caption: "Outdoor Sessions" }
    ]
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    coverImage: "https://images.unsplash.com/photo-1745848038063-bbb6fc8c8867?w=800",
    location: "Brand Campaigns",
    eventType: "Social Media Content",
    year: "2024-2025",
    images: [
      { url: "https://images.unsplash.com/photo-1745848038063-bbb6fc8c8867?w=1200", caption: "Brand Photography" },
      { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200", caption: "Product Shoots" },
      { url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200", caption: "Social Media Content" },
      { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200", caption: "Campaign Visuals" },
      { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200", caption: "Marketing Materials" }
    ]
  },
  {
    id: "commercial",
    name: "Commercial",
    coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    location: "Corporate & Business",
    eventType: "Professional Photography",
    year: "2024-2025",
    images: [
      { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200", caption: "Corporate Events" },
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200", caption: "Business Portraits" },
      { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200", caption: "Professional Headshots" },
      { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200", caption: "Conference Coverage" },
      { url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200", caption: "Brand Documentation" }
    ]
  },
  {
    id: "portfolio-shoots",
    name: "Portfolio Shoots",
    coverImage: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800",
    location: "Model Portfolios",
    eventType: "Actor & Talent",
    year: "2024-2025",
    images: [
      { url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200", caption: "Model Portfolio" },
      { url: "https://images.unsplash.com/photo-1646105659698-1389145bf6a0?w=1200", caption: "Actor Headshots" },
      { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200", caption: "Talent Showcase" },
      { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200", caption: "Professional Portraits" },
      { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200", caption: "Creative Sessions" },
      { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200", caption: "Portfolio Development" }
    ]
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
    location: "Personal & Family",
    eventType: "Lifestyle Photography",
    year: "2024-2025",
    images: [
      { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200", caption: "Family Moments" },
      { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200", caption: "Personal Stories" },
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200", caption: "Lifestyle Sessions" },
      { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200", caption: "Candid Photography" }
    ]
  }
];

export default function PortfolioFolders() {
  const [selectedFolder, setSelectedFolder] = useState<PortfolioFolder | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<PortfolioImage | null>(null);



const [folders, setFolders] =
  useState([]);

const [
  pendingFolders,
  setPendingFolders,
] = useState(null);

const [
  foldersLoading,
  setFoldersLoading,
] = useState(false);


let folderLoaded = false

const preloadFolders =
  async (
    nextFolders
  ) => {
    const images =
      nextFolders.map(
        (folder) =>
          new Promise(
            (resolve) => {
              const img =
                new Image();

              img.src =
                folder.image_url;

              img.onload =
                resolve;

              img.onerror =
                resolve;
            }
          )
      );

    await Promise.all(
      images
    );

    setFolders(
      nextFolders
    );
  };


const fetchHomepageFolders =
  async () => {
    try {
     

    if(!folderLoaded){
    setFoldersLoading(true)

    }

      const response =
        await getHomepageFolders();

      await preloadFolders(
        response.data
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setFoldersLoading(false);
      folderLoaded=true
    }
  };



  useEffect(() => {
  fetchHomepageFolders();

  const interval =
    setInterval(() => {
      fetchHomepageFolders();
    }, 5000);

  return () =>
    clearInterval(
      interval
    );
}, []);
  const [
  folderImages,
  setFolderImages,
] = useState([]);

const fetchFolderImages =
  async (
    variantType
  ) => {
    try {
      const response =
        await getHomepageFolderImages(
          variantType
        );

      setFolderImages(
        response
      );
    } catch (error) {
      toast.error(
        error.message
      );
    }
  };

  const openFolder = (folder: PortfolioFolder) => {
    setSelectedFolder(folder);
    setCarouselIndex(0);
  };

  const closeFolder = () => {
    setSelectedFolder(null);
    setCarouselIndex(0);
  };

  const openLightbox = (image: PortfolioImage) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    if (folderImages) {
      setCarouselIndex((prev) => (prev + 1) % folderImages?.total_images);
    }
  };

  const prevImage = () => {
    if (selectedFolder) {
      setCarouselIndex((prev) => (prev - 1 + folderImages?.total_images) % folderImages?.total_images);
    }
  };

  const nextLightbox = () => {
    if (folderImages && lightboxImage) {
      const currentIdx = folderImages?.data.findIndex(img => img.image_url === lightboxImage);
       const prevIdx = (currentIdx + 1 + folderImages?.total_images) % folderImages?.total_images;
      setLightboxImage(folderImages?.data[prevIdx]?.image_url);
    
    }
  };

  const prevLightbox = () => {
    if (folderImages && lightboxImage) {
      const currentIdx = folderImages?.data?.findIndex(img => img.image_url === lightboxImage);
      const prevIdx = (currentIdx - 1 + folderImages?.total_images) % folderImages?.total_images;
      setLightboxImage(folderImages?.data[prevIdx]?.image_url);
    }
  };

  const getCarouselPosition = (index: number) => {
    const diff = index - carouselIndex;
    const absIndex = Math.abs(diff);

    const translateX = diff * 45;
    const translateZ = -absIndex * 200;
    const rotateY = diff * 15;
    const opacity = Math.max(0.3, 1 - absIndex * 0.3);
    const scale = Math.max(0.7, 1 - absIndex * 0.15);
    const blur = absIndex > 0 ? absIndex * 1.5 : 0;

    return {
      transform: `
        perspective(1500px)
        translateX(${translateX}%)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: 100 - absIndex
    };
  };

  

  return (
    <div>
      {/* Level 1: Folder Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
     {   foldersLoading?Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="break-inside-avoid mb-4 md:mb-5"
              >
                <PinterestSkeleton index={i} />
              </motion.div>
            )):
  folders?.map((folder, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => {
        openFolder(folder);
        fetchFolderImages(folder.variant_type);
      }}
      className="group cursor-pointer break-inside-avoid mb-4"
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10 group-hover:border-accent/40 transition-all duration-300">
        
        <img
          src={folder.cover_image}
          alt={folder.variant_type}
          loading="lazy"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium truncate pr-2">
              {folder.variant_type}
            </h3>

            <span className="text-xs opacity-70 whitespace-nowrap">
              {folder.number_of_images}{" "}
              {folder.number_of_images === 1 ? "Photo" : "Photos"}
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  ))}
</div>

      {/* Level 2: 3D Carousel Modal */}
      <AnimatePresence>
        {selectedFolder && !lightboxImage && folderImages &&(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={closeFolder}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Folder Title */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-50">
              <h2 className="text-xl md:text-2xl lg:text-3xl">{folderImages.variant_type}</h2>
              <div className="text-xs md:text-sm opacity-60 mt-1">
                {folderImages?.total_images} {folderImages?.total_images === 1 ? 'Photo' : 'Photos'}
              </div>
            </div>

            {/* 3D Carousel Container */}
            <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
              <div
                className="relative w-full max-w-5xl h-[60vh] md:h-[70vh]"
                style={{ perspective: '1500px' }}
              >
                {folderImages?.data?.map((image, index) => {
                  const position = getCarouselPosition(index);
                  const isActive = index === carouselIndex;

                  return (
                    <motion.div
                      key={image?.id}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[75%] md:w-[60%] cursor-pointer"
                      style={{
                        ...position,
                        transformStyle: 'preserve-3d',
                        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onClick={() => isActive && openLightbox(image?.image_url)}
                    >
                      <div className={`
                        relative rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-500
                        ${isActive ? 'border-accent/60 shadow-2xl shadow-accent/20' : 'border-white/10'}
                      `}>
                        <img
                          src={image?.image_url}
                          alt={image?.id || ''}
                          loading="lazy"
                          className="w-full h-auto object-contain max-h-[60vh] md:max-h-[70vh]"
                        />

                        {/* {isActive && image.caption && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6"
                          >
                            <p className="text-sm md:text-base lg:text-lg">{image.caption}</p>
                          </motion.div>
                        )} */}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Progress Indicator */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-sm md:text-base">{carouselIndex + 1}</span>
              <div className="w-16 md:w-24 h-px bg-white/20">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${((carouselIndex + 1) / folderImages?.total_images) * 100}%` }}
                />
              </div>
              <span className="text-sm md:text-base opacity-60">{folderImages?.total_images}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level 3: Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl max-h-[90vh] w-full"
            >
              <img
                src={lightboxImage}
                alt={lightboxImage || ''}
                className="w-full h-auto max-h-[90vh] object-contain rounded-xl md:rounded-2xl"
              />

              {lightboxImage.caption && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 rounded-b-xl md:rounded-b-2xl"
                >
                  <p className="text-base md:text-lg lg:text-xl text-center">{lightboxImage.caption}</p>
                </motion.div>
              )}
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
