'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, ZoomIn, Film } from 'lucide-react';

interface PrincessGalleryProps {
  recipientName: string;
  onBack: () => void;
}

// Aesthetic portraiture photos with Pinterest scrapbook notes & polaroid angles
const galleryPhotos = [
  {
    id: 1,
    title: 'Golden Hour Glow',
    date: 'Plate 01 • Summer Archive',
    src: 'https://images.unsplash.com/photo-1541963463532-d6487a77a4d0?w=800&h=1000&fit=crop',
    aspect: 'tall',
    rotation: '-2deg',
    handwritten: 'caught in the golden sun ☼',
    caption: 'Soft sunlight meeting that unmistakable radiant smile.',
  },
  {
    id: 2,
    title: 'Confident Smile',
    date: 'Plate 02 • Editorial Folio',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=700&fit=crop',
    aspect: 'standard',
    rotation: '1.5deg',
    handwritten: 'grace in every detail ♡',
    caption: 'Effortless elegance, exactly as she is every day.',
  },
  {
    id: 3,
    title: 'Dreamy Portrait',
    date: 'Plate 03 • Studio Series',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=700&fit=crop',
    aspect: 'square',
    rotation: '-1deg',
    handwritten: 'the sweetest eyes ✿',
    caption: 'A quiet pause in a world that never stops moving.',
  },
  {
    id: 4,
    title: 'Magic Moments',
    date: 'Plate 04 • Cinematic Cut',
    src: 'https://images.unsplash.com/photo-1511888586535-73b238f3c4d4?w=800&h=600&fit=crop',
    aspect: 'wide',
    rotation: '2deg',
    handwritten: 'favorite memory 🎞️',
    caption: 'Frames you wish you could step right back into.',
  },
  {
    id: 5,
    title: 'Warm Embrace',
    date: 'Plate 05 • Autumn Leaves',
    src: 'https://images.unsplash.com/photo-1519183071298-a2962e70b574?w=700&h=800&fit=crop',
    aspect: 'standard',
    rotation: '-1.5deg',
    handwritten: 'warm tea & sweaters ☕',
    caption: 'Cozy afternoons that feel like coming home.',
  },
  {
    id: 6,
    title: 'Joyful Laughter',
    date: 'Plate 06 • Pure Joy',
    src: 'https://images.unsplash.com/photo-1496346122103-552a85a9ca70?w=600&h=700&fit=crop',
    aspect: 'square',
    rotation: '1deg',
    handwritten: 'my favorite sound ♫',
    caption: 'Unfiltered, spontaneous happiness captured in 35mm.',
  },
  {
    id: 7,
    title: 'Serene Afternoon',
    date: 'Plate 07 • In Full Bloom',
    src: 'https://images.unsplash.com/photo-1522199655827-d32956ce9e0c?w=700&h=800&fit=crop',
    aspect: 'tall',
    rotation: '-2.5deg',
    handwritten: 'a real-life muse ✨',
    caption: 'Proof that poetry doesn’t always need words.',
  },
  {
    id: 8,
    title: 'Starlit Evening',
    date: 'Plate 08 • Nightfall',
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    aspect: 'wide',
    rotation: '1.8deg',
    handwritten: 'forever cherished 🌙',
    caption: 'Under the open sky, making silent wishes for you.',
  },
];

