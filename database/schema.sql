-- Princess Diaries Database Schema
-- PostgreSQL schema for Supabase backend

-- Enable row level security
-- This schema defines all tables needed for the Princess Diaries application

-- 1. USERS TABLE
-- Stores administrator accounts for the content management system
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. WEBSITE SETTINGS TABLE
-- Global settings for the website (recipient name, messages, etc.)
CREATE TABLE website_settings (
    id SERIAL PRIMARY KEY,
    recipient_name TEXT NOT NULL DEFAULT 'Princess',
    princess_title TEXT DEFAULT 'My Dear Princess',
    welcome_message TEXT DEFAULT 'Welcome to your special Princess Day!',
    letter_content TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO website_settings (recipient_name, welcome_message, letter_content)
VALUES (
    '[Her Name]',
    'Happy Princess Day! May your day be filled with joy, sparkles, and all the magical moments you deserve!',
    'My dearest princess,

Today is special because it celebrates the amazing light you bring into every life you touch. Your presence transforms ordinary moments into magical memories, and your kindness makes the world a brighter place.

Your beautiful smile has the power to turn any frown upside down, and your gentle heart inspires everyone who knows you. Today, know that you are cherished, appreciated, and deeply loved.

May this Princess Day be as wonderful as you are - filled with laughter, delight, and all the happiness you deserve.

With all my love,
The Royal Court'
);

-- 3. PHOTOS TABLE
-- Stores all uploaded photos with metadata
CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    title TEXT NOT NULL,
    caption TEXT,
    category TEXT CHECK (category IN ('scrapbook', 'gallery', 'timeline')) NOT NULL,
    date_taken DATE,
    uploaded_by UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. MEMORIES TABLE
-- Personal memories linked to photos
CREATE TABLE memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    photo_id UUID REFERENCES photos(id),
    date TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. LETTERS TABLE
-- Content for the vintage letter section
CREATE TABLE letters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default letter
INSERT INTO letters (content, is_active) VALUES (
    'Dear Princess,

Happy Princess Day! Today is all about celebrating the special magic you bring to the world. May every day feel like a royal celebration, filled with joy, love, and wonder.

Remember that you are cherished, appreciated, and deeply loved. Your beautiful presence makes everything brighter.

With all my love,
The Royal Court.',
    true
);

-- 6. REASONS TABLE
-- The "Little Things I Love About You" section
CREATE TABLE reasons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reason TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample reasons
INSERT INTO reasons (reason, order_index) VALUES
('Your beautiful smile that lights up every room', 1),
('Your random conversations that always make me laugh', 2),
('Your adorable expressions when you concentrate', 3),
('The way you make ordinary moments feel special', 4),
('Simply being yourself - authentically and wonderfully you', 5);

-- 7. TIMELINE EVENTS TABLE
-- Memory timeline entries
CREATE TABLE timeline_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    photo_id UUID REFERENCES photos(id),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample timeline events
INSERT INTO timeline_events (date, title, description, photo_id, order_index) VALUES
('June 15, 2023', 'Our First Princess Day', 'The moment we first celebrated you as a princess - magic began that day.', NULL, 1),
('August 22, 2023', 'Sunset Adventures', 'Watching the sunset together, hand in hand, making memories.', NULL, 2),
('December 10, 2023', 'Winter Wonderland', 'Splashing in puddles and making snow angels together.', NULL, 3),
('March 3, 2024', 'Flower Power', 'Picking flowers and creating beautiful bouquets for loved ones.', NULL, 4),
('May 18, 2024', 'Rainy Day Memories', 'Dancing in the rain with colorful umbrellas.', NULL, 5);

-- 8. SURPRISE MESSAGES TABLE
-- Messages for interactive surprises
CREATE TABLE surprise_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message TEXT NOT NULL,
    trigger TEXT CHECK (trigger IN ('heart_click', 'gift_open', 'bouquet_interaction')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default surprise messages
INSERT INTO surprise_messages (message, trigger) VALUES
('A heart full of love for you! 💖', 'heart_click'),
('Surprise! Everything about you is special!', 'gift_open'),
('These are for all the beautiful moments we\'ve shared... 🌸', 'bouquet_interaction');

-- Indexes for better query performance
CREATE INDEX idx_photos_category ON photos(category);
CREATE INDEX idx_photos_uploaded_by ON photos(uploaded_by);
CREATE INDEX idx_photos_is_public ON photos(is_public);
CREATE INDEX idx_memories_order ON memories(order_index);
CREATE INDEX idx_reasons_order ON reasons(order_index);
CREATE INDEX idx_timeline_events_date ON timeline_events(date);
CREATE INDEX idx_timeline_events_order ON timeline_events(order_index);

-- Triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_website_settings_updated_at
    BEFORE UPDATE ON website_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();