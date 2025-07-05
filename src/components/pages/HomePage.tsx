import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fuel, Clock, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { toast } from 'react-hot-toast'

interface Car {
  id: string
  name: string
  category: string
  fuel_type: string
  hourly_rate: number
  image_url: string
  is_available: boolean
}

interface BookingModalProps {
  car: Car | null
  isOpen: boolean
  onClose: () => void
  onBook: (carId: string, hours: number) => void
}

// Custom Car Logo Component
const CarLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Car body */}
    <path
      d="M15 65 L20 45 L25 35 L75 35 L80 45 L85 65 L80 70 L75 68 L25 68 L20 70 Z"
      fill="currentColor"
      className="text-blue-600"
    />
    {/* Car windows */}
    <path
      d="M25 45 L30 38 L70 38 L75 45 L70 50 L30 50 Z"
      fill="currentColor"
      className="text-blue-200"
    />
    {/* Car wheels */}
    <circle cx="30" cy="65" r="8" fill="currentColor" className="text-gray-800" />
    <circle cx="70" cy="65" r="8" fill="currentColor" className="text-gray-800" />
    <circle cx="30" cy="65" r="4" fill="currentColor" className="text-gray-400" />
    <circle cx="70" cy="65" r="4" fill="currentColor" className="text-gray-400" />
    {/* Car details */}
    <rect x="40" y="42" width="20" height="2" fill="currentColor" className="text-blue-300" />
    <rect x="45" y="60" width="10" height="3" fill="currentColor" className="text-yellow-400" />
  </svg>
)

