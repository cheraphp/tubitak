/*
  # Add Admin and User Status Fields

  1. Changes to users table
    - Add `is_admin` (boolean, default false) - Admin flag
    - Add `status` (text, default 'active') - User account status
    - Add `suspended_until` (timestamptz, nullable) - Temporary suspension end date
    - Add `banned_reason` (text, nullable) - Reason for ban/suspension

  2. Valid Status Values
    - 'active' - Normal active account
    - 'suspended' - Temporarily suspended account
    - 'banned' - Permanently banned account

  3. Security
    - Public access for admin features to work properly

  4. Indexes
    - Index on username for uniqueness check
    - Index on status for filtering

  5. Important Notes
    - Admin users have full access to user management
    - Suspended users cannot login until suspension expires
    - Banned users cannot login permanently
*/

-- Add new columns to users table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE users ADD COLUMN is_admin boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'status'
  ) THEN
    ALTER TABLE users ADD COLUMN status text DEFAULT 'active';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'suspended_until'
  ) THEN
    ALTER TABLE users ADD COLUMN suspended_until timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'banned_reason'
  ) THEN
    ALTER TABLE users ADD COLUMN banned_reason text;
  END IF;
END $$;

-- Create unique index on username
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username_unique ON users(username);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- Add constraint for valid status values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_status_check'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_status_check 
      CHECK (status IN ('active', 'suspended', 'banned'));
  END IF;
END $$;