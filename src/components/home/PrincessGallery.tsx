'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrincessGalleryProps {
  recipientName: string;
  onBack: () => void;
}

// Gallery photos with varying layouts
const galleryPhotos = [
  { id: 1, title: 'Golden Hour Glow', src: 'https://images.unsplash.com/photo-1541963463532-d6487a77a4d0?w=600&h=800&fit=crop', size: 'large' },
  { id: 2, title: 'Confident Smile', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop', size: 'medium' },
  { id: 3, title: 'Dreamy Portrait', src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop', size: 'small' },
  { id: 4, title: 'Magic Moments', src: 'https://images.unsplash.com/photo-1511888586535-73b238f3c4d4?w=600&h=400&fit=crop', size: 'large' },
  { id: 5, title: 'Warm Embrace', src: 'https://images.unsplash.com/photo-1519183071298-a2962e70b574?w=500&h=600&fit=crop', size: 'medium' },
  { id: 6, title: 'Joyful Laughter', src: 'https://images.unsplash.com/photo-1496346122103-552a85a9ca70?w=400&h=500&fit=crop', size: 'small' },
  { id: 7, title: 'Serene Moment', src: 'https://images.unsplash.com/photo-1522199655827-d32956ce9e0c?w=500&h=600&fit=crop', size: 'medium' },
  { id: 8, title: 'Starlit Dreams', src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop', size: 'large' },
];

export default function PrincessGallery({ recipientName, onBack }: PrincessGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      {/* Background with film grain texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-blush-pink-50 to-champagne-100" />

      {/* Film grain effect */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svgument,1%25,2%25,3%25,0.5%25,0.75%25,1.25%25,0%25,1.5%25,2.25%25,0.75%25,3%25,0%25,1%25,2%25,0.5%25")`,
        backgroundSize: '100px 100px',
      }} />

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
          Princess Gallery
        </motion.h1>

        <div className="w-24">
          <Button
            onClick={() => setShowSearch(!showSearch)}
            variant="ghost"
            size="sm"
            className="text-warm-brown-600 hover:text-primary-500"
          >
            <Search size={20} />
          </Button>
        </div>
      </div>

      {/* Masonry/tile gallery */}
      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {galleryPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="group cursor-pointer"
            onClick={() => setSelectedPhoto(index)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative">
              {/* Polaroid frame with film border */}
              <div
                className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 group-hover:shadow-3xl"
                style={{
                  clipPath: photo.size === 'large'
                    ? 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)'
                    : 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Film sprocket holes effect */}
                {photo.size === 'large' && (
                  <div className="absolute top-2 left-2 right-2 h-2 flex justify-between items-center">
                    <div className="grid grid-cols-4 gap-0.5">
                      <div className="w-1 h-full bg-gray-300 rounded-full" />
                      <div className="w-1 h-full bg-gray-300 rounded-full" />
                      <div className="w-1 h-full bg-gray-300 rounded-full" />
                      <div className="w-1 h-full bg-gray-300 rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Caption overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
              >
                <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                  <h3 className="font-serif text-sm font-medium">{photo.title}</h3>
                </div>
              </motion.div>

              {/* Heart icon on hover */}
              <motion.div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.2 }}
              >
                <Heart size={24} fill="currentColor" className="text-pink-300" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Full screen lightbox */}
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
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 5 }}
              transition={{ duration: 0.5, type: 'spring' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={galleryPhotos[selectedPhoto].src.replace('w=400&h=500', 'w=1200&h=1600')}
                  alt={galleryPhotos[selectedPhoto].title}
                  className="w-full h-64 md:h-96 object-cover"
                />

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 text-3xl">🌸</div>
                <div className="absolute top-4 right-4 text-3xl">💖</div>
                <div className="absolute bottom-4 left-4 text-3xl">⭐</div>
                <div className="absolute bottom-4 right-4 text-3xl">💕</div>

                {/* Close button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all"
                >
                  <div className="w-5 h-5 flex items-center justify-center text-warm-brown-600">
                    ✕
                  </div>
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-serif text-warm-brown-700 mb-2">
                  {galleryPhotos[selectedPhoto].title}
                </h2>
                <p className="text-warm-brown-500 font-body">
                  A beautiful memory preserved in this special collection.
                </p>

                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    onClick={() => setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : galleryPhotos.length - 1)}
                    variant="outline"
                    className="border-2 border-primary-300 text-primary-600 hover:bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center"
                  >
                    ‹
                  </Button>
                  <Button
                    onClick={() => setSelectedPhoto(selectedPhoto < galleryPhotos.length - 1 ? selectedPhoto + 1 : 0)}
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