import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { GlassCard } from '../ui/GlassCard'
import { useTheme } from '../../contexts/ThemeContext'
import { toast } from 'react-hot-toast'

interface LoginFormProps {
  onSwitchToRegister: () => void
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

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { currentTheme } = useTheme()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Welcome back to DriveEase!')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${currentTheme.background}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
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
              Welcome Back
            </h1>
            <p className={`${currentTheme.textSecondary}`}>
              Sign in to your DriveEase account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className={`${currentTheme.textSecondary}`}>
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className={`font-semibold ${currentTheme.textPrimary} hover:underline`}
              >
                Sign up now
              </button>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}