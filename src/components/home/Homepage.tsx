'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Heart, Star, Flower, Sparkles, Mail, Camera, Book, Calendar, Gift, ArrowLeft } from 'lucide-react';
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
  const [showCelebration, setShowCelebration] = useState(false);
  const [viewedSections, setViewedSections] = useState<Set<Section>>(new Set());

  // Track which sections have been viewed
  useEffect(() => {
    if (currentSection !== 'home') {
      setViewedSections(prev => new Set(prev).add(currentSection));
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
    setShowCelebration(false);
    setCurrentSection('home');
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100, transition: { duration: 0.3 } },
    in: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    out: { opacity: 0, x: -100, transition: { duration: 0.3 } },
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
        onBack={() => navigateToSection('envelope')}
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
        onBack={() => navigateToSection('scrapbook')}
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

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cream-50 via-blush-pink-50 to-champagne-100 overflow-x-hidden">
      {/* Floating decorative elements */}
      <FloatingDecorations />

      {/* Navigation indicators */}
      <div className="fixed top-6 right-6 z-40 flex flex-col gap-3">
        {Object.entries(sectionComponents).map(([key, _], index) => {
          const section = key as Section;
          const isActive = currentSection === section;
          const hasVisited = viewedSections.has(section) || section === 'home';

          return (
            <button
              key={section}
              onClick={() => navigateToSection(section)}
              className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${
                isActive
                  ? 'bg-primary-500 text-white shadow-lg scale-110'
                  : hasVisited
                    ? 'bg-white/70 hover:bg-white shadow-md'
                    : 'bg-white/30 hover:bg-white/50'
              }`}
              title={section}
            >
              {section === 'home' && <Mail size={18} />}
              {section === 'envelope' && <Mail size={18} />}
              {section === 'scrapbook' && <Book size={18} />}
              {section === 'gallery' && <Camera size={18} />}
              {section === 'letter' && <Mail size={18} />}
              {section === 'reasons' && <Heart size={18} />}
              {section === 'timeline' && <Calendar size={18} />}
              {section === 'surprises' && <Gift size={18} />}
              {section === 'celebration' && <Sparkles size={18} />}
            </button>
          );
        })}
      </div>

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

      {/* Back to start button */}
      {currentSection !== 'home' && currentSection !== 'celebration' && (
        <BackToStart onClick={() => navigateToSection('home')} />
      )}
    </div>
  );
}