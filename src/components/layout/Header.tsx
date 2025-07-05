import React from 'react'
import { motion } from 'framer-motion'
import { User, Home, Info, LogOut, Settings, HelpCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-hot-toast'

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

// Custom Car Logo Component
const CarLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
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

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { user, isAdmin } = useAuth()
  const { currentTheme } = useTheme()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Logged out successfully!')
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'my-cars', label: 'My Cars', icon: User },
    { id: 'profile', label: 'Profile', icon: User },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Settings }] : [])
  ]

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 ${currentTheme.glassEffect} backdrop-blur-xl border-b border-white/20`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <motion.div 
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <CarLogo className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className={`text-xl font-bold ${currentTheme.textPrimary}`}>
                DriveEase
              </h1>
              <p className={`text-xs ${currentTheme.textSecondary}`}>
                Smart. Stylish. Seamless.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    relative flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200
                    ${isActive 
                      ? `bg-gradient-to-r ${currentTheme.primary} text-white shadow-lg` 
                      : `${currentTheme.textSecondary} hover:bg-white/20`
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-xl"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center space-x-1">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    flex items-center p-2 rounded-xl transition-all duration-200
                    ${isActive 
                      ? `bg-gradient-to-r ${currentTheme.primary} text-white` 
                      : `${currentTheme.textSecondary} hover:bg-white/20`
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              )
            })}
          </nav>
          
          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            className={`flex items-center px-4 py-2 ${currentTheme.textSecondary} hover:bg-red-500/20 hover:text-red-600 rounded-xl transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}