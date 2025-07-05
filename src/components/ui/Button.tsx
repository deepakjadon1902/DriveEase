import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const { currentTheme } = useTheme()

  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-30
    disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95
  `

  const variantClasses = {
    primary: `bg-gradient-to-r ${currentTheme.primary} text-white shadow-lg hover:shadow-xl focus:ring-blue-300`,
    secondary: `bg-gradient-to-r ${currentTheme.secondary} text-white shadow-md hover:shadow-lg focus:ring-blue-200`,
    outline: `border-2 border-current ${currentTheme.textPrimary} bg-transparent hover:bg-opacity-10 focus:ring-blue-200`
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  )
}