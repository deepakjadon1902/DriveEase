import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  const { currentTheme } = useTheme()

  return (
    <motion.div
      className={`${currentTheme.glassEffect} rounded-2xl p-6 shadow-lg ${className}`}
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}