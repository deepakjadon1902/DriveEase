import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'

interface FooterProps {
  setActiveTab: (tab: string) => void
}

// Custom Car Logo Component
const CarLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
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

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { currentTheme } = useTheme()

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', action: () => setActiveTab('about') },
        { name: 'Help Center', action: () => setActiveTab('help') }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Terms & Conditions', action: () => setActiveTab('terms') },
        { name: 'Privacy Policy', action: () => setActiveTab('privacy') },
        { name: 'Cookie Policy', action: () => setActiveTab('cookies') }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Car Rental', action: () => setActiveTab('home') },
        { name: 'My Bookings', action: () => setActiveTab('my-cars') }
      ]
    }
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/deepakjadon1902', label: 'Github' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/deepak-jadon-612487272', label: 'LinkedIn' }
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${currentTheme.background} pt-16 pb-8`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <GlassCard className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center shadow-lg`}>
                  <CarLogo className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${currentTheme.textPrimary}`}>
                    DriveEase
                  </h3>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>
                    Smart. Stylish. Seamless.
                  </p>
                </div>
              </div>
              <p className={`${currentTheme.textSecondary} mb-6 leading-relaxed`}>
               Smart car rental platform, making mobility accessible, affordable, and enjoyable for everyone.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center text-white hover:shadow-lg transition-all duration-200`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className={`text-lg font-semibold ${currentTheme.textPrimary} mb-4`}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={link.action}
                        className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors duration-200 text-left`}
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Contact Info */}
        <GlassCard className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.secondary} flex items-center justify-center`}>
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-semibold ${currentTheme.textPrimary}`}>Email</p>
                <p className={`${currentTheme.textSecondary}`}>thakurlakshya0081@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.secondary} flex items-center justify-center`}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-semibold ${currentTheme.textPrimary}`}>Phone</p>
                <p className={`${currentTheme.textSecondary}`}>+91 9149370081</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.secondary} flex items-center justify-center`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-semibold ${currentTheme.textPrimary}`}>Address</p>
                <p className={`${currentTheme.textSecondary}`}>Aligarh, UP, India</p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Bottom Bar */}
        <div className={`border-t border-gray-200/20 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0`}>
          <p className={`${currentTheme.textSecondary} text-center md:text-left`}>
            © 2025 DriveEase. All rights reserved. Made with ❤️ in India by Deepak Jadon.
          </p>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('privacy')}
              className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors`}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setActiveTab('terms')}
              className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors`}
            >
              Terms of Service
            </button>
            <button 
              onClick={() => setActiveTab('cookies')}
              className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors`}
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}