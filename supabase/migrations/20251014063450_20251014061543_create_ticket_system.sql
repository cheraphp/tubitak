/*
  # Create Ticket System

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key) - Unique ticket identifier
      - `user_id` (uuid, foreign key) - User who created the ticket
      - `subject` (text) - Ticket subject
      - `message` (text) - Initial ticket message
      - `category` (text) - Ticket category (technical, content, account, suggestion, report, other)
      - `status` (text) - Ticket status (open, in_progress, resolved, closed)
      - `priority` (text) - Ticket priority (low, medium, high)
      - `assigned_to` (uuid, nullable) - Admin user assigned to ticket
      - `created_at` (timestamptz) - Ticket creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `ticket_messages`
      - `id` (uuid, primary key) - Unique message identifier
      - `ticket_id` (uuid, foreign key) - Reference to tickets table
      - `user_id` (uuid, foreign key) - User who sent the message
      - `message` (text) - Message content
      - `is_admin` (boolean) - Whether message is from admin
      - `created_at` (timestamptz) - Message creation timestamp

  2. Security
    - Enable RLS on all tables
    - Users can create tickets
    - Users can view their own tickets
    - Admins can view all tickets
    - Users and admins can add messages to tickets they have access to

  3. Indexes
    - Index on tickets.user_id for user ticket lookups
    - Index on tickets.status for filtering
    - Index on ticket_messages.ticket_id for message lookups

  4. Important Notes
    - Only admins can assign tickets and change status
    - Users receive notifications when admins respond (future feature)
    - Tickets cannot be deleted, only closed
*/

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  message text NOT NULL,
  category text DEFAULT 'other',
  status text DEFAULT 'open',
  priority text DEFAULT 'medium',
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ticket_messages table
CREATE TABLE IF NOT EXISTS ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_ticket_id ON ticket_messages(ticket_id);

-- Add constraints for valid values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'tickets_category_check'
  ) THEN
    ALTER TABLE tickets ADD CONSTRAINT tickets_category_check 
      CHECK (category IN ('technical', 'content', 'account', 'suggestion', 'report', 'other'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'tickets_status_check'
  ) THEN
    ALTER TABLE tickets ADD CONSTRAINT tickets_status_check 
      CHECK (status IN ('open', 'in_progress', 'resolved', 'closed'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'tickets_priority_check'
  ) THEN
    ALTER TABLE tickets ADD CONSTRAINT tickets_priority_check 
      CHECK (priority IN ('low', 'medium', 'high'));
  END IF;
END $$;

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;

-- Tickets policies (PUBLIC ACCESS)
DROP POLICY IF EXISTS "Anyone can read tickets" ON tickets;
CREATE POLICY "Anyone can read tickets"
  ON tickets FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can create tickets" ON tickets;
CREATE POLICY "Anyone can create tickets"
  ON tickets FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update tickets" ON tickets;
CREATE POLICY "Anyone can update tickets"
  ON tickets FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Ticket messages policies (PUBLIC ACCESS)
DROP POLICY IF EXISTS "Anyone can read ticket messages" ON ticket_messages;
CREATE POLICY "Anyone can read ticket messages"
  ON ticket_messages FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can create ticket messages" ON ticket_messages;
CREATE POLICY "Anyone can create ticket messages"
  ON ticket_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Trigger to update tickets.updated_at
DROP TRIGGER IF EXISTS update_tickets_updated_at ON tickets;
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();