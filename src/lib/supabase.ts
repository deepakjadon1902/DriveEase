import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          address: string
          mobile: string
          date_of_birth: string
          aadhar_number: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          address: string
          mobile: string
          date_of_birth: string
          aadhar_number: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          mobile?: string
          date_of_birth?: string
          aadhar_number?: string
          created_at?: string
          updated_at?: string
        }
      }
      cars: {
        Row: {
          id: string
          name: string
          category: string
          fuel_type: string
          hourly_rate: number
          image_url: string
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          fuel_type: string
          hourly_rate: number
          image_url: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          fuel_type?: string
          hourly_rate?: number
          image_url?: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          car_id: string
          duration_hours: number
          total_cost: number
          status: string
          booking_time: string
          cancellation_reason?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          car_id: string
          duration_hours: number
          total_cost: number
          status?: string
          booking_time: string
          cancellation_reason?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          car_id?: string
          duration_hours?: number
          total_cost?: number
          status?: string
          booking_time?: string
          cancellation_reason?: string
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          type: string
          title: string
          message: string
          user_id?: string
          booking_id?: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          title: string
          message: string
          user_id?: string
          booking_id?: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          title?: string
          message?: string
          user_id?: string
          booking_id?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}