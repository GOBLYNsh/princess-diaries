-- Princess Diaries Database Push Script
-- Run this entire script in your Supabase SQL Editor to set up the database

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. WEBSITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS website_settings (
    id SERIAL PRIMARY KEY,
    recipient_name TEXT NOT NULL DEFAULT 'Princess',
    princess_title TEXT DEFAULT 'My Dear Princess',
    welcome_message TEXT DEFAULT 'Welcome to your special Princess Day!',
    letter_content TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings if not exists
INSERT INTO website_settings (recipient_name, welcome_message, letter_content)
SELECT 'Princess', 'Happy Princess Day! May your day be filled with joy, sparkles, and all the magical moments you deserve!',
'My dearest princess,

Today is special because it celebrates the amazing light you bring into every life you touch. Your presence transforms ordinary moments into magical memories, and your kindness makes the world a brighter place.

Your beautiful smile has the power to turn any frown upside down, and your gentle heart inspires everyone who knows you. Today, know that you are cherished, appreciated, and deeply loved.

May this Princess Day be as wonderful as you are - filled with laughter, delight, and all the happiness you deserve.

With all my love,
The Royal Court'
WHERE NOT EXISTS (SELECT 1 FROM website_settings LIMIT 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. PHOTOS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS photos (
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

-- ============================================
-- 4. MEMORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    photo_id UUID REFERENCES photos(id),
    date TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. LETTERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS letters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default letter if not exists
INSERT INTO letters (content, is_active)
VALUES (
    'Dear Princess,

Happy Princess Day! Today is all about celebrating the special magic you bring to the world. May every day feel like a royal celebration, filled with joy, love, and wonder.

Remember that you are cherished, appreciated, and deeply loved. Your beautiful presence makes everything brighter.

With all my love,
The Royal Court',
    true
)
WHERE NOT EXISTS (SELECT 1 FROM letters LIMIT 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- 6. REASONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reasons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reason TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample reasons if table is empty
INSERT INTO reasons (reason, order_index)
SELECT reason, ord
FROM (
    VALUES
    ('Your beautiful smile that lights up every room', 1),
    ('Your random conversations that always make me laugh', 2),
    ('Your adorable expressions when you concentrate', 3),
    ('The way you make ordinary moments feel special', 4),
    ('Simply being yourself - authentically and wonderfully you', 5)
) AS t(reason, ord)
WHERE NOT EXISTS (SELECT 1 FROM reasons LIMIT 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- 7. TIMELINE EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS timeline_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    photo_id UUID REFERENCES photos(id),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample timeline events if table is empty
INSERT INTO timeline_events (date, title, description, photo_id, order_index)
SELECT date, title, description, NULL, ord
FROM (
    VALUES
    ('June 15, 2023', 'Our First Princess Day', 'The moment we first celebrated you as a princess - magic began that day.', 1),
    ('August 22, 2023', 'Sunset Adventures', 'Watching the sunset together, hand in hand, making memories.', 2),
    ('December 10, 2023', 'Winter Wonderland', 'Splashing in puddles and making snow angels together.', 3),
    ('March 3, 2024', 'Flower Power', 'Picking flowers and creating beautiful bouquets for loved ones.', 4),
    ('May 18, 2024', 'Rainy Day Memories', 'Dancing in the rain with colorful umbrellas.', 5)
) AS t(date, title, description, ord)
WHERE NOT EXISTS (SELECT 1 FROM timeline_events LIMIT 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- 8. SURPRISE MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS surprise_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message TEXT NOT NULL,
    trigger TEXT CHECK (trigger IN ('heart_click', 'gift_open', 'bouquet_interaction')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default surprise messages if table is empty
INSERT INTO surprise_messages (message, trigger)
SELECT msg, trig
FROM (
    VALUES
    ('A heart full of love for you! 💖', 'heart_click'),
    ('Surprise! Everything about you is special!', 'gift_open'),
    ('These are for all the beautiful moments we''ve shared... 🌸', 'bouquet_interaction')
) AS t(msg, trig)
WHERE NOT EXISTS (SELECT 1 FROM surprise_messages LIMIT 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_photos_category ON photos(category);
CREATE INDEX IF NOT EXISTS idx_photos_uploaded_by ON photos(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_photos_is_public ON photos(is_public);
CREATE INDEX IF NOT EXISTS idx_memories_order ON memories(order_index);
CREATE INDEX IF NOT EXISTS idx_reasons_order ON reasons(order_index);
CREATE INDEX IF NOT EXISTS idx_timeline_events_date ON timeline_events(date);
CREATE INDEX IF NOT EXISTS idx_timeline_events_order ON timeline_events(order_index);

-- ============================================
-- TRIGGERS FOR TIMESTAMP UPDATES
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS update_website_settings_updated_at ON website_settings;
CREATE TRIGGER update_website_settings_updated_at
    BEFORE UPDATE ON website_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE reasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE surprise_messages ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own record" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own record" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Website settings policies (public read)
CREATE POLICY "Public can read settings" ON website_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can update settings" ON website_settings
    FOR ALL USING (auth.role() = 'admin');

-- Photos policies (public read for public photos)
CREATE POLICY "Public can read public photos" ON photos
    FOR SELECT USING (is_public = true);

CREATE POLICY "Auth users can manage photos" ON photos
    FOR ALL TO authenticated USING (true);

-- Memories policies
CREATE POLICY "Public can read memories" ON memories
    FOR SELECT USING (true);

-- Letters policies
CREATE POLICY "Public can read active letters" ON letters
    FOR SELECT USING (is_active = true);

-- Reasons policies (public read)
CREATE POLICY "Public can read reasons" ON reasons
    FOR SELECT USING (true);

-- Timeline events policies
CREATE POLICY "Public can read timeline events" ON timeline_events
    FOR SELECT USING (true);

-- Surprise messages policies
CREATE POLICY "Public can read surprise messages" ON surprise_messages
    FOR SELECT USING (true);

-- ============================================
-- CREATE ADMIN USER
-- ============================================
-- This creates an admin user for the dashboard
-- Change the email to your preferred admin email
INSERT INTO users (email, role)
VALUES ('admin@princessdiaries.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================
/*
=============================================
DATABASE SETUP COMPLETE!
=============================================

All tables have been created and configured.

Next steps:
1. Go to Supabase Storage
2. Create a bucket called 'photos'
3. Set it to Public
4. Configure upload rules for images only

Your Princess Diaries website is ready!
Visit: http://localhost:3000
Admin login: admin@princessdiaries.com

Enjoy creating magical memories!
=============================================
*/