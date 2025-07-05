import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Bell, Car, Upload, X, Eye, Search, Wand2, MessageSquare, Clock, User, Mail, Phone, CheckCircle, AlertTriangle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { CarImageService } from '../../utils/carImageService'
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

interface Notification {
  id: string
  type: string
  title: string
  message: string
  user_id?: string
  booking_id?: string
  is_read: boolean
  created_at: string
}

interface Booking {
  id: string
  duration_hours: number
  total_cost: number
  booking_time: string
  status: string
  user_id: string
  car_id: string
  profiles: {
    name: string
    mobile: string
    address: string
  } | null
  cars: {
    name: string
    category: string
  } | null
}

const CarModal: React.FC<{
  car: Car | null
  isOpen: boolean
  onClose: () => void
  onSave: (car: Partial<Car>) => void
  isEditing: boolean
}> = ({ car, isOpen, onClose, onSave, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'sedan',
    fuel_type: 'petrol',
    hourly_rate: 100,
    image_url: ''
  })
  const [saving, setSaving] = useState(false)
  const [fetchingImage, setFetchingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const { currentTheme } = useTheme()

  useEffect(() => {
    if (car && isEditing) {
      setFormData({
        name: car.name,
        category: car.category,
        fuel_type: car.fuel_type,
        hourly_rate: car.hourly_rate,
        image_url: car.image_url
      })
      setImagePreview(car.image_url)
    } else if (!isEditing) {
      setFormData({
        name: '',
        category: 'sedan',
        fuel_type: 'petrol',
        hourly_rate: 100,
        image_url: ''
      })
      setImagePreview('')
    }
  }, [car, isEditing, isOpen])

  const handleAutoFetchImage = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter car name first')
      return
    }

    setFetchingImage(true)
    try {
      const imageUrl = await CarImageService.getCarImageUrl(formData.name, formData.category)
      setFormData(prev => ({ ...prev, image_url: imageUrl }))
      setImagePreview(imageUrl)
      toast.success('Car image fetched automatically!')
    } catch (error) {
      console.error('Error fetching car image:', error)
      toast.error('Failed to fetch car image')
    } finally {
      setFetchingImage(false)
    }
  }

  const handleNameChange = async (name: string) => {
    setFormData(prev => ({ ...prev, name }))
    
    // Auto-fetch image when name changes (debounced)
    if (name.trim().length > 3) {
      setTimeout(async () => {
        if (formData.name === name && !formData.image_url) {
          try {
            const imageUrl = await CarImageService.getCarImageUrl(name, formData.category)
            setFormData(prev => ({ ...prev, image_url: imageUrl }))
            setImagePreview(imageUrl)
          } catch (error) {
            console.error('Auto-fetch failed:', error)
          }
        }
      }, 1000)
    }
  }

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }))
    setImagePreview(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Car name is required')
      return
    }
    
    if (!formData.image_url.trim()) {
      toast.error('Image URL is required')
      return
    }
    
    if (formData.hourly_rate <= 0) {
      toast.error('Hourly rate must be greater than 0')
      return
    }

    setSaving(true)
    try {
      await onSave(formData)
    } finally {
      setSaving(false)
    }
  }

  const categories = ['eco', 'suv', 'convertible', 'sports', 'luxury', 'sedan']
  const fuelTypes = ['petrol', 'diesel', 'electric', 'hybrid']

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
            <GlassCard className="w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-red-500/20 rounded-full transition-colors z-10"
                disabled={saving}
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-6`}>
                {isEditing ? 'Edit Car' : 'Add New Car'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Car Name"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g., Tata Nexon EV, BMW 3 Series"
                      required
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.textPrimary} mb-2`}>
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      disabled={saving}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.textPrimary} mb-2`}>
                      Fuel Type
                    </label>
                    <select
                      value={formData.fuel_type}
                      onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      disabled={saving}
                    >
                      {fuelTypes.map(fuel => (
                        <option key={fuel} value={fuel}>{fuel.charAt(0).toUpperCase() + fuel.slice(1)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <Input
                      label="Hourly Rate (₹)"
                      type="number"
                      min="1"
                      value={formData.hourly_rate}
                      onChange={(e) => setFormData({ ...formData, hourly_rate: parseInt(e.target.value) || 1 })}
                      required
                      disabled={saving}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${currentTheme.textPrimary} mb-2`}>
                      Car Image
                    </label>
                    
                    {/* Auto-fetch button */}
                    <div className="flex gap-2 mb-3">
                      <Button
                        type="button"
                        onClick={handleAutoFetchImage}
                        disabled={fetchingImage || saving || !formData.name.trim()}
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        {fetchingImage ? (
                          <motion.div
                            className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          />
                        ) : (
                          <Wand2 className="w-4 h-4 mr-2" />
                        )}
                        {fetchingImage ? 'Fetching...' : 'Auto-Fetch Image'}
                      </Button>
                      
                      <span className={`text-sm ${currentTheme.textSecondary} self-center`}>
                        or enter URL manually below
                      </span>
                    </div>

                    <Input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      placeholder="https://example.com/car-image.jpg"
                      required
                      disabled={saving}
                    />

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-3">
                        <p className={`text-sm font-medium ${currentTheme.textPrimary} mb-2`}>
                          Preview:
                        </p>
                        <img
                          src={imagePreview}
                          alt="Car preview"
                          className="w-full h-48 object-cover rounded-xl border border-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = CarImageService.getCarImageFromDatabase(formData.name, formData.category)
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    onClick={onClose} 
                    variant="outline" 
                    className="flex-1"
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={saving || fetchingImage}>
                    {saving ? 'Saving...' : (isEditing ? 'Update Car' : 'Add Car')}
                  </Button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cars' | 'bookings' | 'notifications'>('cars')
  const [cars, setCars] = useState<Car[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const { isAdmin, user } = useAuth()
  const { currentTheme } = useTheme()

  useEffect(() => {
    if (isAdmin) {
      fetchData()
      // Set up real-time subscriptions for notifications
      setupRealtimeSubscriptions()
    }
  }, [isAdmin])

  const setupRealtimeSubscriptions = () => {
    // Subscribe to new notifications
    const notificationsSubscription = supabase
      .channel('notifications')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          console.log('New notification received:', payload.new)
          setNotifications(prev => [payload.new as Notification, ...prev])
          toast.success('New notification received!')
        }
      )
      .subscribe()

    return () => {
      notificationsSubscription.unsubscribe()
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch cars
      console.log('Fetching cars...')
      const { data: carsData, error: carsError } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false })

      if (carsError) {
        console.error('Cars fetch error:', carsError)
        toast.error('Error fetching cars: ' + carsError.message)
      } else {
        console.log('Cars fetched:', carsData?.length || 0)
        setCars(carsData || [])
      }

      // Fetch bookings with profiles and cars data
      console.log('Fetching bookings...')
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles (name, mobile, address),
          cars (name, category)
        `)
        .order('created_at', { ascending: false })

      if (bookingsError) {
        console.error('Bookings fetch error:', bookingsError)
        toast.error('Error fetching bookings: ' + bookingsError.message)
      } else {
        console.log('Bookings fetched:', bookingsData?.length || 0)
        setBookings(bookingsData || [])
      }

      // Fetch notifications
      console.log('Fetching notifications...')
      const { data: notificationsData, error: notificationsError } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })

      if (notificationsError) {
        console.error('Notifications fetch error:', notificationsError)
        toast.error('Error fetching notifications: ' + notificationsError.message)
      } else {
        console.log('Notifications fetched:', notificationsData?.length || 0)
        setNotifications(notificationsData || [])
      }

    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddCar = () => {
    setEditingCar(null)
    setModalOpen(true)
  }

  const handleEditCar = (car: Car) => {
    setEditingCar(car)
    setModalOpen(true)
  }

  const handleSaveCar = async (carData: Partial<Car>) => {
    try {
      console.log('Saving car data:', carData)
      
      if (editingCar) {
        // Update existing car
        console.log('Updating car:', editingCar.id)
        const { data, error } = await supabase
          .from('cars')
          .update(carData)
          .eq('id', editingCar.id)
          .select()

        if (error) {
          console.error('Update car error:', error)
          toast.error('Error updating car: ' + error.message)
          return
        }
        
        console.log('Car updated successfully:', data)
        toast.success('Car updated successfully!')
      } else {
        // Add new car
        console.log('Adding new car')
        const { data, error } = await supabase
          .from('cars')
          .insert([carData])
          .select()

        if (error) {
          console.error('Insert car error:', error)
          toast.error('Error adding car: ' + error.message)
          return
        }
        
        console.log('Car added successfully:', data)
        toast.success('Car added successfully!')
      }

      setModalOpen(false)
      setEditingCar(null)
      await fetchData() // Refresh data
    } catch (error) {
      console.error('Error saving car:', error)
      toast.error('Error saving car')
    }
  }

  const handleDeleteCar = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return

    try {
      console.log('Deleting car:', carId)
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId)

      if (error) {
        console.error('Delete car error:', error)
        toast.error('Error deleting car: ' + error.message)
        return
      }

      console.log('Car deleted successfully')
      toast.success('Car deleted successfully!')
      await fetchData() // Refresh data
    } catch (error) {
      console.error('Error deleting car:', error)
      toast.error('Error deleting car')
    }
  }

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)

      if (error) {
        console.error('Update notification error:', error)
        toast.error('Error updating notification')
        return
      }

      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      )
      toast.success('Notification marked as read')
    } catch (error) {
      console.error('Error updating notification:', error)
      toast.error('Error updating notification')
    }
  }

  if (!isAdmin) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${currentTheme.background}`}>
        <div className="text-center">
          <p className={`text-xl ${currentTheme.textSecondary}`}>
            Access denied. Admin privileges required.
          </p>
        </div>
      </div>
    )
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
          className="text-center mb-8"
        >
          <h1 className={`text-3xl md:text-4xl font-bold ${currentTheme.textPrimary} mb-2`}>
            Admin Dashboard
          </h1>
          <p className={`text-lg ${currentTheme.textSecondary}`}>
            Manage cars, bookings, and notifications
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <GlassCard className="p-2">
            <div className="flex space-x-2 overflow-x-auto">
              {[
                { id: 'cars', label: 'Cars', icon: Car },
                { id: 'bookings', label: 'Bookings', icon: Eye },
                { id: 'notifications', label: 'Notifications', icon: Bell }
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap
                      ${isActive 
                        ? `bg-gradient-to-r ${currentTheme.primary} text-white shadow-lg` 
                        : `${currentTheme.textSecondary} hover:bg-white/20`
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                    {tab.id === 'notifications' && notifications.filter(n => !n.is_read).length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications.filter(n => !n.is_read).length}
                      </span>
                    )}
                    {tab.id === 'bookings' && bookings.length > 0 && (
                      <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {bookings.length}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </GlassCard>
        </div>

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className={`text-2xl font-bold ${currentTheme.textPrimary}`}>
                Car Management ({cars.length} cars)
              </h2>
              <Button onClick={handleAddCar}>
                <Plus className="w-5 h-5 mr-2" />
                Add New Car
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <GlassCard key={car.id}>
                  <img
                    src={car.image_url}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = CarImageService.getCarImageFromDatabase(car.name, car.category)
                    }}
                  />
                  <div className="space-y-3">
                    <div>
                      <h3 className={`text-xl font-bold ${currentTheme.textPrimary}`}>
                        {car.name}
                      </h3>
                      <p className={`${currentTheme.textSecondary} capitalize`}>
                        {car.category} • {car.fuel_type}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${currentTheme.textPrimary}`}>
                        ₹{car.hourly_rate}/hr
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        car.is_available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {car.is_available ? 'Available' : 'Rented'}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEditCar(car)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteCar(car.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {cars.length === 0 && (
              <div className="text-center py-12">
                <Car className={`w-16 h-16 mx-auto mb-4 ${currentTheme.textSecondary}`} />
                <p className={`text-xl ${currentTheme.textSecondary}`}>
                  No cars added yet
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary}`}>
              All Bookings ({bookings.length} total)
            </h2>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <GlassCard key={booking.id}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <h3 className={`text-lg font-bold ${currentTheme.textPrimary}`}>
                          {booking.cars?.name || 'Unknown Car'}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          booking.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      <p className={`${currentTheme.textSecondary}`}>
                        <strong>Customer:</strong> {booking.profiles?.name || 'Unknown'} ({booking.profiles?.mobile || 'N/A'})
                      </p>
                      <p className={`${currentTheme.textSecondary}`}>
                        <strong>Address:</strong> {booking.profiles?.address || 'N/A'}
                      </p>
                      <p className={`${currentTheme.textSecondary}`}>
                        <strong>Duration:</strong> {booking.duration_hours} hours • 
                        <strong> Total:</strong> ₹{booking.total_cost}
                      </p>
                      <p className={`${currentTheme.textSecondary} text-sm`}>
                        <strong>Booked:</strong> {new Date(booking.booking_time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
              
              {bookings.length === 0 && (
                <div className="text-center py-12">
                  <Eye className={`w-16 h-16 mx-auto mb-4 ${currentTheme.textSecondary}`} />
                  <p className={`text-xl ${currentTheme.textSecondary}`}>
                    No bookings yet
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary}`}>
              All Notifications ({notifications.filter(n => !n.is_read).length} unread)
            </h2>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <GlassCard 
                  key={notification.id}
                  className={`${!notification.is_read ? 'ring-2 ring-blue-300' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-bold ${currentTheme.textPrimary}`}>
                          {notification.title}
                        </h3>
                        {!notification.is_read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <div className={`${currentTheme.textSecondary} whitespace-pre-line`}>
                        {notification.message}
                      </div>
                      <p className={`text-xs ${currentTheme.textSecondary}`}>
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                    {!notification.is_read && (
                      <Button
                        onClick={() => markNotificationAsRead(notification.id)}
                        variant="outline"
                        size="sm"
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </GlassCard>
              ))}
              
              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className={`w-16 h-16 mx-auto mb-4 ${currentTheme.textSecondary}`} />
                  <p className={`text-xl ${currentTheme.textSecondary}`}>
                    No notifications yet
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <CarModal
        car={editingCar}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingCar(null)
        }}
        onSave={handleSaveCar}
        isEditing={!!editingCar}
      />
    </div>
  )
}