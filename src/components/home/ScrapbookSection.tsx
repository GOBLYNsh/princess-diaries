'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Star, Sparkles, Bookmark, Share2 } from 'lucide-react';

interface ScrapbookSectionProps {
  recipientName: string;
  onBack: () => void;
}

// Vintage newspaper editorial entries
const editorialArticles = [
  {
    id: 1,
    tag: 'COVER STORY',
    section: 'The Princess Edition',
    title: 'The Girl Who Makes the World More Beautiful',
    subtitle: 'An eyewitness account of quiet kindness, radiant laughter, and an effortless grace.',
    date: 'ISSUE NO. 01 • ROYAL GAZETTE',
    column: 'main',
    author: 'From The Royal Correspondent',
    image: 'https://images.unsplash.com/photo-1522199655827-d32956ce9e0c?w=900&h=650&fit=crop',
    imageCaption: 'Fig. 1 — Captured in her natural element: bringing light into every single room.',
    handwrittenNote: 'my absolute favorite photograph of you ♡',
    rotation: '-1deg',
    body: [
      'It is widely reported across every corner of the kingdom that ordinary rooms turn luminous the moment you walk in. While scholars continue to debate the science behind such a phenomenon, the witnesses simply agree: some people carry spring in their step.',
      'From the genuine warmth of your laughter to the gentle consideration you show everyone around you, this royal decree makes it official — you are, and have always been, extraordinary in every sense of the word.',
    ],
  },
  {
    id: 2,
    tag: 'FEATURE COLUMN',
    section: 'The Story of Her',
    title: 'A Rare and Golden Heart',
    subtitle: 'Chapter II: On being wonderfully, uniquely herself.',
    date: 'VOLUME IV • EDITION 12',
    column: 'side',
    author: 'By The Chronicler of Good Things',
    image: 'https://images.unsplash.com/photo-1496346122103-552a85a9ca70?w=600&h=700&fit=crop',
    imageCaption: 'Fig. 2 — Golden hours were practically invented for her.',
    handwrittenNote: 'pure sunshine ✨',
    rotation: '1.5deg',
    body: [
      'What makes her special isn’t merely the grand moments; it is the soft, thoughtful details. The way she listens with genuine care, the little jokes only she can deliver, and the quiet resilience she wears with unmatched dignity.',
    ],
  },
  {
    id: 3,
    tag: 'CHRONICLE',
    section: 'Little Things Worth Remembering',
    title: 'The Unfiltered Beauty of Everyday Moments',
    subtitle: 'From cozy cups of coffee to laughing until our stomachs hurt.',
    date: 'AUTUMN ARCHIVE • RECORD 07',
    column: 'grid',
    author: 'Memories Desk',
    image: 'https://images.unsplash.com/photo-1511888586535-73b238f3c4d4?w=600&h=500&fit=crop',
    imageCaption: 'Fig. 3 — Proof that laughter looks best on you.',
    handwrittenNote: 'remember this afternoon? ☕',
    rotation: '-2deg',
    body: [
      'The quiet walks, the shared songs with the windows rolled down, the inside jokes that need no explanation. These are the heirlooms no treasure chest could ever buy.',
    ],
  },
  {
    id: 4,
    tag: 'GALLERY CLIP',
    section: 'A Collection of Beautiful Moments',
    title: 'Dancing Through the Seasons',
    subtitle: 'A photographic retrospective of grace and wonder.',
    date: 'FOLIO 18 • THE MEMORY ARCHIVES',
    column: 'grid',
    author: 'Arts & Culture',
    image: 'https://images.unsplash.com/photo-1519183071298-a2962e70b574?w=600&h=500&fit=crop',
    imageCaption: 'Fig. 4 — Making winter feel warm since day one.',
    handwrittenNote: 'like a scene from a classic film 🎞️',
    rotation: '2deg',
    body: [
      'No season stays bleak when she is there to greet it. Rain becomes romantic, sunsets become cinematic, and ordinary Tuesday afternoons turn into stories worth retelling.',
    ],
  },
  {
    id: 5,
    tag: 'FLASH DISPATCH',
    section: "Breaking News: She's Extraordinary",
    title: 'Official Proclamation: Perfection Declared',
    subtitle: 'Diplomatic cables confirm undeniable charm worldwide.',
    date: 'TELEGRAPH DISPATCH 09',
    column: 'ticker',
    author: 'Global Bureau of Admiration',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=700&fit=crop',
    imageCaption: 'Fig. 5 — Royal portraiture at its finest.',
    handwrittenNote: 'always the prettiest in the room 👑',
    rotation: '-0.8deg',
    body: [
      'According to newly unsealed records, every attempt to find someone half as sweet, witty, and wonderful has officially been abandoned due to an absolute lack of competition.',
    ],
  },
  {
    id: 6,
    tag: 'POETRY DESK',
    section: 'The Princess Edition',
    title: 'A Gentle Reminder for Tomorrow',
    subtitle: 'May your days be as kind to you as you are to the world.',
    date: 'PERPETUAL CALENDAR',
    column: 'grid',
    author: 'Written With Love',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=500&fit=crop',
    imageCaption: 'Fig. 6 — Wildflowers bloom in your direction.',
    handwrittenNote: 'never forget how loved you are 🌸',
    rotation: '1.2deg',
    body: [
      'Whenever the world feels loud or hurried, open this little page and remember: you have a whole army of people who adore you, look up to you, and thank the heavens for the day you were born.',
    ],
  },
];

