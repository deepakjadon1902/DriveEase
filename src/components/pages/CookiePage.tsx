import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Cookie, Settings, Shield, BarChart, Target, CheckCircle } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'

export const CookiePage: React.FC = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  })
  const { currentTheme } = useTheme()

  const handlePreferenceChange = (type: string, value: boolean) => {
    if (type === 'essential') return // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [type]: value }))
  }

  const cookieTypes = [
    {
      icon: Shield,
      name: 'Essential Cookies',
      key: 'essential',
      description: 'These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you.',
      examples: ['Authentication', 'Security', 'Form submissions', 'Shopping cart'],
      required: true
    },
    {
      icon: BarChart,
      name: 'Analytics Cookies',
      key: 'analytics',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: ['Page views', 'User behavior', 'Performance metrics', 'Error tracking'],
      required: false
    },
    {
      icon: Target,
      name: 'Marketing Cookies',
      key: 'marketing',
      description: 'These cookies are used to deliver advertisements more relevant to you and your interests.',
      examples: ['Ad targeting', 'Social media integration', 'Remarketing', 'Campaign tracking'],
      required: false
    },
    {
      icon: Settings,
      name: 'Functional Cookies',
      key: 'functional',
      description: 'These cookies enable the website to provide enhanced functionality and personalization.',
      examples: ['Language preferences', 'Theme settings', 'Location data', 'Personalization'],
      required: false
    }
  ]

  const handleSavePreferences = () => {
    // Save preferences to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    alert('Cookie preferences saved successfully!')
  }

  return (
    <div className={`min-h-screen ${currentTheme.background} p-4 pt-24`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center mx-auto mb-6`}>
            <Cookie className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold ${currentTheme.textPrimary} mb-4`}>
            Cookie Policy
          </h1>
          <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
            Learn about how we use cookies and manage your preferences to enhance your experience on DriveEase.
          </p>
          <p className={`text-sm ${currentTheme.textSecondary} mt-2`}>
            Last updated: January 2025
          </p>
        </motion.div>

        {/* What are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard>
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-4`}>
              What are Cookies?
            </h2>
            <p className={`${currentTheme.textSecondary} leading-relaxed mb-4`}>
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
            <p className={`${currentTheme.textSecondary} leading-relaxed`}>
              We use cookies to ensure our website works properly, to analyze how it's used, and to provide personalized content and advertisements.
            </p>
          </GlassCard>
        </motion.div>

        {/* Cookie Types */}
        <div className="space-y-6 mb-8">
          {cookieTypes.map((type, index) => {
            const Icon = type.icon
            const isEnabled = preferences[type.key as keyof typeof preferences]
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GlassCard>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-xl font-bold ${currentTheme.textPrimary}`}>
                            {type.name}
                          </h3>
                          {type.required && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <p className={`${currentTheme.textSecondary} mb-4 leading-relaxed`}>
                          {type.description}
                        </p>
                        <div>
                          <h4 className={`font-semibold ${currentTheme.textPrimary} mb-2`}>
                            Examples:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {type.examples.map((example, exampleIndex) => (
                              <span
                                key={exampleIndex}
                                className={`px-3 py-1 ${currentTheme.glassEffect} rounded-full text-sm ${currentTheme.textSecondary}`}
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={(e) => handlePreferenceChange(type.key, e.target.checked)}
                          disabled={type.required}
                          className="sr-only"
                        />
                        <div className={`
                          relative w-12 h-6 rounded-full transition-colors duration-200
                          ${isEnabled ? 'bg-blue-500' : 'bg-gray-300'}
                          ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}>
                          <div className={`
                            absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
                            ${isEnabled ? 'transform translate-x-6' : ''}
                          `} />
                        </div>
                      </label>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        {/* Cookie Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <GlassCard className="text-center">
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-4`}>
              Manage Your Cookie Preferences
            </h2>
            <p className={`${currentTheme.textSecondary} mb-6`}>
              You can control which cookies we use by adjusting your preferences above. Your choices will be saved and applied to your future visits.
            </p>
            <Button onClick={handleSavePreferences} className="mx-auto">
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </GlassCard>
        </motion.div>

        {/* Browser Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <GlassCard>
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-4`}>
              Browser Cookie Settings
            </h2>
            <p className={`${currentTheme.textSecondary} mb-4`}>
              You can also manage cookies through your browser settings. Here's how to do it in popular browsers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${currentTheme.glassEffect} rounded-xl p-4`}>
                <h3 className={`font-bold ${currentTheme.textPrimary} mb-2`}>Chrome</h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  Settings → Privacy and security → Cookies and other site data
                </p>
              </div>
              <div className={`${currentTheme.glassEffect} rounded-xl p-4`}>
                <h3 className={`font-bold ${currentTheme.textPrimary} mb-2`}>Firefox</h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  Options → Privacy & Security → Cookies and Site Data
                </p>
              </div>
              <div className={`${currentTheme.glassEffect} rounded-xl p-4`}>
                <h3 className={`font-bold ${currentTheme.textPrimary} mb-2`}>Safari</h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  Preferences → Privacy → Manage Website Data
                </p>
              </div>
              <div className={`${currentTheme.glassEffect} rounded-xl p-4`}>
                <h3 className={`font-bold ${currentTheme.textPrimary} mb-2`}>Edge</h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  Settings → Cookies and site permissions → Cookies and site data
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <GlassCard className="text-center">
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-4`}>
              Questions About Cookies?
            </h2>
            <p className={`${currentTheme.textSecondary} mb-6`}>
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className={`font-semibold ${currentTheme.textPrimary}`}>Email</p>
                <p className={currentTheme.textSecondary}>thakurlakshya0081@gmail.com</p>
              </div>
              <div>
                <p className={`font-semibold ${currentTheme.textPrimary}`}>Phone</p>
                <p className={currentTheme.textSecondary}>+91 9149370081</p>
              </div>
              <div>
                <p className={`font-semibold ${currentTheme.textPrimary}`}>Address</p>
                <p className={currentTheme.textSecondary}>Aligarh, UP, India</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}