const BookingModal: React.FC<BookingModalProps> = ({ car, isOpen, onClose, onBook }) => {
  const [hours, setHours] = useState(1)
  const [booking, setBooking] = useState(false)
  const { currentTheme } = useTheme()

  if (!car) return null

  const totalCost = car.hourly_rate * hours

  const handleBook = async () => {
    setBooking(true)
    try {
      await onBook(car.id, hours)
    } finally {
      setBooking(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <GlassCard className="w-full max-w-md relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-red-500/20 rounded-full transition-colors"
                disabled={booking}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <img
                  src={car.image_url}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-2`}>
                  {car.name}
                </h3>
                <p className={`${currentTheme.textSecondary} capitalize`}>
                  {car.category} • {car.fuel_type}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${currentTheme.textPrimary} mb-2`}>
                    Rental Duration (Hours)
                  </label>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => setHours(Math.max(1, hours - 1))}
                      variant="outline"
                      size="sm"
                      disabled={booking}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={hours}
                      onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center"
                      disabled={booking}
                    />
                    <Button
                      onClick={() => setHours(hours + 1)}
                      variant="outline"
                      size="sm"
                      disabled={booking}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className={`${currentTheme.glassEffect} rounded-xl p-4`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={currentTheme.textSecondary}>Rate per hour:</span>
                    <span className={`font-semibold ${currentTheme.textPrimary}`}>
                      ₹{car.hourly_rate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={currentTheme.textSecondary}>Duration:</span>
                    <span className={`font-semibold ${currentTheme.textPrimary}`}>
                      {hours} hour{hours !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <hr className="border-gray-200 my-2" />
                  <div className="flex justify-between items-center">
                    <span className={`font-bold ${currentTheme.textPrimary}`}>Total Cost:</span>
                    <span className={`text-xl font-bold ${currentTheme.textPrimary}`}>
                      ₹{totalCost}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleBook}
                  className="w-full"
                  disabled={booking}
                >
                  {booking ? 'Booking...' : `Book Now for ₹${totalCost}`}
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export const HomePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const { user } = useAuth()
  const { setTheme, currentTheme } = useTheme()

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching cars:', error)
        toast.error('Error fetching cars')
        return
      }

      setCars(data || [])
    } catch (error) {
      console.error('Error fetching cars:', error)
      toast.error('Error fetching cars')
    } finally {
      setLoading(false)
    }
  }

  const handleBookCar = async (carId: string, hours: number) => {
    if (!user) {
      toast.error('Please log in to book a car')
      return
    }

    try {
      const car = cars.find(c => c.id === carId)
      if (!car) {
        toast.error('Car not found')
        return
      }

      const totalCost = car.hourly_rate * hours

      console.log('Creating booking for user:', user.id, 'car:', carId)

      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          car_id: carId,
          duration_hours: hours,
          total_cost: totalCost,
          booking_time: new Date().toISOString(),
          status: 'active'
        })
        .select()
        .single()

      if (bookingError) {
        console.error('Booking error:', bookingError)
        toast.error('Error creating booking: ' + bookingError.message)
        return
      }

      console.log('Booking created:', booking)

      // Update car availability
      const { error: carUpdateError } = await supabase
        .from('cars')
        .update({ is_available: false })
        .eq('id', carId)

      if (carUpdateError) {
        console.error('Car update error:', carUpdateError)
        toast.error('Error updating car availability')
      }

      // Get user profile for notification
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('Profile fetch error:', profileError)
      }

      // Create notification for admin
      console.log('Creating notification...')
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          type: 'booking',
          title: '🚗 New Car Booking',
          message: `📋 Booking Details:

👤 Customer: ${profile?.name || 'User'}
📱 Mobile: ${profile?.mobile || 'N/A'}
📍 Address: ${profile?.address || 'N/A'}

🚗 Car: ${car.name}
📂 Category: ${car.category}
⏰ Duration: ${hours} hours
💰 Total Cost: ₹${totalCost}

📅 Booked: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
          booking_id: booking.id,
          user_id: null, // Admin notification
          is_read: false
        })

      if (notificationError) {
        console.error('Notification error:', notificationError)
      } else {
        console.log('Notification created successfully')
      }

      toast.success(`${car.name} booked successfully for ${hours} hours!`)
      setBookingModalOpen(false)
      setSelectedCar(null)
      fetchCars() // Refresh the list
    } catch (error) {
      console.error('Error booking car:', error)
      toast.error('Error booking car')
    }
  }

  const openBookingModal = (car: Car) => {
    setSelectedCar(car)
    setBookingModalOpen(true)
    // Set theme based on car category
    setTheme(car.category as any)
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${currentTheme.background}`}>
        <motion.div
          className={`w-16 h-16 border-4 border-t-transparent rounded-full bg-gradient-to-r ${currentTheme.primary}`}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${currentTheme.background} p-4 pt-24`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <CarLogo className="w-20 h-20 mr-4" />
            <div>
              <h1 className={`text-4xl md:text-6xl font-bold ${currentTheme.textPrimary} mb-2`}>
                DriveEase
              </h1>
              <p className={`text-xl ${currentTheme.textSecondary} mb-2`}>
                Smart Car Rental Platform
              </p>
              <p className={`text-lg ${currentTheme.textSecondary}`}>
                Smart. Stylish. Seamless.
              </p>
            </div>
          </div>
        </motion.div>

        {cars.length === 0 ? (
          <div className="text-center py-12">
            <CarLogo className={`w-16 h-16 mx-auto mb-4 ${currentTheme.textSecondary}`} />
            <p className={`text-xl ${currentTheme.textSecondary}`}>
              No cars available at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="overflow-hidden">
                  <div className="relative mb-4">
                    <img
                      src={car.image_url}
                      alt={car.name}
                      className="w-full h-48 object-cover rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'
                      }}
                    />
                    <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${currentTheme.primary} text-white`}>
                      {car.category.toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className={`text-xl font-bold ${currentTheme.textPrimary} mb-1`}>
                        {car.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className={`flex items-center ${currentTheme.textSecondary}`}>
                          <Fuel className="w-4 h-4 mr-1" />
                          {car.fuel_type}
                        </div>
                        <div className={`flex items-center ${currentTheme.textSecondary}`}>
                          <Clock className="w-4 h-4 mr-1" />
                          ₹{car.hourly_rate}/hr
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => openBookingModal(car)}
                      className="w-full"
                    >
                      Rent Car
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BookingModal
        car={selectedCar}
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false)
          setSelectedCar(null)
        }}
        onBook={handleBookCar}
      />
    </div>
  )
}