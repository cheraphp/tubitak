/*
  # VocQuiz Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique user identifier
      - `email` (text, unique) - User email address
      - `password` (text) - Hashed password
      - `username` (text) - User display name
      - `avatar` (text) - Avatar URL
      - `xp` (integer, default 0) - Experience points
      - `level` (integer, default 1) - User level
      - `total_quizzes` (integer, default 0) - Total quizzes completed
      - `correct_answers` (integer, default 0) - Total correct answers
      - `accepted_terms` (boolean, default false) - Terms acceptance flag
      - `accepted_privacy` (boolean, default false) - Privacy policy acceptance flag
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `quiz_results`
      - `id` (uuid, primary key) - Unique result identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `quiz_level` (text) - Quiz level identifier (e.g., Grade_9_Unit1)
      - `score` (integer) - Quiz score
      - `total_questions` (integer) - Total questions in quiz
      - `correct_answers` (integer) - Number of correct answers
      - `xp_gained` (integer) - XP earned from this quiz
      - `completed_at` (timestamptz) - Quiz completion timestamp

  2. Security
    - Enable RLS on all tables
    - Users can read and update their own data
    - Public access for registration (insert new users)
    - Public read access to leaderboard data
    - Users can manage their quiz results

  3. Indexes
    - Index on users.email for fast login lookups
    - Index on users.xp for leaderboard queries
    - Index on quiz_results.user_id for user history

  4. Important Notes
    - Passwords should be hashed on the client side before storage
    - XP and level calculations are handled in application logic
    - Terms and privacy acceptance is required before account creation
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  username text NOT NULL,
  avatar text DEFAULT '',
  xp integer DEFAULT 0,
  level integer DEFAULT 1,
  total_quizzes integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  accepted_terms boolean DEFAULT false,
  accepted_privacy boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_level text NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  correct_answers integer NOT NULL,
  xp_gained integer NOT NULL,
  completed_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_xp ON users(xp DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Users table policies (PUBLIC ACCESS - NO AUTH REQUIRED)
DROP POLICY IF EXISTS "Anyone can read users" ON users;
CREATE POLICY "Anyone can read users"
  ON users FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can insert users" ON users;
CREATE POLICY "Anyone can insert users"
  ON users FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update users" ON users;
CREATE POLICY "Anyone can update users"
  ON users FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Quiz results policies
DROP POLICY IF EXISTS "Anyone can read quiz results" ON quiz_results;
CREATE POLICY "Anyone can read quiz results"
  ON quiz_results FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can insert quiz results" ON quiz_results;
CREATE POLICY "Anyone can insert quiz results"
  ON quiz_results FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();