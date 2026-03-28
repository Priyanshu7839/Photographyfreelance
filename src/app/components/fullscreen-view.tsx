import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Download, Heart } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GalleryImage {
  id: string;
  url: string;
  photographerName: string;
  albumName: string;
  mediaType?: "image" | "video";
  thumbnail?: string;
}

interface FullscreenViewProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function FullscreenView({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: FullscreenViewProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentImage = images[currentIndex];
  const isVideo = currentImage.mediaType === "video";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1);
      // Space bar to play/pause video
      if (e.key === " " && isVideo && videoRef.current) {
        e.preventDefault();
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate, isVideo]);

  // Reset video when changing media
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Image Counter */}
        <div className="absolute top-6 left-6 text-white text-sm z-10">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Actions */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`w-12 h-12 rounded-md backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-colors ${
              isFavorited ? "bg-red-500 hover:bg-red-600" : "bg-white/10"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isFavorited ? "fill-white" : ""} text-white`}
            />
          </button>
          
          <button
            onClick={() => {
              // Handle download
            }}
            className="w-12 h-12 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Navigation - Left */}
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-6 w-12 h-12 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Navigation - Right */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-6 w-12 h-12 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={currentImage.url}
              className="max-w-full max-h-[90vh] object-contain"
              controls
            />
          ) : (
            <ImageWithFallback
              src={currentImage.url}
              alt={currentImage.albumName}
              className="max-w-full max-h-[90vh] object-contain"
            />
          )}
        </motion.div>

        {/* Image Info */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-white">
          <p className="text-sm">{currentImage.photographerName}</p>
          <p className="text-xs text-white/70 mt-1">{currentImage.albumName}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}