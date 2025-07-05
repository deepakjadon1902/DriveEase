/*
  # Create database indexes for better performance

  1. Indexes
    - Create indexes on frequently queried columns
    - Improve performance for car searches, bookings, and notifications
    - Optimize admin queries and user-specific data retrieval
*/

-- Indexes for cars table
CREATE INDEX IF NOT EXISTS idx_cars_category ON cars(category);
CREATE INDEX IF NOT EXISTS idx_cars_is_available ON cars(is_available);
CREATE INDEX IF NOT EXISTS idx_cars_fuel_type ON cars(fuel_type);
CREATE INDEX IF NOT EXISTS idx_cars_created_at ON cars(created_at);

-- Indexes for bookings table
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_car_id ON bookings(car_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_time ON bookings(booking_time);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Indexes for notifications table
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_booking_id ON notifications(booking_id);

-- Indexes for profiles table
CREATE INDEX IF NOT EXISTS idx_profiles_mobile ON profiles(mobile);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at);