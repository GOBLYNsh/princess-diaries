'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimelineSectionProps {
  recipientName: string;
  onBack: () => void;
  onComplete: () => void;
}

// Timeline events
const timelineEvents = [
  {
    id: 1,
    date: 'June 15, 2023',
    title: 'Our First Princess Day',
    description: 'The moment we first celebrated you as a princess - magic began that day.',
    photo: 'https://images.unsplash.com/photo-1522199655827-d32956ce9e0c?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    date: 'August 22, 2023',
    title: 'Sunset Adventures',
    description: 'Watching the sunset together, hand in hand, making memories.',
    photo: 'https://images.unsplash.com/photo-1496346122103-552a85a9ca70?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    date: 'December 10, 2023',
    title: 'Winter Wonderland',
    description: 'Splashing in puddles and making snow angels together.',
    photo: 'https://images.unsplash.com/photo-1519183071298-a2962e70b574?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    date: 'March 3, 2024',
    title: 'Flower Power',
    description: 'Picking flowers and creating beautiful bouquets for loved ones.',
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    date: 'May 18, 2024',
    title: 'Rainy Day Memories',
    description: 'Dancing in the rain with colorful umbrellas.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop',
  },
];

export default function TimelineSection({ recipientName, onBack, onComplete }: TimelineSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush-pink-50 via-cream-50 to-champagne-100" />

      {/* Decorative elements */}
      <div className="absolute top-20 -left-10 text-6xl opacity-10">📜</div>
      <div className="absolute bottom-20 -right-10 text-6xl opacity-10">📘</div>

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
          Our Memory Timeline
        </motion.h1>

        <div className="w-24" />
      </div>

      {/* Timeline navigation */}
      <div className="w-full max-w-4xl mx-auto mb-12 z-10">
        <div className="flex items-center justify-center gap-6">
          <Button
            onClick={() => setShowAllEvents(false)}
            variant={showAllEvents ? 'ghost' : 'default'}
            className="font-body"
          >
            Linear View
          </Button>
          <Button
            onClick={() => setShowAllEvents(true)}
            variant={showAllEvents ? 'default' : 'ghost'}
            className="font-body"
          >
            All Memories
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <AnimatePresence mode="wait">
        {showAllEvents ? (
          <motion.div
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedEvent(index)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={event.photo}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-primary-500" />
                    <span className="text-xs font-body text-warm-brown-500">{event.date}</span>
                  </div>
                  <h3 className="font-serif text-lg text-warm-brown-700 mb-2">{event.title}</h3>
                  <p className="text-sm text-warm-brown-500 line-clamp-2">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="relative z-10 w-full max-w-3xl mx-auto">
            {/* Vertical timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 to-secondary-300 -translate-x-1/2" />

            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'justify-center lg:justify-end lg:pl-10 lg:pr-0' : 'justify-center lg:justify-start lg:pl-0 lg:pr-10'}`}
              >
                <div className="w-1/2 lg:w-1/2 flex items-center">
                  <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-primary-300 rounded-full flex items-center justify-center z-10 shadow-lg">
                    <Calendar size={16} className="text-primary-500" />
                  </div>

                  {index % 2 === 0 ? (
                    <motion.div
                      className="ml-12 lg:ml-0 w-full"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className="bg-white rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-shadow"
                        onClick={() => setSelectedEvent(index)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className="text-primary-500" />
                          <span className="text-xs font-body text-warm-brown-500">{event.date}</span>
                        </div>
                        <h3 className="font-serif text-xl text-primary-600 mb-2">{event.title}</h3>
                        <p className="text-warm-brown-600 font-body">{event.description}</p>

                        <div className="mt-4 flex gap-2">
                          <div className="w-4 h-4 bg-secondary-400 rounded-full" />
                          <div className="w-4 h-4 bg-primary-400 rounded-full" />
                          <div className="w-4 h-4 bg-accent-400 rounded-full" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="ml-0 lg:ml-12 w-full"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div
                        className="bg-white rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-shadow"
                        onClick={() => setSelectedEvent(index)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className="text-primary-500" />
                          <span className="text-xs font-body text-warm-brown-500">{event.date}</span>
                        </div>
                        <h3 className="font-serif text-xl text-primary-600 mb-2">{event.title}</h3>
                        <p className="text-warm-brown-600 font-body">{event.description}</p>

                        <div className="mt-4 flex gap-2">
                          <div className="w-4 h-4 bg-secondary-400 rounded-full" />
                          <div className="w-4 h-4 bg-primary-400 rounded-full" />
                          <div className="w-4 h-4 bg-accent-400 rounded-full" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <motion.button
        onClick={onComplete}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-primary-400 to-secondary-500 hover:from-primary-500 hover:to-secondary-600 text-white px-8 py-4 rounded-full shadow-2xl font-body text-lg transition-all duration-300 hover:scale-105"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        Continue to Surprises
      </motion.button>

      {/* Event detail modal */}
      <AnimatePresence>
        {selectedEvent !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={timelineEvents[selectedEvent].photo}
                alt={timelineEvents[selectedEvent].title}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-serif text-warm-brown-700 mb-2">
                  {timelineEvents[selectedEvent].title}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-primary-500" />
                  <span className="text-warm-brown-500 font-body">
                    {timelineEvents[selectedEvent].date}
                  </span>
                </div>
                <p className="text-warm-brown-600 font-body mb-6">
                  {timelineEvents[selectedEvent].description}
                </p>

                <Button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full py-3 font-body"
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}