'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrapbookSectionProps {
  recipientName: string;
  onBack: () => void;
}

// Sample photos with placeholder images
const samplePhotos = [
  {
    id: 1,
    title: 'Special Memory',
    caption: 'A beautiful moment we cherish together',
    src: 'https://images.unsplash.com/photo-1522199655827-d32956ce9e0c?w=400&h=500&fit=crop',
    angle: -2,
  },
  {
    id: 2,
    title: 'Happy Times',
    caption: 'Laughing through the years',
    src: 'https://images.unsplash.com/photo-1511888586535-73b238f3c4d4?w=400&h=500&fit=crop',
    angle: 2,
  },
  {
    id: 3,
    title: 'Sweet Moments',
    caption: 'Cozy afternoons and warm hugs',
    src: 'https://images.unsplash.com/photo-1496346122103-552a85a9ca70?w=400&h=500&fit=crop',
    angle: -3,
  },
  {
    id: 4,
    title: 'Dreamy Days',
    caption: 'When the world feels like magic',
    src: 'https://images.unsplash.com/photo-1519183071298-a2962e70b574?w=400&h=500&fit=crop',
    angle: 3,
  },
  {
    id: 5,
    title: 'Joyful Moments',
    caption: 'Every smile tells a story',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
    angle: -1,
  },
  {
    id: 6,
    title: 'Precious Memories',
    caption: 'Captured in time forever',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
    angle: 1,
  },
];

export default function ScrapbookSection({ recipientName, onBack }: ScrapbookSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showFullGallery, setShowFullGallery] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-scrapbook-paper" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 z-10 relative">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xs shadow-md hover:bg-white transition-all duration-300"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} className="text-primary-500" />
          <span className="font-body text-sm">Back</span>
        </motion.button>

        <motion.h1
          className="text-3xl font-serif text-warm-brown-700 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Little Scrapbook
        </motion.h1>

        <div className="w-24" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Polaroid photo grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {samplePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="relative cursor-pointer group"
              onClick={() => setSelectedPhoto(index)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: photo.angle * 0.5 }}
            >
              <div
                className="absolute -top-2 -right-2 -bottom-2 -left-2 bg-white rounded-[1.5rem] shadow-2xl flex flex-col items-center justify-center p-4 polaroid-shadow group-hover:shadow-3xl transition-shadow duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-32 md:h-40 object-cover rounded-lg mb-3"
                />
                <div className="text-center">
                  <h3 className="font-serif text-sm text-warm-brown-600 font-medium">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-warm-brown-400 mt-1 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Decorations */}
              <div className="absolute -top-4 -right-4 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                💖
              </div>
              <div className="absolute -bottom-4 -left-4 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                🌸
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sticker decorations */}
        <div className="absolute top-20 -left-10 text-4xl opacity-20">📎</div>
        <div className="absolute bottom-20 -right-10 text-4xl opacity-20">🎀</div>
        <div className="absolute top-40 -right-5 text-3xl opacity-25">⭐</div>
        <div className="absolute bottom-40 -left-5 text-3xl opacity-25">💕</div>

        {/* View all button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button
            onClick={() => setShowFullGallery(true)}
            className="px-8 py-3 font-body bg-gradient-to-r from-primary-400 to-secondary-500 hover:from-primary-500 hover:to-secondary-600 rounded-full shadow-lg"
          >
            View Full Gallery
          </Button>
        </motion.div>
      </div>

      {/* Full screen photo view */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={samplePhotos[selectedPhoto].src.replace('w=400&h=500', 'w=800&h=1000')}
                  alt={samplePhotos[selectedPhoto].title}
                  className="w-full h-64 md:h-96 object-cover"
                />

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 text-3xl">🌸</div>
                <div className="absolute top-4 right-4 text-3xl">💖</div>
                <div className="absolute bottom-4 left-4 text-3xl">⭐</div>
                <div className="absolute bottom-4 right-4 text-3xl">💕</div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-serif text-warm-brown-700 mb-2">
                  {samplePhotos[selectedPhoto].title}
                </h2>
                <p className="text-warm-brown-500 font-body">
                  {samplePhotos[selectedPhoto].caption}
                </p>

                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    onClick={() => setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : samplePhotos.length - 1)}
                    variant="outline"
                    className="border-2 border-primary-300 text-primary-600 hover:bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center"
                  >
                    ‹
                  </Button>
                  <Button
                    onClick={() => setSelectedPhoto(selectedPhoto < samplePhotos.length - 1 ? selectedPhoto + 1 : 0)}
                    variant="outline"
                    className="border-2 border-primary-300 text-primary-600 hover:bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center"
                  >
                    ›
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}