export default function ScrapbookSection({ recipientName, onBack }: ScrapbookSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [clappedArticles, setClappedArticles] = useState<Set<number>>(new Set());

  const toggleHeart = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setClappedArticles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const leadArticle = editorialArticles[0];
  const sideArticle = editorialArticles[1];
  const gridArticles = editorialArticles.slice(2);

  return (
    <div className="min-h-screen bg-newspaper-paper text-cocoa-800 p-4 sm:p-6 md:p-12 relative overflow-x-hidden">
      {/* Outer Editorial Framing Border */}
      <div className="max-w-6xl mx-auto bg-ivory-50 border border-burgundy-900/20 shadow-2xl relative p-4 sm:p-8 md:p-12">
        {/* Top Header Navigation & Issue Details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-burgundy-900/30 pb-4 mb-4 text-xs font-sans text-cocoa-500 uppercase tracking-widest">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 border border-burgundy-900/20 hover:border-burgundy-900/60 bg-white/60 hover:bg-white rounded-sm text-burgundy-900 transition-all font-sans text-xs tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>Return to Cover</span>
          </button>

          <div className="flex items-center gap-4 text-center">
            <span>Special Princess Edition</span>
            <span>•</span>
            <span className="font-serif italic capitalize tracking-normal text-burgundy-700">Dedicated to {recipientName}</span>
            <span>•</span>
            <span>Price: One Genuine Smile</span>
          </div>

          <div className="text-right hidden sm:block text-vintageGold-600 font-serif">
            VOL. I • N° 01
          </div>
        </div>

        {/* Vintage Masthead Banner */}
        <header className="text-center py-6 md:py-10 border-b-2 border-double border-burgundy-900/40 relative">
          <div className="text-xs uppercase tracking-[0.3em] font-sans text-vintageGold-600 mb-2 font-medium">
            The Daily Keepsake • Established in Eternal Admiration
          </div>
          
          <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-burgundy-900 tracking-tight font-black uppercase leading-none py-1">
            The Princess Gazette
          </h1>

          <div className="flex items-center justify-center gap-4 md:gap-8 mt-4 pt-3 border-t border-burgundy-900/20 text-xs sm:text-sm font-serif italic text-cocoa-600">
            <span>&ldquo;All the News That Celebrates Her&rdquo;</span>
            <span className="text-vintageGold-500">✦</span>
            <span>Special Collector’s Folio</span>
            <span className="text-vintageGold-500">✦</span>
            <span>Published for {recipientName}</span>
          </div>

          {/* Decorative vintage postage stamp in corner */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 rotate-6 hidden sm:flex flex-col items-center justify-center w-16 h-20 border-2 border-dashed border-burgundy-700/50 bg-champagne-100/80 p-1 text-center shadow-sm">
            <span className="text-[9px] uppercase tracking-wider font-sans text-burgundy-800">ROYAL MAIL</span>
            <span className="text-lg">👑</span>
            <span className="text-[8px] font-serif text-cocoa-600">POSTAGE PAID</span>
          </div>
        </header>

        {/* Breaking News Ribbon */}
        <div className="bg-burgundy-900 text-ivory-100 py-2 px-4 my-6 text-xs sm:text-sm font-sans tracking-wide flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="bg-vintageGold-500 text-burgundy-900 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-xs">
              BREAKING
            </span>
            <span className="font-serif italic truncate">
              Royal decree issued: Today is officially declared {recipientName} Day across every realm.
            </span>
          </div>
          <span className="hidden md:inline text-vintageGold-300 font-sans text-xs">
            EDITION EXCLUSIVE
          </span>
        </div>

        {/* Main 2-Column Newspaper Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-burgundy-900/20">
          {/* Main Lead Story (Left / 8 cols) */}
          <article
            onClick={() => setSelectedArticle(0)}
            className="lg:col-span-8 cursor-pointer group"
          >
            <div className="border-b border-burgundy-900/20 pb-3 mb-4 flex items-center justify-between text-xs uppercase tracking-widest text-vintageGold-600 font-sans">
              <span>{leadArticle.section}</span>
              <span className="text-cocoa-400">{leadArticle.date}</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-burgundy-900 font-bold leading-[1.08] mb-4 group-hover:text-burgundy-600 transition-colors">
              {leadArticle.title}
            </h2>

            <p className="font-cormorant italic text-lg sm:text-xl text-cocoa-600 mb-6 leading-relaxed">
              {leadArticle.subtitle}
            </p>

            {/* Newspaper Photo Frame with Polaroid/Washi Tape aesthetic */}
            <div className="relative my-6 p-3 bg-white border border-cocoa-200 shadow-polaroid rounded-sm">
              {/* Washi tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rotate-[-2deg] z-10 border-x border-cocoa-300/40" />

              <img
                src={leadArticle.image}
                alt={leadArticle.title}
                className="w-full h-72 sm:h-96 object-cover grayscale-[15%] contrast-[105%] group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Handwritten scrap note in corner */}
              <div className="absolute bottom-6 right-6 font-handwriting text-xl text-burgundy-700 bg-ivory-100/95 px-3 py-1 shadow-sm rotate-[-3deg] border border-burgundy-900/10">
                {leadArticle.handwrittenNote}
              </div>

              <div className="mt-2 text-xs font-serif italic text-cocoa-500 flex justify-between items-center">
                <span>{leadArticle.imageCaption}</span>
                <button
                  onClick={(e) => toggleHeart(leadArticle.id, e)}
                  className={`p-1.5 rounded-full transition-colors ${
                    clappedArticles.has(leadArticle.id) ? 'text-burgundy-600' : 'text-cocoa-400 hover:text-burgundy-600'
                  }`}
                >
                  <Heart size={16} fill={clappedArticles.has(leadArticle.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Multi-column editorial text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base leading-relaxed text-cocoa-700 font-body">
              <p className="first-letter:font-editorial first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-burgundy-800">
                {leadArticle.body[0]}
              </p>
              <p>{leadArticle.body[1]}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-burgundy-900/20 text-xs text-vintageGold-700 font-serif italic flex items-center justify-between">
              <span>By The Royal Gazette Staff</span>
              <span className="group-hover:translate-x-1 transition-transform">Click to expand folio article →</span>
            </div>
          </article>

          {/* Right Column / Side Editorial (4 cols) */}
          <aside className="lg:col-span-4 lg:border-l lg:border-burgundy-900/20 lg:pl-8 flex flex-col justify-between">
            <article
              onClick={() => setSelectedArticle(1)}
              className="cursor-pointer group pb-6 border-b border-burgundy-900/20"
            >
              <div className="border-b border-burgundy-900/20 pb-2 mb-3 text-xs uppercase tracking-widest text-vintageGold-600 font-sans">
                {sideArticle.section}
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-burgundy-900 font-semibold leading-tight mb-2 group-hover:text-burgundy-600 transition-colors">
                {sideArticle.title}
              </h3>

              <p className="font-cormorant italic text-sm text-cocoa-600 mb-4">
                {sideArticle.subtitle}
              </p>

              {/* Polaroid with washi tape */}
              <div className="relative p-2.5 bg-white border border-cocoa-200 shadow-polaroid mb-4">
                <div className="absolute -top-2 left-6 w-16 h-4 washi-tape rotate-[3deg] z-10" />
                <img
                  src={sideArticle.image}
                  alt={sideArticle.title}
                  className="w-full h-56 object-cover grayscale-[10%]"
                />
                <p className="mt-2 text-[11px] font-serif italic text-cocoa-500">
                  {sideArticle.imageCaption}
                </p>
              </div>

              <p className="text-sm text-cocoa-700 font-body leading-relaxed">
                {sideArticle.body[0]}
              </p>

              <div className="mt-3 font-handwriting text-lg text-dusty-rose-600">
                &mdash; {sideArticle.handwrittenNote}
              </div>
            </article>

            {/* Vintage Classifieds / Mini Box */}
            <div className="mt-6 p-4 border border-burgundy-900/30 bg-champagne-50/70 text-xs">
              <div className="text-center uppercase font-sans tracking-widest text-burgundy-800 font-bold border-b border-burgundy-900/20 pb-1 mb-2">
                Royal Notice & Proclamations
              </div>
              <p className="font-cormorant italic text-cocoa-700 leading-normal mb-2">
                &ldquo;Be it known to all companions, friends, and secret admirers: you are cherished beyond all calculation.&rdquo;
              </p>
              <div className="text-[10px] uppercase tracking-wider text-right text-vintageGold-700 font-sans">
                OFFICIALLY CERTIFIED ♡
              </div>
            </div>
          </aside>
        </div>

        {/* Secondary Editorial Section: 4-Column Scrapbook Masonry Grid */}
        <div className="pt-10">
          <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-burgundy-900/40">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-vintageGold-600 font-sans font-medium block">
                The Curated Folios
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-burgundy-900 font-bold">
                A Collection of Beautiful Moments
              </h3>
            </div>
            <span className="font-handwriting text-xl text-dusty-rose-600 hidden sm:block">
              pages from our memory album 📎
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gridArticles.map((art, idx) => {
              const actualIdx = idx + 2;
              return (
                <article
                  key={art.id}
                  onClick={() => setSelectedArticle(actualIdx)}
                  className="group cursor-pointer bg-white p-3 border border-cocoa-200 shadow-polaroid hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                  style={{ transform: `rotate(${art.rotation})` }}
                >
                  <div>
                    {/* Washi tape header */}
                    <div className="w-16 h-4 washi-tape mx-auto -mt-5 mb-2 border-x border-cocoa-300/40" />

                    <div className="text-[10px] uppercase tracking-widest text-vintageGold-700 font-sans mb-1">
                      {art.section}
                    </div>

                    <h4 className="font-editorial text-lg text-burgundy-900 font-bold leading-tight mb-2 group-hover:text-burgundy-600 transition-colors">
                      {art.title}
                    </h4>

                    <div className="overflow-hidden mb-3">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <p className="text-xs font-body text-cocoa-600 line-clamp-3 leading-relaxed mb-3">
                      {art.body[0]}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-burgundy-900/10 flex items-center justify-between text-[11px]">
                    <span className="font-handwriting text-sm text-dusty-rose-600 truncate max-w-[150px]">
                      {art.handwrittenNote}
                    </span>
                    <button
                      onClick={(e) => toggleHeart(art.id, e)}
                      className={`p-1 rounded-full ${
                        clappedArticles.has(art.id) ? 'text-burgundy-600' : 'text-cocoa-400 hover:text-burgundy-600'
                      }`}
                    >
                      <Heart size={14} fill={clappedArticles.has(art.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Vintage Bottom Masthead / Footer */}
        <footer className="mt-12 pt-6 border-t border-burgundy-900/30 text-center text-xs font-sans text-cocoa-500 uppercase tracking-widest flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Printed on 100% Recycled Affection</span>
          <span className="font-serif italic capitalize tracking-normal text-burgundy-700 text-sm">
            End of Gazette Edition • May every day be your Princess Day
          </span>
          <button
            onClick={onBack}
            className="text-burgundy-800 hover:text-burgundy-900 underline underline-offset-4"
          >
            Back to Top ↑
          </button>
        </footer>
      </div>

      {/* Article Detail Modal (Vintage Reading Room) */}
      <AnimatePresence>
        {selectedArticle !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-burgundy-950/80 backdrop-blur-xs flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className="bg-ivory-50 border border-burgundy-900/40 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-burgundy-900/20 text-burgundy-900 flex items-center justify-center hover:bg-burgundy-100 transition-colors text-sm font-sans"
              >
                ✕
              </button>

              <div className="text-xs uppercase tracking-[0.25em] text-vintageGold-600 font-sans mb-2">
                {editorialArticles[selectedArticle].section}
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-burgundy-900 font-bold mb-3 leading-tight">
                {editorialArticles[selectedArticle].title}
              </h2>

              <p className="font-cormorant italic text-lg text-cocoa-600 mb-6">
                {editorialArticles[selectedArticle].subtitle}
              </p>

              <div className="relative my-4 p-2 bg-white border border-cocoa-200 shadow-polaroid">
                <img
                  src={editorialArticles[selectedArticle].image}
                  alt={editorialArticles[selectedArticle].title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="mt-2 text-xs font-serif italic text-cocoa-500">
                  {editorialArticles[selectedArticle].imageCaption}
                </div>
              </div>

              <div className="space-y-4 text-cocoa-700 font-body leading-relaxed text-base my-6">
                {editorialArticles[selectedArticle].body.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>

              <div className="p-4 bg-champagne-100/70 border border-burgundy-900/15 rounded-sm flex items-center justify-between">
                <div className="font-handwriting text-2xl text-burgundy-700">
                  &ldquo;{editorialArticles[selectedArticle].handwrittenNote}&rdquo;
                </div>
                <button
                  onClick={(e) => toggleHeart(editorialArticles[selectedArticle].id, e)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-sans uppercase tracking-wider ${
                    clappedArticles.has(editorialArticles[selectedArticle].id)
                      ? 'border-burgundy-700 bg-burgundy-700 text-ivory-100'
                      : 'border-burgundy-900/30 text-burgundy-900 hover:bg-white'
                  }`}
                >
                  <Heart size={14} fill={clappedArticles.has(editorialArticles[selectedArticle].id) ? 'currentColor' : 'none'} />
                  <span>Loved</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
