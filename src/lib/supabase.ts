import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database tables
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          role: 'admin' | 'user';
        };
        Insert: {
          email: string;
          role?: 'admin' | 'user';
        };
        Update: {
          email?: string;
          role?: 'admin' | 'user';
        };
      };
      website_settings: {
        Row: {
          id: number;
          recipient_name: string;
          princess_title: string;
          welcome_message: string;
          letter_content: string;
          updated_at: string;
        };
        Insert: {
          recipient_name: string;
          princess_title?: string;
          welcome_message?: string;
          letter_content?: string;
        };
        Update: {
          recipient_name?: string;
          princess_title?: string;
          welcome_message?: string;
          letter_content?: string;
        };
      };
      photos: {
        Row: {
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
        };
        Insert: {
          url: string;
          thumbnail_url?: string;
          title: string;
          caption: string;
          category: 'scrapbook' | 'gallery' | 'timeline';
          date_taken: string;
          uploaded_by: string;
          is_public?: boolean;
        };
        Update: {
          url?: string;
          thumbnail_url?: string;
          title?: string;
          caption?: string;
          category?: 'scrapbook' | 'gallery' | 'timeline';
          date_taken?: string;
          uploaded_by?: string;
          is_public?: boolean;
        };
      };
      memories: {
        Row: {
          id: string;
          title: string;
          description: string;
          photo_id: string;
          date: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          title: string;
          description: string;
          photo_id: string;
          date: string;
          order_index?: number;
        };
        Update: {
          title?: string;
          description?: string;
          photo_id?: string;
          date?: string;
          order_index?: number;
        };
      };
      letters: {
        Row: {
          id: string;
          content: string;
          is_active: boolean;
          updated_at: string;
        };
        Insert: {
          content: string;
          is_active?: boolean;
        };
        Update: {
          content?: string;
          is_active?: boolean;
        };
      };
      reasons: {
        Row: {
          id: string;
          reason: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          reason: string;
          order_index?: number;
        };
        Update: {
          reason?: string;
          order_index?: number;
        };
      };
      timeline_events: {
        Row: {
          id: string;
          date: string;
          title: string;
          description: string;
          photo_id: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          date: string;
          title: string;
          description: string;
          photo_id: string;
          order_index?: number;
        };
        Update: {
          date?: string;
          title?: string;
          description?: string;
          photo_id?: string;
          order_index?: number;
        };
      };
      surprise_messages: {
        Row: {
          id: string;
          message: string;
          trigger: 'heart_click' | 'gift_open' | 'bouquet_interaction';
          created_at: string;
        };
        Insert: {
          message: string;
          trigger: 'heart_click' | 'gift_open' | 'bouquet_interaction';
        };
        Update: {
          message?: string;
          trigger?: 'heart_click' | 'gift_open' | 'bouquet_interaction';
        };
      };
    };
  };
};