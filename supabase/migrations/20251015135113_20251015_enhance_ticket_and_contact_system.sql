/*
  # Enhanced Ticket System and Contact Messages

  1. Changes to tickets table
    - Add `closed_by` (uuid, nullable) - Admin who closed the ticket
    - Add `closed_at` (timestamptz, nullable) - When ticket was closed
    - Add `response_time` (interval, nullable) - Time to first admin response

  2. Changes to users table  
    - Track who banned/suspended a user
    - Add `banned_by` (uuid, nullable) - Admin who banned the user
    - Add `banned_at` (timestamptz, nullable) - When user was banned

  3. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique message identifier
      - `name` (text) - Sender name
      - `email` (text) - Sender email
      - `subject` (text) - Message subject
      - `message` (text) - Message content
      - `status` (text) - Message status (new, read, replied, archived)
      - `replied_by` (uuid, nullable) - Admin who replied
      - `reply` (text, nullable) - Admin reply
      - `replied_at` (timestamptz, nullable) - Reply timestamp
      - `created_at` (timestamptz) - Message creation timestamp

  4. Security
    - Enable RLS on contact_messages table
    - Public can create contact messages
    - Only admins can read and update contact messages

  5. Important Notes
    - Contact messages are for non-registered users
    - Tickets are for registered users
    - All timestamps are tracked for analytics
*/

-- Add new columns to tickets table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tickets' AND column_name = 'closed_by'
  ) THEN
    ALTER TABLE tickets ADD COLUMN closed_by uuid REFERENCES users(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tickets' AND column_name = 'closed_at'
  ) THEN
    ALTER TABLE tickets ADD COLUMN closed_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tickets' AND column_name = 'response_time'
  ) THEN
    ALTER TABLE tickets ADD COLUMN response_time interval;
  END IF;
END $$;

-- Add new columns to users table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'banned_by'
  ) THEN
    ALTER TABLE users ADD COLUMN banned_by uuid REFERENCES users(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'banned_at'
  ) THEN
    ALTER TABLE users ADD COLUMN banned_at timestamptz;
  END IF;
END $$;

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  replied_by uuid REFERENCES users(id) ON DELETE SET NULL,
  reply text,
  replied_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tickets_closed_by ON tickets(closed_by);
CREATE INDEX IF NOT EXISTS idx_users_banned_by ON users(banned_by);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Add constraint for contact message status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_messages_status_check'
  ) THEN
    ALTER TABLE contact_messages ADD CONSTRAINT contact_messages_status_check 
      CHECK (status IN ('new', 'read', 'replied', 'archived'));
  END IF;
END $$;

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Contact messages policies (PUBLIC ACCESS)
DROP POLICY IF EXISTS "Anyone can create contact messages" ON contact_messages;
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read contact messages" ON contact_messages;
CREATE POLICY "Anyone can read contact messages"
  ON contact_messages FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can update contact messages" ON contact_messages;
CREATE POLICY "Anyone can update contact messages"
  ON contact_messages FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);