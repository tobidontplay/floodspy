-- Create users table for authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create flood alerts table
CREATE TABLE flood_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  severity TEXT NOT NULL CHECK (severity IN ('high', 'medium', 'low')),
  location TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT NOT NULL,
  affected_areas TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create flood reports table with geospatial data
CREATE TABLE flood_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  coordinates GEOGRAPHY(POINT, 4326) NOT NULL,
  water_level TEXT NOT NULL CHECK (water_level IN ('ankle', 'knee', 'waist')),
  description TEXT,
  image_url TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE flood_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE flood_reports ENABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX idx_flood_alerts_location ON flood_alerts(location);
CREATE INDEX idx_flood_alerts_severity ON flood_alerts(severity);
CREATE INDEX idx_flood_reports_location ON flood_reports(location);
CREATE INDEX idx_flood_reports_coordinates ON flood_reports USING GIST(coordinates);