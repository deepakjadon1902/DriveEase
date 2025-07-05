import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'

export const PrivacyPage: React.FC = () => {
  const { currentTheme } = useTheme()

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support. This includes your name, email address, phone number, address, date of birth, and Aadhar card number for verification purposes.`
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: `We use your information to provide and improve our services, process bookings, communicate with you, ensure safety and security, comply with legal requirements, and personalize your experience on our platform.`
    },
    {
      icon: UserCheck,
      title: 'Information Sharing',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only with your consent, to comply with legal obligations, or to protect our rights and the safety of our users.`
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All sensitive data is encrypted and stored securely.`
    },
    {
      icon: Shield,
      title: 'Your Rights',
      content: `You have the right to access, update, or delete your personal information. You can also opt out of certain communications and request a copy of your data. Contact us to exercise these rights.`
    },
    {
      icon: AlertCircle,
      title: 'Data Retention',
      content: `We retain your personal information only for as long as necessary to provide our services and comply with legal obligations. Inactive accounts may be deleted after a reasonable period of inactivity.`
    }
  ]

  const dataTypes = [
    {
      category: 'Account Information',
      items: ['Name', 'Email address', 'Phone number', 'Date of birth', 'Aadhar card number']
    },
    {
      category: 'Booking Information',
      items: ['Rental history', 'Payment information', 'Vehicle preferences', 'Booking timestamps']
    },
    {
      category: 'Usage Information',
      items: ['App usage patterns', 'Device information', 'Location data (when permitted)', 'Support interactions']
    }
  ]

  return (
    <div className={`min-h-screen ${currentTheme.background} p-4 pt-24`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center mx-auto mb-6`}>
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold ${currentTheme.textPrimary} mb-4`}>
            Privacy Policy
          </h1>
          <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className={`text-sm ${currentTheme.textSecondary} mt-2`}>
            Last updated: January 2025
          </p>
        </motion.div>

        {/* Privacy Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="text-center">
            <Lock className={`w-12 h-12 mx-auto mb-4 ${currentTheme.textPrimary}`} />
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-4`}>
              Our Privacy Commitment
            </h2>
            <p className={`${currentTheme.textSecondary} leading-relaxed`}>
              At DriveEase, we are committed to protecting your privacy and ensuring the security of your personal information. We believe in transparency and want you to understand how we handle your data.
            </p>
          </GlassCard>
        </motion.div>

        {/* Data Collection Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard>
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-6`}>
              Types of Data We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dataTypes.map((type, index) => (
                <div key={index} className={`${currentTheme.glassEffect} rounded-xl p-4`}>
                  <h3 className={`font-bold ${currentTheme.textPrimary} mb-3`}>
                    {type.category}
                  </h3>
                  <ul className="space-y-2">
                    {type.items.map((item, itemIndex) => (
                      <li key={itemIndex} className={`text-sm ${currentTheme.textSecondary} flex items-center`}>
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <GlassCard>
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className={`text-xl font-bold ${currentTheme.textPrimary} mb-3`}>
                        {section.title}
                      </h2>
                      <p className={`${currentTheme.textSecondary} leading-relaxed`}>
                        {section.content}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        {/* Contact for Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <GlassCard className="text-center">
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-4`}>
              Privacy Questions or Concerns?
            </h2>
            <p className={`${currentTheme.textSecondary} mb-6`}>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className={`font-semibold ${currentTheme.textPrimary}`}>Privacy Officer</p>
                <p className={currentTheme.textSecondary}>Deepak Jadon</p>
              </div>
              <div>
                <p className={`font-semibold ${currentTheme.textPrimary}`}>Email</p>
                <p className={currentTheme.textSecondary}>thakurlakshya0081@gmail.com</p>
              </div>
              <div>
                <p className={`font-semibold ${currentTheme.textPrimary}`}>Phone</p>
                <p className={currentTheme.textSecondary}>+91 9149370081</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}