import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  const { currentTheme } = useTheme()

  return (
    <div className="space-y-1">
      {label && (
        <label className={`block text-sm font-medium ${currentTheme.textPrimary}`}>
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl border border-gray-200 
          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
          transition-all duration-200 bg-white/80 backdrop-blur-sm
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}