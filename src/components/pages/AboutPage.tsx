import React from 'react'
import { motion } from 'framer-motion'
import { Car, Shield, Clock, Users, Star, Heart } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'

export const AboutPage: React.FC = () => {
  const { currentTheme } = useTheme()

  const features = [
    {
      icon: Car,
      title: 'Premium Fleet',
      description: 'Wide range of well-maintained vehicles across all categories from eco-friendly to luxury cars.'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Advanced security measures with verified user authentication and secure payment processing.'
    },
    {
      icon: Clock,
      title: 'Flexible Timing',
      description: 'Hourly rental system with transparent pricing. Rent for as long as you need.'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Join thousands of satisfied customers who trust DriveEase for their mobility needs.'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Cars Available' },
    { number: '50+', label: 'Cities Covered' },
    { number: '4.8★', label: 'Average Rating' }
  ]

  return (
    <div className={`min-h-screen ${currentTheme.background} p-4 pt-24`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-6xl font-bold ${currentTheme.textPrimary} mb-4`}>
            About DriveEase
          </h1>
          <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
            India's leading smart car rental platform, revolutionizing the way people move across the country with style, convenience, and reliability.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <GlassCard className="text-center">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center mx-auto mb-6`}>
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-4`}>
              Our Mission
            </h2>
            <p className={`text-lg ${currentTheme.textSecondary} max-w-4xl mx-auto leading-relaxed`}>
              To make car rental accessible, affordable, and enjoyable for every Indian. We believe that mobility should be smart, stylish, and seamless, empowering people to explore their dreams without the constraints of vehicle ownership.
            </p>
          </GlassCard>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} text-center mb-8`}>
            Why Choose DriveEase?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold ${currentTheme.textPrimary} mb-2`}>
                      {feature.title}
                    </h3>
                    <p className={`${currentTheme.textSecondary}`}>
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <GlassCard>
            <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} text-center mb-8`}>
              DriveEase by Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className={`text-3xl md:text-4xl font-bold ${currentTheme.textPrimary} mb-2`}>
                    {stat.number}
                  </div>
                  <div className={`${currentTheme.textSecondary} font-medium`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <GlassCard className="text-center">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${currentTheme.secondary} flex items-center justify-center mx-auto mb-6`}>
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-4`}>
              Our Vision
            </h2>
            <p className={`text-lg ${currentTheme.textSecondary} max-w-4xl mx-auto leading-relaxed`}>
              To become India's most trusted and innovative car rental platform, setting new standards for customer experience, technology integration, and sustainable mobility solutions. We envision a future where transportation is personalized, eco-friendly, and available at your fingertips.
            </p>
          </GlassCard>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GlassCard className="text-center">
            <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-4`}>
              Get in Touch
            </h2>
            <p className={`text-lg ${currentTheme.textSecondary} mb-6`}>
              Have questions? We're here to help you make the most of your DriveEase experience.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className={`${currentTheme.textSecondary}`}>
                <p className="font-semibold">Email</p>
                <p>support@driveease.in</p>
              </div>
              <div className={`${currentTheme.textSecondary}`}>
                <p className="font-semibold">Phone</p>
                <p>+91 9876543210</p>
              </div>
              <div className={`${currentTheme.textSecondary}`}>
                <p className="font-semibold">Hours</p>
                <p>24/7 Support</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}