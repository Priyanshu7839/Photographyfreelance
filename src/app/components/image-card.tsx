import { motion } from "motion/react";
import { useState } from "react";
import { Maximize2, Heart, Download, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// interface GalleryImage {
//   id: string;
//   url: string;
//   photographerName: string;
//   albumName: string;
//   mediaType?: "image" | "video";
//   thumbnail?: string;
// }

// interface ImageCardProps {
//   image: GalleryImage;
//   index: number;
//   onClick: () => void;
// }

export function ImageCard({ image, index, onClick,selectImageclick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const isVideo = image.media_type === "video";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer group"
      onClick={onClick}
    >
      {/* Media - Image or Video Thumbnail */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="w-full h-full"
      >
        {isVideo ? (
          <video
            src={image.url}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }}
          />
        ) : (
          <ImageWithFallback
            src={image.url}
            alt={image.original_name}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Video Play Icon (shown when not hovered) */}
      {isVideo && !isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-8 h-8 text-black ml-1" fill="black" />
          </div>
        </motion.div>
      )}

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/60 flex flex-col justify-between p-4"
      >

        
        {/* Info */}
        <div className="text-white">
          <p className="text-sm">{image.original_name}</p>
          <p className="text-xs text-white/80 mt-1">{image.albumName}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-10 h-10 rounded-md bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              
            }}
            className={`w-10 h-10 rounded-md backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors ${
              image.selected ? "bg-red-500 hover:bg-red-600" : "bg-white/20"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${image.selected ? "fill-white" : ""} text-white`}
            />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              selectImageclick(e)
            }}
            className="w-10 h-10 rounded-md bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <Download className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}