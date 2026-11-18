// Type definitions for the Princess Diaries application

export interface Photo {
  id: string;
  url: string;
  thumbnail_url: string;
  title: string;
  caption: string;
  category: 'scrapbook' | 'gallery' | 'timeline';
  date_taken: string;
  uploaded_by: string;
  created_at: string;
  is_public: boolean;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  photo_id: string;
  date: string;
  order_index: number;
  created_at: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  photo_id: string;
  order_index: number;
  created_at: string;
}

export interface Reason {
  id: string;
  reason: string;
  order_index: number;
  created_at: string;
}

export interface SiteSettings {
  recipient_name: string;
  princess_title: string;
  welcome_message: string;
  letter_content: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

// Decorative icon data
export const decorativeIcons = [
  { type: 'heart', x: 5, y: 5 },
  { type: 'star', x: 10, y: 10 },
  { type: 'flower', x: 15, y: 15 },
  { type: 'sparkle', x: 20, y: 20 },
];