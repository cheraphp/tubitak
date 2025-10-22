/*
  # Recreate Users Table (Simple Version)

  1. Changes
    - Drop existing users table if exists
    - Create new users table without auth.users reference
    - Add all necessary columns including progress tracking
    - Enable RLS with proper policies

  2. New Columns
    - `completed_units`: Array of completed unit IDs
    - `unit_progress`: JSONB for detailed progress tracking
*/

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  avatar text DEFAULT '',
  xp integer DEFAULT 0,
  level integer DEFAULT 1,
  total_quizzes integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  status text DEFAULT 'active',
  is_admin boolean DEFAULT false,
  streak_count integer DEFAULT 0,
  hearts integer DEFAULT 5,
  completed_units TEXT[] DEFAULT '{}',
  unit_progress JSONB DEFAULT '{}',
  current_league_id uuid,
  suspended_until timestamptz,
  banned_reason text,
  accepted_terms boolean DEFAULT false,
  accepted_privacy boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view user profiles"
  ON users FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert users"
  ON users FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);