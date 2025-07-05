/*
  # Create notifications table

  1. New Tables
    - `notifications`
      - `id` (uuid, primary key)
      - `type` (text, notification type: booking, cancellation, admin)
      - `title` (text, notification title)
      - `message` (text, notification message)
      - `user_id` (uuid, optional, references profiles.id)
      - `booking_id` (uuid, optional, references bookings.id)
      - `is_read` (boolean, read status)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `notifications` table
    - Add policy for admin to read all notifications
    - Add policy for users to read their own notifications
    - Add policy for authenticated users to create notifications
    - Add policy for admin to update notifications (mark as read)
*/

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('booking', 'cancellation', 'admin', 'system')),
  title text NOT NULL,
  message text NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Admin can read all notifications
CREATE POLICY "Admin can read all notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users can create notifications
CREATE POLICY "Authenticated users can create notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admin can update all notifications
CREATE POLICY "Admin can update all notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);