import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Clock, Calendar, IndianRupee, X, AlertTriangle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'
import { toast } from 'react-hot-toast'

interface Booking {
  id: string
  duration_hours: number
  total_cost: number
  booking_time: string
  status: string
  cancellation_reason?: string
  cars: {
    id: string
    name: string
    category: string
    fuel_type: string
    image_url: string
  }
}

interface CancelModalProps {
  booking: Booking | null
  isOpen: boolean
  onClose: () => void
  onCancel: (bookingId: string, reason: string) => void
}

const CancelModal: React.FC<CancelModalProps> = ({ booking, isOpen, onClose, onCancel }) => {
  const [reason, setReason] = useState('')
  const { currentTheme } = useTheme()

  const handleCancel = () => {
    if (!reason.trim()) {
      toast.error('Please provide a cancellation reason')
      return
    }
    if (booking) {
      onCancel(booking.id, reason)
      setReason('')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && booking && (
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
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-2`}>
                  Cancel Booking
                </h3>
                <p className={`${currentTheme.textSecondary}`}>
                  Are you sure you want to cancel your booking for {booking.cars.name}?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${currentTheme.textPrimary} mb-2`}>
                    Reason for Cancellation
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please provide a reason for cancellation..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none h-24"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex-1"
                  >
                    Keep Booking
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="flex-1 bg-red-500 hover:bg-red-600"
                  >
                    Cancel Booking
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export const MyCarsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const { user } = useAuth()
  const { currentTheme } = useTheme()

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user])

  const fetchBookings = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          cars!inner (
            id,
            name,
            category,
            fuel_type,
            image_url
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching bookings:', error)
        toast.error('Error fetching bookings: ' + error.message)
        return
      }

      setBookings(data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error('Error fetching bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId: string, reason: string) => {
    try {
      // Update booking status and add cancellation reason
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          cancellation_reason: reason
        })
        .eq('id', bookingId)

      if (bookingError) {
        console.error('Error cancelling booking:', bookingError)
        toast.error('Error cancelling booking: ' + bookingError.message)
        return
      }

      // Get booking details for car update
      const booking = bookings.find(b => b.id === bookingId)
      if (booking) {
        // Make car available again
        await supabase
          .from('cars')
          .update({ is_available: true })
          .eq('id', booking.cars.id)

        // Get user profile for notification
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single()

        // Create notification for admin
        await supabase
          .from('notifications')
          .insert({
            type: 'cancellation',
            title: 'Booking Cancelled',
            message: `Booking cancelled by ${profile?.name || 'User'} (${profile?.mobile || 'N/A'}) for ${booking.cars.name}. Reason: ${reason}`,
            booking_id: bookingId
          })
      }

      toast.success('Booking cancelled successfully')
      setCancelModalOpen(false)
      setSelectedBooking(null)
      fetchBookings() // Refresh the list
    } catch (error) {
      console.error('Error cancelling booking:', error)
      toast.error('Error cancelling booking')
    }
  }

  const openCancelModal = (booking: Booking) => {
    setSelectedBooking(booking)
    setCancelModalOpen(true)
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-3xl md:text-4xl font-bold ${currentTheme.textPrimary} mb-2`}>
            My Cars
          </h1>
          <p className={`text-lg ${currentTheme.textSecondary}`}>
            Manage your current car rentals
          </p>
        </motion.div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Car className={`w-16 h-16 mx-auto mb-4 ${currentTheme.textSecondary}`} />
            <p className={`text-xl ${currentTheme.textSecondary} mb-2`}>
              No active rentals
            </p>
            <p className={`${currentTheme.textSecondary}`}>
              Book a car from the home page to see your rentals here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="overflow-hidden">
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <img
                      src={booking.cars.image_url}
                      alt={booking.cars.name}
                      className="w-full md:w-32 h-32 object-cover rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'
                      }}
                    />
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className={`text-xl font-bold ${currentTheme.textPrimary} mb-1`}>
                          {booking.cars.name}
                        </h3>
                        <p className={`${currentTheme.textSecondary} capitalize`}>
                          {booking.cars.category} • {booking.cars.fuel_type}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className={`flex items-center ${currentTheme.textSecondary}`}>
                          <Calendar className="w-4 h-4 mr-2" />
                          <div>
                            <p className="font-medium">Booked</p>
                            <p>{new Date(booking.booking_time).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className={`flex items-center ${currentTheme.textSecondary}`}>
                          <Clock className="w-4 h-4 mr-2" />
                          <div>
                            <p className="font-medium">Duration</p>
                            <p>{booking.duration_hours} hour{booking.duration_hours !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        
                        <div className={`flex items-center ${currentTheme.textSecondary}`}>
                          <IndianRupee className="w-4 h-4 mr-2" />
                          <div>
                            <p className="font-medium">Total Cost</p>
                            <p className="font-bold">₹{booking.total_cost}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold text-center bg-gradient-to-r ${currentTheme.primary} text-white`}>
                        ACTIVE
                      </div>
                      <Button
                        onClick={() => openCancelModal(booking)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <CancelModal
        booking={selectedBooking}
        isOpen={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false)
          setSelectedBooking(null)
        }}
        onCancel={handleCancelBooking}
      />
    </div>
  )
}