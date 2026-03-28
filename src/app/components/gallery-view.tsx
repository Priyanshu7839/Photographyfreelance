import { motion } from "motion/react";
import { useState } from "react";
import { ImageCard } from "./image-card";
import { FullscreenView } from "./fullscreen-view";

interface GalleryImage {
  id: string;
  url: string;
  photographerName: string;
  albumName: string;
}

export function GalleryView() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const images: GalleryImage[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1767986012138-4893f40932d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc3NDMyNDg2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Ceremony",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1700639491303-a177c4402501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NDA5MjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Portraits",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1704455305845-d5f66a560e6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmlyc3QlMjBraXNzfGVufDF8fHx8MTc3NDQyNzk1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Ceremony",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1664312696723-173130983e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMGZsb3dlcnN8ZW58MXx8fHwxNzc0NDAxMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Details",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1773913106047-d8e205a63e4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nc3xlbnwxfHx8fDE3NzQ0Mjc5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Reception",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1606203947280-002271a37eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBjbG9zZXVwfGVufDF8fHx8MTc3NDMzMzM2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Details",
    },
    {
      id: "7",
      url: "https://images.unsplash.com/photo-1771543795929-a2ef9bc938b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHByZXBhcmF0aW9uJTIwZGV0YWlsc3xlbnwxfHx8fDE3NzQ0Mjc5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Preparation",
    },
    {
      id: "8",
      url: "https://images.unsplash.com/photo-1737404611018-a970976cf747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMGdyb29tJTIwc3Vuc2V0fGVufDF8fHx8MTc3NDQyNzg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Portraits",
    },
    {
      id: "9",
      url: "https://images.unsplash.com/photo-1571332760709-8943098311f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBhaXNsZXxlbnwxfHx8fDE3NzQ0Mjc5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Ceremony",
    },
    {
      id: "10",
      url: "https://images.unsplash.com/photo-1584158531319-96912adae663?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzc0NDAxMjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Reception",
    },
    {
      id: "11",
      url: "https://images.unsplash.com/photo-1677768062274-fdd45caac233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZGV0YWlsc3xlbnwxfHx8fDE3NzQ0Mjc4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Reception",
    },
    {
      id: "12",
      url: "https://images.unsplash.com/photo-1770135005596-e2de4de3c583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGFuY2UlMjByb21hbnRpY3xlbnwxfHx8fDE3NzQ0Mjc4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      photographerName: "Sarah Chen",
      albumName: "Reception",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            index={index}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </motion.div>

      {selectedImageIndex !== null && (
        <FullscreenView
          images={images}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </>
  );
}
