/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `car_id` (uuid, references cars.id)
      - `duration_hours` (integer, rental duration in hours)
      - `total_cost` (integer, total cost in rupees)
      - `status` (text, booking status: active, cancelled, completed)
      - `booking_time` (timestamp, when the booking was made)
      - `cancellation_reason` (text, optional cancellation reason)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for users to read their own bookings
    - Add policy for users to create their own bookings
    - Add policy for users to update their own bookings (for cancellation)
    - Add policy for admin to read all bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  car_id uuid NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  duration_hours integer NOT NULL CHECK (duration_hours > 0),
  total_cost integer NOT NULL CHECK (total_cost > 0),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  booking_time timestamptz NOT NULL,
  cancellation_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Users can read their own bookings
CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users can create own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings (for cancellation)
CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin can read all bookings
CREATE POLICY "Admin can read all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Admin can update all bookings
CREATE POLICY "Admin can update all bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Create trigger for bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();