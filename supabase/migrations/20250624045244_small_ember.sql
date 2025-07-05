/*
  # Create cars table

  1. New Tables
    - `cars`
      - `id` (uuid, primary key)
      - `name` (text, car name)
      - `category` (text, car category: eco, suv, convertible, sports, luxury, sedan)
      - `fuel_type` (text, fuel type: petrol, diesel, electric, hybrid)
      - `hourly_rate` (integer, rate per hour in rupees)
      - `image_url` (text, car image URL)
      - `is_available` (boolean, availability status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `cars` table
    - Add policy for all authenticated users to read cars
    - Add policy for admin to manage cars (insert, update, delete)
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('eco', 'suv', 'convertible', 'sports', 'luxury', 'sedan')),
  fuel_type text NOT NULL CHECK (fuel_type IN ('petrol', 'diesel', 'electric', 'hybrid')),
  hourly_rate integer NOT NULL CHECK (hourly_rate > 0),
  image_url text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read cars
CREATE POLICY "Authenticated users can read cars"
  ON cars
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admin can insert cars
CREATE POLICY "Admin can insert cars"
  ON cars
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Only admin can update cars
CREATE POLICY "Admin can update cars"
  ON cars
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Only admin can delete cars
CREATE POLICY "Admin can delete cars"
  ON cars
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'deepakjadon1902@gmail.com'
    )
  );

-- Create trigger for cars
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();