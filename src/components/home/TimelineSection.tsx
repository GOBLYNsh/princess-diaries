'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Heart, Bookmark, Clock } from 'lucide-react';

interface TimelineSectionProps {
  recipientName: string;
  onBack: () => void;
  onComplete: () => void;
}

// Timeline events with editorial descriptions & aesthetic photo links
const timelineEvents = [
  {
    id: 1,
    chapter: 'CHAPTER I',
    date: 'June 15, 2023',
    title: 'The First Spark of Magic',
    description: 'The very first time we dedicated a whole day to celebrating your royalty. The room felt lighter, the laughs were louder, and something timeless began.',
    photo: 'https://images.unsplash.com/photo-1522199655827-d32956ce9e0c?w=700&h=500&fit=crop',
    handwritten: 'where it all started ✿',
  },
  {
    id: 2,
    chapter: 'CHAPTER II',
    date: 'August 22, 2023',
    title: 'Golden Sunset Adventures',
    description: 'Watching the daylight melt into shades of dusty rose and gold. Just walking together, sharing secrets, and realizing ordinary days are rare treasures with you.',
    photo: 'https://images.unsplash.com/photo-1496346122103-552a85a9ca70?w=700&h=500&fit=crop',
    handwritten: 'the sky matched your warmth ☼',
  },
  {
    id: 3,
    chapter: 'CHAPTER III',
    date: 'December 10, 2023',
    title: 'Winter Wonderland Keepsake',
    description: 'Chilly winds, steaming cups of cocoa, and seeing your breath in the crisp night air. Cold weather never stood a chance against your cozy presence.',
    photo: 'https://images.unsplash.com/photo-1519183071298-a2962e70b574?w=700&h=500&fit=crop',
    handwritten: 'warm hugs in the cold ☕',
  },
  {
    id: 4,
    chapter: 'CHAPTER IV',
    date: 'March 3, 2024',
    title: 'Spring Wildflowers & Laughter',
    description: 'Fresh blossoms everywhere, spontaneous detours, and picking wildflowers just to see your eyes crinkle with delight. Proof that spring follows you.',
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=500&fit=crop',
    handwritten: 'wildflowers blooming for you 🌸',
  },
  {
    id: 5,
    chapter: 'CHAPTER V',
    date: 'May 18, 2024',
    title: 'Dancing in the Afternoon Rain',
    description: 'Puddles on the cobblestones, colorful umbrellas, and laughing until our sides hurt under a warm summer drizzle. Pure, unfiltered cinematic bliss.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=700&h=500&fit=crop',
    handwritten: 'like a classic romantic film 🎞️',
  },
];

export default function TimelineSection({ recipientName, onBack, onComplete }: TimelineSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-14 bg-newspaper-paper text-cocoa-800 relative overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b border-burgundy-900/25 pb-4 mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 border border-burgundy-900/25 hover:border-burgundy-900/60 bg-ivory-50 text-burgundy-900 rounded-sm text-xs uppercase tracking-widest font-sans transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-vintageGold-600 font-sans block">
              Chapter V • The Royal Chronicle
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-burgundy-900 font-bold">
              Memory Timeline
            </h1>
            <p className="font-cormorant italic text-xs sm:text-sm text-cocoa-600 mt-1">
              A chronological retrospective of magical milestones with {recipientName}
            </p>
          </div>

          <button
            onClick={onComplete}
            className="text-xs font-sans uppercase tracking-widest text-burgundy-800 hover:text-burgundy-900 underline underline-offset-4"
          >
            Next: Surprises →
          </button>
        </div>

        {/* Vintage Editorial Spine / Vertical Timeline */}
        <div className="relative pl-6 sm:pl-12 my-10 space-y-12">
          {/* Timeline Center Line */}
          <div className="absolute left-2.5 sm:left-4 top-2 bottom-4 w-px bg-gradient-to-b from-burgundy-900/40 via-vintageGold-500/50 to-burgundy-900/20" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedEvent(index)}
            >
              {/* Timeline Node Badge */}
              <div className="absolute -left-6 sm:-left-12 -translate-x-1/2 top-3 w-6 h-6 rounded-full bg-ivory-50 border-2 border-burgundy-900 flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform">
                <span className="text-[10px] text-vintageGold-700 font-bold font-serif">
                  {index + 1}
                </span>
              </div>

              {/* Event Card (Editorial Scrapbook style) */}
              <div className="bg-ivory-50 border border-burgundy-900/20 p-5 sm:p-7 shadow-editorial hover:shadow-2xl transition-all duration-300 rounded-sm hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-burgundy-900/15 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-vintageGold-700 font-medium">
                    <span>{event.chapter}</span>
                    <span>•</span>
                    <span className="text-cocoa-500">{event.date}</span>
                  </div>
                  <span className="font-handwriting text-base text-dusty-rose-600">
                    {event.handwritten}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7">
                    <h3 className="font-editorial text-2xl text-burgundy-900 font-bold mb-3 group-hover:text-burgundy-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="font-cormorant text-lg text-cocoa-700 leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <span className="text-xs uppercase tracking-wider text-burgundy-800 font-sans font-medium flex items-center gap-1">
                      <span>View Full Folio</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>

                  <div className="md:col-span-5">
                    <div className="relative p-2 bg-white border border-cocoa-200 shadow-polaroid">
                      <div className="w-14 h-4 washi-tape absolute -top-2 left-6 rotate-[-2deg] z-10" />
                      <img
                        src={event.photo}
                        alt={event.title}
                        className="w-full h-40 object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t border-burgundy-900/20">
          <button
            onClick={onComplete}
            className="px-8 py-3.5 bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-sans text-xs uppercase tracking-widest rounded-sm transition-all shadow-md"
          >
            Continue to Interactive Surprises ♡
          </button>
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-burgundy-950/80 backdrop-blur-xs flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-ivory-50 border border-burgundy-900/30 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-sm shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-burgundy-900/20 text-burgundy-900 flex items-center justify-center hover:bg-white text-xs"
              >
                ✕
              </button>

              <div className="text-[11px] uppercase tracking-widest text-vintageGold-700 font-sans mb-1">
                {timelineEvents[selectedEvent].chapter} • {timelineEvents[selectedEvent].date}
              </div>

              <h2 className="font-editorial text-3xl text-burgundy-900 font-bold mb-4">
                {timelineEvents[selectedEvent].title}
              </h2>

              <div className="relative p-2 bg-white border border-cocoa-200 shadow-polaroid mb-6">
                <img
                  src={timelineEvents[selectedEvent].photo}
                  alt={timelineEvents[selectedEvent].title}
                  className="w-full h-64 object-cover"
                />
              </div>

              <p className="font-cormorant text-xl text-cocoa-700 leading-relaxed mb-6">
                {timelineEvents[selectedEvent].description}
              </p>

              <div className="p-4 bg-champagne-100/70 border border-burgundy-900/15 flex items-center justify-between">
                <div className="font-handwriting text-xl text-dusty-rose-600">
                  {timelineEvents[selectedEvent].handwritten}
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 bg-burgundy-700 text-ivory-100 text-xs font-sans uppercase tracking-wider rounded-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
