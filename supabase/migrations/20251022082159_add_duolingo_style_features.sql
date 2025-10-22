/*
  # Duolingo-Style Features Migration

  1. New Tables
    - `leagues` - Store league information (Bronze, Silver, Gold, Diamond, Emerald)
    - `league_memberships` - Track user league memberships with weekly XP
    - `streaks` - Track user daily streaks
    - `achievements` - Define available achievements/badges
    - `user_achievements` - Track user earned achievements
    - `hearts` - Track user hearts (lives) system
    
  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users to read their own data
    - Add policies for users to view league data
    
  3. Important Notes
    - Leagues are weekly-based competitions
    - Hearts regenerate over time
    - Streaks track consecutive days of learning
    - Achievements unlock based on various criteria
*/

-- Create leagues table
CREATE TABLE IF NOT EXISTS leagues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tier integer NOT NULL UNIQUE,
  min_xp integer DEFAULT 0,
  icon text DEFAULT '',
  color text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view leagues"
  ON leagues FOR SELECT
  TO authenticated
  USING (true);

-- Insert default leagues
INSERT INTO leagues (name, tier, min_xp, icon, color) VALUES
  ('Bronze', 1, 0, 'bi-shield-fill', 'from-orange-700 to-orange-900'),
  ('Silver', 2, 500, 'bi-shield-fill', 'from-gray-400 to-gray-600'),
  ('Gold', 3, 1000, 'bi-shield-fill', 'from-yellow-400 to-yellow-600'),
  ('Diamond', 4, 2000, 'bi-gem', 'from-blue-400 to-blue-600'),
  ('Emerald', 5, 5000, 'bi-gem', 'from-green-400 to-green-600')
ON CONFLICT (tier) DO NOTHING;

-- Create league memberships table
CREATE TABLE IF NOT EXISTS league_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  league_id uuid REFERENCES leagues(id) ON DELETE CASCADE,
  weekly_xp integer DEFAULT 0,
  week_start timestamptz DEFAULT date_trunc('week', now()),
  rank integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, week_start)
);

ALTER TABLE league_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own league membership"
  ON league_memberships FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view league members"
  ON league_memberships FOR SELECT
  TO authenticated
  USING (
    league_id IN (
      SELECT league_id FROM league_memberships 
      WHERE user_id = auth.uid() AND week_start = date_trunc('week', now())
    )
  );

CREATE POLICY "Users can insert own league membership"
  ON league_memberships FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own league membership"
  ON league_memberships FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create streaks table
CREATE TABLE IF NOT EXISTS streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_practice_date date DEFAULT CURRENT_DATE,
  freeze_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streak"
  ON streaks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streak"
  ON streaks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streak"
  ON streaks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text DEFAULT '',
  type text NOT NULL,
  requirement integer DEFAULT 0,
  xp_reward integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- Insert default achievements
INSERT INTO achievements (name, description, icon, type, requirement, xp_reward) VALUES
  ('First Steps', 'Complete your first quiz', 'bi-star-fill', 'quiz_count', 1, 10),
  ('Dedicated Learner', 'Complete 10 quizzes', 'bi-trophy-fill', 'quiz_count', 10, 50),
  ('Quiz Master', 'Complete 50 quizzes', 'bi-award-fill', 'quiz_count', 50, 200),
  ('Perfect Score', 'Get 100% on a quiz', 'bi-check-circle-fill', 'perfect_quiz', 1, 25),
  ('Week Warrior', 'Maintain a 7-day streak', 'bi-fire', 'streak', 7, 50),
  ('Month Champion', 'Maintain a 30-day streak', 'bi-lightning-fill', 'streak', 30, 300),
  ('XP Hunter', 'Earn 1000 total XP', 'bi-gem', 'total_xp', 1000, 100)
ON CONFLICT (name) DO NOTHING;

-- Create user achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create hearts table
CREATE TABLE IF NOT EXISTS hearts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  current_hearts integer DEFAULT 5,
  max_hearts integer DEFAULT 5,
  last_refill timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE hearts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own hearts"
  ON hearts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own hearts"
  ON hearts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own hearts"
  ON hearts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add foreign key constraint for current_league_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'users_current_league_id_fkey'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_current_league_id_fkey 
    FOREIGN KEY (current_league_id) REFERENCES leagues(id);
  END IF;
END $$;