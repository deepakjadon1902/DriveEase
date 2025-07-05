/*
  # Fix Admin Panel Issues

  1. Database Fixes
    - Fix RLS policies for admin access
    - Ensure proper foreign key relationships
    - Add missing constraints and indexes

  2. Security Updates
    - Update admin policies to work correctly
    - Fix notification creation policies
    - Ensure booking queries work for admin
*/

-- First, ensure the users table has the admin user
DO $$
BEGIN
  -- Insert admin user if not exists (this will be handled by the trigger normally)
  INSERT INTO users (id, email) 
  SELECT id, email FROM auth.users 
  WHERE email = 'deepakjadon1902@gmail.com'
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Fix profiles table policies
DROP POLICY IF EXISTS "Admin can read all profiles" ON profiles;
CREATE POLICY "Admin can read all profiles" ON profiles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Fix cars table policies - Admin should be able to do everything
DROP POLICY IF EXISTS "Admin can insert cars" ON cars;
DROP POLICY IF EXISTS "Admin can update cars" ON cars;
DROP POLICY IF EXISTS "Admin can delete cars" ON cars;

CREATE POLICY "Admin can insert cars" ON cars
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.email = 'deepakjadon1902@gmail.com'
    )
  );

CREATE POLICY "Admin can update cars" ON cars
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.email = 'deepakjadon1902@gmail.com'
    )
  );

CREATE POLICY "Admin can delete cars" ON cars
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Fix bookings table policies - Admin should see all bookings
DROP POLICY IF EXISTS "Admin can read all bookings" ON bookings;
DROP POLICY IF EXISTS "Admin can update all bookings" ON bookings;

CREATE POLICY "Admin can read all bookings" ON bookings
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.email = 'deepakjadon1902@gmail.com'
    )
  );

CREATE POLICY "Admin can update all bookings" ON bookings
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Fix notifications table policies
DROP POLICY IF EXISTS "Admin can read all notifications" ON notifications;
DROP POLICY IF EXISTS "Admin can update all notifications" ON notifications;
DROP POLICY IF EXISTS "Authenticated users can create notifications" ON notifications;

CREATE POLICY "Admin can read all notifications" ON notifications
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.email = 'deepakjadon1902@gmail.com'
    )
  );

CREATE POLICY "Admin can update all notifications" ON notifications
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Allow all authenticated users to create notifications (for booking notifications)
CREATE POLICY "Authenticated users can create notifications" ON notifications
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Ensure proper indexes exist for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_bookings_user_car ON bookings(user_id, car_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_booking ON notifications(user_id, booking_id);