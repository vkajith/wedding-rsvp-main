-- Wedding RSVP Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Create the rsvps table
CREATE TABLE IF NOT EXISTS rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    status TEXT NOT NULL CHECK (status IN ('accepted', 'declined', 'not_sure')),
    guests INTEGER NOT NULL DEFAULT 1,
    wedding BOOLEAN NOT NULL DEFAULT false,
    reception BOOLEAN NOT NULL DEFAULT false,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvps_status ON rsvps(status);
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvps_phone ON rsvps(phone);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Allow anyone to insert RSVPs (for the form)
CREATE POLICY "Allow public to insert RSVPs" ON rsvps
    FOR INSERT WITH CHECK (true);

-- Allow anyone to read RSVPs (for admin dashboard)
CREATE POLICY "Allow public to read RSVPs" ON rsvps
    FOR SELECT USING (true);

-- Optional: Allow updates (if you want to edit RSVPs later)
-- CREATE POLICY "Allow public to update RSVPs" ON rsvps
--     FOR UPDATE USING (true);

-- Optional: Allow deletes (if you want to delete RSVPs)
-- CREATE POLICY "Allow public to delete RSVPs" ON rsvps
--     FOR DELETE USING (true);


-- Create a view for easy statistics
CREATE OR REPLACE VIEW rsvp_stats AS
SELECT 
    COUNT(*) as total_responses,
    COUNT(*) FILTER (WHERE status = 'accepted') as accepted,
    COUNT(*) FILTER (WHERE status = 'declined') as declined,
    COUNT(*) FILTER (WHERE status = 'not_sure') as not_sure,
    SUM(guests) FILTER (WHERE status = 'accepted') as total_attendees,
    COUNT(*) FILTER (WHERE status = 'accepted' AND wedding = true) as wedding_attendees,
    COUNT(*) FILTER (WHERE status = 'accepted' AND reception = true) as reception_attendees
FROM rsvps;

-- Grant access to the view
GRANT SELECT ON rsvp_stats TO anon, authenticated;
