import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LoginForm } from './components/auth/LoginForm'
import { RegisterForm } from './components/auth/RegisterForm'
import { HomePage } from './components/pages/HomePage'
import { MyCarsPage } from './components/pages/MyCarsPage'
import { ProfilePage } from './components/pages/ProfilePage'
import { AboutPage } from './components/pages/AboutPage'
import { AdminPage } from './components/pages/AdminPage'
import { HelpCenterPage } from './components/pages/HelpCenterPage'
import { TermsPage } from './components/pages/TermsPage'
import { PrivacyPage } from './components/pages/PrivacyPage'
import { CookiePage } from './components/pages/CookiePage'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

const AuthWrapper: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
    )
  }

  return <MainApp />
}

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />
      case 'my-cars':
        return <MyCarsPage />
      case 'profile':
        return <ProfilePage />
      case 'about':
        return <AboutPage />
      case 'admin':
        return <AdminPage />
      case 'help':
        return <HelpCenterPage />
      case 'terms':
        return <TermsPage />
      case 'privacy':
        return <PrivacyPage />
      case 'cookies':
        return <CookiePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1">
        {renderPage()}
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AuthWrapper />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#1f2937',
              },
            }}
          />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App