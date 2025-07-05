/*
  # Insert sample cars data

  1. Sample Data
    - Insert sample cars across all categories
    - Each category has 2-3 cars with different fuel types
    - All cars are initially available
    - Pricing varies by category and car type
*/

-- Insert sample cars for each category
INSERT INTO cars (name, category, fuel_type, hourly_rate, image_url, is_available) VALUES
  -- Eco Cars
  ('Tata Nexon EV', 'eco', 'electric', 120, 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg', true),
  ('Maruti Suzuki S-Presso CNG', 'eco', 'hybrid', 80, 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg', true),
  ('Hyundai Grand i10 Nios', 'eco', 'petrol', 90, 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', true),

  -- SUV Cars
  ('Mahindra Thar', 'suv', 'diesel', 200, 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg', true),
  ('Tata Safari', 'suv', 'diesel', 180, 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg', true),
  ('Hyundai Creta', 'suv', 'petrol', 160, 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg', true),

  -- Convertible Cars
  ('BMW Z4 Roadster', 'convertible', 'petrol', 500, 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg', true),
  ('Audi A3 Cabriolet', 'convertible', 'petrol', 450, 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg', true),

  -- Sports Cars
  ('Ford Mustang', 'sports', 'petrol', 800, 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg', true),
  ('Chevrolet Camaro', 'sports', 'petrol', 750, 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg', true),
  ('BMW M3', 'sports', 'petrol', 900, 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg', true),

  -- Luxury Cars
  ('Mercedes-Benz S-Class', 'luxury', 'petrol', 1200, 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', true),
  ('BMW 7 Series', 'luxury', 'diesel', 1100, 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg', true),
  ('Audi A8', 'luxury', 'petrol', 1150, 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg', true),

  -- Sedan Cars
  ('Honda City', 'sedan', 'petrol', 100, 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg', true),
  ('Maruti Suzuki Dzire', 'sedan', 'petrol', 85, 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg', true),
  ('Hyundai Verna', 'sedan', 'diesel', 110, 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg', true),
  ('Toyota Camry', 'sedan', 'hybrid', 250, 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', true);