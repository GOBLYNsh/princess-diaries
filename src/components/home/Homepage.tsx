'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Camera, Feather, Heart, Calendar, Gift, Sparkles, Home } from 'lucide-react';
import { SiteSettings, Reason } from '@/types';
import HomepageHeader from './HomepageHeader';
import Envelope from './Envelope';
import ScrapbookSection from './ScrapbookSection';
import PrincessGallery from './PrincessGallery';
import LetterSection from './LetterSection';
import ReasonsSection from './ReasonsSection';
import TimelineSection from './TimelineSection';
import SurprisesSection from './SurprisesSection';
import FinalCelebration from './FinalCelebration';
import FloatingDecorations from './FloatingDecorations';
import BackToStart from './BackToStart';

interface HomepageProps {
  settings: SiteSettings;
  reasons: Reason[];
  surpriseMessages: {
    heart_click: string;
    gift_open: string;
    bouquet_interaction: string;
  };
}

type Section = 'home' | 'envelope' | 'scrapbook' | 'gallery' | 'letter' | 'reasons' | 'timeline' | 'surprises' | 'celebration';

export default function Homepage({ settings, reasons, surpriseMessages }: HomepageProps) {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [viewedSections, setViewedSections] = useState<Set<Section>>(new Set());

  // Track which sections have been viewed
  useEffect(() => {
    if (currentSection !== 'home') {
      setViewedSections((prev) => new Set(prev).add(currentSection));
    }
  }, [currentSection]);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
    setCurrentSection('envelope');
  };

  const handleEnvelopeClose = () => {
    setIsEnvelopeOpen(false);
    setCurrentSection('scrapbook');
  };

  const navigateToSection = (section: Section) => {
    setCurrentSection(section);
  };

  const handleCelebrationComplete = () => {
    setCurrentSection('home');
  };

  // Cinematic page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    in: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
    out: { opacity: 0, y: -15, transition: { duration: 0.3 } },
  };

  const sectionComponents = {
    home: (
      <HomepageHeader
        recipientName={settings.recipient_name}
        princessTitle={settings.princess_title}
        onOpenEnvelope={handleEnvelopeOpen}
        onViewScrapbook={() => navigateToSection('scrapbook')}
        onViewGallery={() => navigateToSection('gallery')}
        onViewLetter={() => navigateToSection('letter')}
        onViewReasons={() => navigateToSection('reasons')}
        onViewTimeline={() => navigateToSection('timeline')}
        onViewSurprises={() => navigateToSection('surprises')}
      />
    ),
    envelope: (
      <Envelope
        recipientName={settings.recipient_name}
        isOpen={isEnvelopeOpen}
        onClose={handleEnvelopeClose}
        content={settings.welcome_message}
        onViewScrapbook={() => navigateToSection('scrapbook')}
      />
    ),
    scrapbook: (
      <ScrapbookSection
        recipientName={settings.recipient_name}
        onBack={() => navigateToSection('home')}
      />
    ),
    gallery: (
      <PrincessGallery
        recipientName={settings.recipient_name}
        onBack={() => navigateToSection('scrapbook')}
      />
    ),
    letter: (
      <LetterSection
        settings={settings}
        onBack={() => navigateToSection('gallery')}
        onComplete={() => navigateToSection('reasons')}
      />
    ),
    reasons: (
      <ReasonsSection
        reasons={reasons}
        onBack={() => navigateToSection('letter')}
        onComplete={() => navigateToSection('timeline')}
      />
    ),
    timeline: (
      <TimelineSection
        recipientName={settings.recipient_name}
        onBack={() => navigateToSection('reasons')}
        onComplete={() => navigateToSection('surprises')}
      />
    ),
    surprises: (
      <SurprisesSection
        recipientName={settings.recipient_name}
        surpriseMessages={surpriseMessages}
        onBack={() => navigateToSection('timeline')}
        onComplete={() => navigateToSection('celebration')}
      />
    ),
    celebration: (
      <FinalCelebration
        recipientName={settings.recipient_name}
        onComplete={handleCelebrationComplete}
      />
    ),
  };

  const navItems: { key: Section; label: string; icon: any }[] = [
    { key: 'home', label: 'Cover Page', icon: Home },
    { key: 'scrapbook', label: 'The Gazette', icon: BookOpen },
    { key: 'gallery', label: 'Portrait Gallery', icon: Camera },
    { key: 'letter', label: 'Personal Letter', icon: Feather },
    { key: 'reasons', label: 'Reasons Why', icon: Heart },
    { key: 'timeline', label: 'Timeline', icon: Calendar },
    { key: 'surprises', label: 'Little Treasures', icon: Gift },
    { key: 'celebration', label: 'Celebration', icon: Sparkles },
  ];

  return (
    <div className="relative min-h-screen bg-ivory-100 overflow-x-hidden">
      {/* Floating subtle romantic flecks */}
      <FloatingDecorations />

      {/* Luxury Editorial Chapter Navigation Dots (Top Right) */}
      <nav
        aria-label="Chapter navigation"
        className="fixed top-6 right-6 z-40 flex items-center gap-1.5 p-1.5 bg-ivory-50/90 backdrop-blur-xs border border-burgundy-900/20 rounded-sm shadow-sm"
      >
        {navItems.map((item) => {
          const isActive = currentSection === item.key;
          const hasVisited = viewedSections.has(item.key) || item.key === 'home';
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => navigateToSection(item.key)}
              className={`p-2 rounded-xs transition-all duration-300 relative group flex items-center justify-center ${
                isActive
                  ? 'bg-burgundy-700 text-ivory-100 shadow-xs'
                  : hasVisited
                    ? 'text-burgundy-900 hover:bg-champagne-100/80'
                    : 'text-cocoa-400 hover:text-burgundy-800'
              }`}
              title={item.label}
            >
              <Icon size={14} />

              {/* Tooltip on hover */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2.5 py-1 bg-burgundy-950 text-ivory-100 text-[10px] font-sans uppercase tracking-widest rounded-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap hidden sm:block">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="w-full"
        >
          {sectionComponents[currentSection]}
        </motion.div>
      </AnimatePresence>

      {/* Back to Cover button */}
      {currentSection !== 'home' && currentSection !== 'celebration' && (
        <BackToStart onClick={() => navigateToSection('home')} />
      )}
    </div>
  );
}
