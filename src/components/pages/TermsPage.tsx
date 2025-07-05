import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'

export const TermsPage: React.FC = () => {
  const { currentTheme } = useTheme()

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using DriveEase services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: 'Eligibility',
      content: `You must be at least 18 years old and possess a valid driving license to use our services. You must provide accurate and complete information during registration, including valid Aadhar card details.`
    },
    {
      title: 'Vehicle Rental Terms',
      content: `All vehicles are rented on an hourly basis. The minimum rental period is 1 hour. You are responsible for the vehicle during the rental period and must return it in the same condition as received.`
    },
    {
      title: 'Payment Terms',
      content: `Payment is required at the time of booking. All prices are in Indian Rupees (INR). Additional charges may apply for damages, late returns, or traffic violations incurred during the rental period.`
    },
    {
      title: 'Cancellation Policy',
      content: `Bookings can be cancelled through the app. Cancellation charges may apply depending on the timing of cancellation. Refunds will be processed according to our refund policy.`
    },
    {
      title: 'User Responsibilities',
      content: `You must drive safely and follow all traffic laws. You are responsible for any fines, penalties, or damages incurred during the rental period. Smoking, drinking, or illegal activities in the vehicle are strictly prohibited.`
    },
    {
      title: 'Liability and Insurance',
      content: `DriveEase provides basic insurance coverage for all vehicles. However, users are liable for damages beyond normal wear and tear. Additional insurance options may be available.`
    },
    {
      title: 'Privacy Policy',
      content: `We collect and use your personal information in accordance with our Privacy Policy. Your data is protected and will not be shared with third parties without your consent.`
    },
    {
      title: 'Modifications',
      content: `DriveEase reserves the right to modify these terms at any time. Users will be notified of significant changes. Continued use of the service constitutes acceptance of modified terms.`
    },
    {
      title: 'Termination',
      content: `DriveEase may terminate or suspend your account at any time for violation of these terms. You may also terminate your account by contacting our support team.`
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
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold ${currentTheme.textPrimary} mb-4`}>
            Terms & Conditions
          </h1>
          <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
            Please read these terms and conditions carefully before using DriveEase services.
          </p>
          <p className={`text-sm ${currentTheme.textSecondary} mt-2`}>
            Last updated: January 2025
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="border-l-4 border-orange-500">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h3 className={`font-bold ${currentTheme.textPrimary} mb-2`}>
                  Important Notice
                </h3>
                <p className={`${currentTheme.textSecondary}`}>
                  By using DriveEase services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and DriveEase.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <GlassCard>
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center flex-shrink-0 mt-1`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
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
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <GlassCard className="text-center">
            <Shield className={`w-12 h-12 mx-auto mb-4 ${currentTheme.textPrimary}`} />
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-4`}>
              Questions About These Terms?
            </h2>
            <p className={`${currentTheme.textSecondary} mb-6`}>
              If you have any questions about these Terms and Conditions, please contact us:
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