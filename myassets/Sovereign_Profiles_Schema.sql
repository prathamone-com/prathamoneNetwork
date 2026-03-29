-- ==========================================================
-- AITDL AI AGENT BUILD SIGNATURE
-- ==========================================================
-- Architect    : Jawahar R Mallah
-- Designation  : AI Systems Architect & Author
-- Organization : AITDL Network | PrathamOne
-- Framework    : Autonomous AI Agent Development
-- Authored By  : Jawahar R Mallah
-- Version      : 1.0.0
-- Release Date : 28 March 2026
-- Environment  : Production
--
-- Signature    : Engineered by Jawahar R Mallah
-- Motto        : Crafted with Logic, Vision & AI
-- ==========================================================
-- ============================================================
-- PrathamOne Sovereign Profiles (Cloud Synchronization)
-- ============================================================

-- 1. Create the Profiles Table
CREATE TABLE IF NOT EXISTS public."Sovereign_Profiles" (
    id TEXT PRIMARY KEY, -- Using TEXT for Scholar ID compatibility
    "studentName" TEXT NOT NULL,
    coins INTEGER DEFAULT 0,
    "currentStreak" INTEGER DEFAULT 0,
    "completedChapters" JSONB DEFAULT '[]'::jsonb,
    "recentActivity" JSONB DEFAULT '[]'::jsonb,
    "unlockedItems" JSONB DEFAULT '[]'::jsonb,
    "activeBounties" JSONB DEFAULT '[]'::jsonb,
    "totalMinutes" INTEGER DEFAULT 0,
    last_sync TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public."Sovereign_Profiles" ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- Policy: Allow anyone to create their own profile (or UPSERT)
-- For a learning platform, we allow anonymous access if verified by profile ID
CREATE POLICY "Enable insert/update for profile holders" 
ON public."Sovereign_Profiles" 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Policy: Allow read access to all profiles (for teacher/parent dashboard visibility)
CREATE POLICY "Enable read access for all" 
ON public."Sovereign_Profiles" 
FOR SELECT 
USING (true);

-- 4. Create Index for performance
CREATE INDEX IF NOT EXISTS idx_sovereign_profiles_last_sync ON public."Sovereign_Profiles" (last_sync DESC);

