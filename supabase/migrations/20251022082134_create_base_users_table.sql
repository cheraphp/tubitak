/*
  # Create Base Users Table

  1. New Tables
    - `users` - Store user profiles and game progress
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `email` (text, unique)
      - `avatar` (text)
      - `xp` (integer, default 0)
      - `level` (integer, default 1)
      - `total_quizzes` (integer, default 0)
      - `correct_answers` (integer, default 0)
      - `status` (text, default 'active')
      - `is_admin` (boolean, default false)
      - `streak_count` (integer, default 0)
      - `hearts` (integer, default 5)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. Security
    - Enable RLS on users table
    - Add policy for users to read all profiles
    - Add policy for users to read/update own profile
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  avatar text DEFAULT '',
  xp integer DEFAULT 0,
  level integer DEFAULT 1,
  total_quizzes integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  status text DEFAULT 'active',
  is_admin boolean DEFAULT false,
  streak_count integer DEFAULT 0,
  hearts integer DEFAULT 5,
  current_league_id uuid,
  suspended_until timestamptz,
  banned_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view user profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);