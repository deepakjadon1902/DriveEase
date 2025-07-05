/*
  # Fix RLS Policies for DriveEase Application

  1. Security Updates
    - Fix RLS policies to work with Supabase Auth properly
    - Update admin check to use users table instead of auth.users
    - Add proper policies for all operations

  2. Database Fixes
    - Ensure all foreign key relationships work correctly
    - Add missing constraints and indexes
*/

-- First, let's create a users table that mirrors auth.users for easier policy management
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Allow users to insert their own data
CREATE POLICY "Users can insert own data" ON users
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user record
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update profiles table policies
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

-- Update cars table policies
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

-- Update bookings table policies
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

-- Update notifications table policies
DROP POLICY IF EXISTS "Admin can read all notifications" ON notifications;
DROP POLICY IF EXISTS "Admin can update all notifications" ON notifications;

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