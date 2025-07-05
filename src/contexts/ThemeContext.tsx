import React, { createContext, useContext, useState } from 'react'

export type CarCategory = 'eco' | 'suv' | 'convertible' | 'sports' | 'luxury' | 'sedan'

interface Theme {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  gradient: string
  textPrimary: string
  textSecondary: string
  glassEffect: string
}

const themes: Record<CarCategory, Theme> = {
  eco: {
    name: '🌿 Nature Green',
    primary: 'from-green-400 to-emerald-600',
    secondary: 'from-lime-300 to-green-500',
    accent: 'bg-green-500',
    background: 'bg-gradient-to-br from-green-50 to-emerald-100',
    gradient: 'bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600',
    textPrimary: 'text-green-900',
    textSecondary: 'text-green-700',
    glassEffect: 'bg-green-500/10 backdrop-blur-lg border border-green-200/20'
  },
  suv: {
    name: '🌲 Deep Forest',
    primary: 'from-green-700 to-green-900',
    secondary: 'from-green-600 to-forest-800',
    accent: 'bg-green-700',
    background: 'bg-gradient-to-br from-green-900/5 to-green-800/10',
    gradient: 'bg-gradient-to-r from-green-800 via-green-700 to-green-900',
    textPrimary: 'text-green-900',
    textSecondary: 'text-green-800',
    glassEffect: 'bg-green-700/10 backdrop-blur-lg border border-green-300/20'
  },
  convertible: {
    name: '☀️ Sky Cruise',
    primary: 'from-blue-400 to-sky-600',
    secondary: 'from-cyan-300 to-blue-500',
    accent: 'bg-blue-500',
    background: 'bg-gradient-to-br from-sky-50 to-blue-100',
    gradient: 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600',
    textPrimary: 'text-blue-900',
    textSecondary: 'text-blue-700',
    glassEffect: 'bg-blue-500/10 backdrop-blur-lg border border-blue-200/20'
  },
  sports: {
    name: '🔥 Inferno Speed',
    primary: 'from-red-500 to-orange-600',
    secondary: 'from-orange-400 to-red-500',
    accent: 'bg-red-500',
    background: 'bg-gradient-to-br from-red-50 to-orange-100',
    gradient: 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-600',
    textPrimary: 'text-red-900',
    textSecondary: 'text-red-700',
    glassEffect: 'bg-red-500/10 backdrop-blur-lg border border-red-200/20'
  },
  luxury: {
    name: '🖤 Black Diamond',
    primary: 'from-gray-800 to-black',
    secondary: 'from-gray-700 to-gray-900',
    accent: 'bg-gray-800',
    background: 'bg-gradient-to-br from-gray-900/5 to-black/10',
    gradient: 'bg-gradient-to-r from-gray-800 via-gray-900 to-black',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-800',
    glassEffect: 'bg-gray-800/10 backdrop-blur-lg border border-gray-300/20'
  },
  sedan: {
    name: '⚪ Urban Pearl',
    primary: 'from-gray-300 to-gray-500',
    secondary: 'from-gray-200 to-gray-400',
    accent: 'bg-gray-400',
    background: 'bg-gradient-to-br from-gray-50 to-gray-100',
    gradient: 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-700',
    glassEffect: 'bg-gray-400/10 backdrop-blur-lg border border-gray-200/20'
  }
}

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (category: CarCategory) => void
  themes: Record<CarCategory, Theme>
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themes.sedan,
  setTheme: () => {},
  themes
})

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.sedan)

  const setTheme = (category: CarCategory) => {
    setCurrentTheme(themes[category])
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}