export default function PrincessGallery({ recipientName, onBack }: PrincessGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-14 bg-newspaper-paper text-cocoa-800 relative overflow-x-hidden">
      {/* Outer scrapbook border container */}
      <div className="max-w-6xl mx-auto">
        {/* Gallery Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-burgundy-900/25 pb-6 mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border border-burgundy-900/25 hover:border-burgundy-900/60 bg-ivory-50 text-burgundy-900 rounded-sm text-xs uppercase tracking-widest font-sans transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to Scrapbook</span>
          </button>

          <div className="text-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-vintageGold-600 font-sans block mb-1">
              Chapter II • The Portrait Collection
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-burgundy-900 font-bold">
              The Portrait Gallery
            </h1>
            <p className="font-cormorant italic text-sm text-cocoa-600 mt-1">
              Photographs, 35mm film borders, and little handwritten keepsakes of {recipientName}
            </p>
          </div>

          <div className="text-right text-xs font-serif italic text-cocoa-500 hidden sm:block">
            {galleryPhotos.length} Plates Collected
          </div>
        </div>

        {/* Pinterest-Style Masonry Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              onClick={() => setSelectedPhoto(index)}
              className="group cursor-pointer bg-white p-3.5 pb-5 border border-cocoa-200 shadow-polaroid hover:shadow-2xl transition-all duration-300 relative rounded-xs flex flex-col justify-between"
              style={{ transform: `rotate(${photo.rotation})` }}
              whileHover={{ scale: 1.025, rotate: '0deg', zIndex: 10 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              {/* Washi tape on top corner */}
              <div className="absolute -top-3 left-8 w-20 h-5 washi-tape rotate-[-3deg] z-10 border-x border-cocoa-300/40" />

              <div>
                {/* Vintage Film Frame Header */}
                <div className="flex items-center justify-between text-[10px] font-sans tracking-widest text-cocoa-400 mb-2 uppercase">
                  <span>{photo.date}</span>
                  <Film size={12} className="text-vintageGold-500" />
                </div>

                {/* Photograph with subtle sepia warmth */}
                <div className="overflow-hidden relative bg-cocoa-100">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700 contrast-[103%]"
                  />

                  {/* Zoom hint badge */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white p-1.5 rounded-full backdrop-blur-xs">
                    <ZoomIn size={14} />
                  </div>
                </div>

                {/* Handwritten sticky note note */}
                <div className="mt-3 font-handwriting text-xl text-burgundy-700 leading-tight">
                  {photo.handwritten}
                </div>
              </div>

              {/* Bottom polaroid info */}
              <div className="mt-3 pt-2 border-t border-dashed border-cocoa-200 flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-sm font-semibold text-burgundy-900">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] font-body text-cocoa-500 line-clamp-1">
                    {photo.caption}
                  </p>
                </div>

                <button
                  onClick={(e) => toggleFavorite(photo.id, e)}
                  className={`p-1.5 rounded-full transition-colors ${
                    favorites.has(photo.id) ? 'text-burgundy-600' : 'text-cocoa-400 hover:text-burgundy-600'
                  }`}
                >
                  <Heart size={16} fill={favorites.has(photo.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-burgundy-950/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="bg-ivory-50 border border-burgundy-900/30 max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl p-4 sm:p-6 rounded-sm relative flex flex-col justify-between"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 border border-burgundy-900/20 text-burgundy-900 flex items-center justify-center hover:bg-white text-sm"
              >
                ✕
              </button>

              <div className="relative overflow-hidden bg-cocoa-900 rounded-sm">
                <img
                  src={galleryPhotos[selectedPhoto].src.replace('w=600', 'w=1400').replace('w=700', 'w=1400').replace('w=800', 'w=1400')}
                  alt={galleryPhotos[selectedPhoto].title}
                  className="w-full max-h-[60vh] object-contain mx-auto"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-burgundy-900/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-vintageGold-600 font-sans block">
                    {galleryPhotos[selectedPhoto].date}
                  </span>
                  <h2 className="font-editorial text-2xl text-burgundy-900 font-bold">
                    {galleryPhotos[selectedPhoto].title}
                  </h2>
                  <p className="font-cormorant italic text-base text-cocoa-600">
                    &ldquo;{galleryPhotos[selectedPhoto].caption}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : galleryPhotos.length - 1)
                    }
                    className="px-4 py-2 border border-burgundy-900/20 text-burgundy-900 font-sans text-xs tracking-wider uppercase hover:bg-white rounded-sm"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setSelectedPhoto(selectedPhoto < galleryPhotos.length - 1 ? selectedPhoto + 1 : 0)
                    }
                    className="px-4 py-2 border border-burgundy-900/20 text-burgundy-900 font-sans text-xs tracking-wider uppercase hover:bg-white rounded-sm"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
