import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Phone, MapPin, Calendar, CreditCard } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { GlassCard } from '../ui/GlassCard'
import { useTheme } from '../../contexts/ThemeContext'
import { toast } from 'react-hot-toast'

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

// Custom Car Logo Component
const CarLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
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
      className="text-white"
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

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    mobile: '',
    dateOfBirth: '',
    aadharNumber: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { currentTheme } = useTheme()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile number must be 10 digits'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        console.error('Auth error:', authError)
        toast.error(authError.message)
        return
      }

      if (authData.user) {
        // Create user record in users table
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: authData.user.email || formData.email
          })

        if (userError) {
          console.error('User creation error:', userError)
          // Don't fail registration if user record creation fails
        }

        // Create user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            name: formData.name,
            address: formData.address,
            mobile: formData.mobile,
            date_of_birth: formData.dateOfBirth,
            aadhar_number: formData.aadharNumber
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
          toast.error('Error creating profile')
          return
        }

        toast.success('Registration successful! Please sign in.')
        onSwitchToLogin()
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${currentTheme.background}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <GlassCard className="relative overflow-hidden">
          <div className="text-center mb-8">
            <motion.div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${currentTheme.primary} mb-4 shadow-lg`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <CarLogo className="w-8 h-8" />
            </motion.div>
            <h1 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-2`}>
              Join DriveEase
            </h1>
            <p className={`${currentTheme.textSecondary}`}>
              Create your account to start renting cars
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  error={errors.mobile}
                  className="pl-12"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="date"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  error={errors.dateOfBirth}
                  className="pl-12"
                />
              </div>

              <div className="relative md:col-span-2">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`w-full pl-12 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none h-20 ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
              </div>

              <div className="relative md:col-span-2">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Aadhar Card Number"
                  value={formData.aadharNumber}
                  onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                  error={errors.aadharNumber}
                  className="pl-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className={`${currentTheme.textSecondary}`}>
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className={`font-semibold ${currentTheme.textPrimary} hover:underline`}
              >
                Sign in here
              </button>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}