import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Mail, Phone, MapPin, Send, MessageSquare, Book, Shield, Clock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-hot-toast'

export const HelpCenterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  })
  const [submitting, setSubmitting] = useState(false)
  const { currentTheme } = useTheme()
  const { user } = useAuth()

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      console.log('User logged in, pre-filling form with user data')
      setFormData(prev => ({
        ...prev,
        email: user.email || ''
      }))
      
      // Fetch user profile to get name and phone - but don't fail if it doesn't exist
      const fetchUserProfile = async () => {
        try {
          console.log('Fetching user profile for:', user.id)
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('name, mobile')
            .eq('id', user.id)
            .maybeSingle() // Use maybeSingle instead of single to avoid errors if no profile exists
          
          if (error) {
            console.log('Profile fetch error (this is normal for new users):', error.message)
            return
          }
          
          if (profile) {
            console.log('Profile found, updating form data:', profile)
            setFormData(prev => ({
              ...prev,
              name: profile.name || '',
              phone: profile.mobile || ''
            }))
          } else {
            console.log('No profile found for user (this is normal for new users)')
          }
        } catch (error) {
          console.log('Error fetching profile (non-critical):', error)
          // Don't show error to user as this is optional data
        }
      }
      
      fetchUserProfile()
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)

    try {
      console.log('Submitting support request directly as notification')

      // Create notification directly for admin
      const adminNotificationData = {
        type: 'admin',
        title: `🆘 Support Request: ${formData.subject}`,
        message: `📋 Support Request Details:

👤 Customer: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone || 'Not provided'}

📂 Category: ${formData.category.toUpperCase()}
⚡ Priority: ${formData.priority.toUpperCase()}
📝 Subject: ${formData.subject}

💬 Message:
${formData.message}

⏰ Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
        user_id: null, // Admin notification (no specific user)
        is_read: false
      }

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert(adminNotificationData)

      if (notificationError) {
        console.error('Error creating admin notification:', notificationError)
        toast.error('Error submitting support request: ' + notificationError.message)
        return
      }

      console.log('Admin notification created successfully')

      // Also create a user notification if user is logged in
      if (user) {
        const userNotificationData = {
          type: 'system',
          title: '✅ Support Request Submitted',
          message: `Your support request "${formData.subject}" has been submitted successfully. Our team will review it and respond within 24-48 hours.

Category: ${formData.category}
Priority: ${formData.priority}`,
          user_id: user.id,
          is_read: false
        }

        const { error: userNotificationError } = await supabase
          .from('notifications')
          .insert(userNotificationData)

        if (userNotificationError) {
          console.error('Error creating user notification:', userNotificationError)
          // Don't fail the process if user notification fails
        } else {
          console.log('User notification created successfully')
        }
      }

      // Reset form
      setFormData({
        name: user ? formData.name : '',
        email: user ? formData.email : '',
        phone: user ? formData.phone : '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'medium'
      })

      toast.success('✅ Support request submitted successfully! Our admin team will review it and respond within 24-48 hours.')
    } catch (error) {
      console.error('Error submitting support request:', error)
      toast.error('Error submitting request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const faqItems = [
    {
      question: 'How do I book a car?',
      answer: 'Simply browse our available cars on the home page, select your preferred vehicle, choose the rental duration, and confirm your booking. Payment is processed securely.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking from the "My Cars" section. Please provide a reason for cancellation. Cancellation policies may apply.'
    },
    {
      question: 'What documents do I need?',
      answer: 'You need a valid driving license, Aadhar card, and the mobile number registered with your account. All documents are verified during registration.'
    },
    {
      question: 'How is pricing calculated?',
      answer: 'Our pricing is based on hourly rates that vary by car category. The total cost is calculated as: Hourly Rate × Duration in Hours.'
    },
    {
      question: 'What if I face issues during rental?',
      answer: 'Contact our 24/7 support team immediately. We provide roadside assistance and will help resolve any issues promptly.'
    },
    {
      question: 'How do I extend my rental?',
      answer: 'Contact our support team or use the app to extend your rental period. Additional charges will apply based on the hourly rate.'
    }
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: '24/7 Customer Service',
      contact: '+91 9149370081',
      action: 'tel:+919149370081'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'thakurlakshya0081@gmail.com',
      action: 'mailto:thakurlakshya0081@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      description: 'Visit our office',
      contact: 'Aligarh, UP, India',
      action: '#'
    }
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
            Help Center
          </h1>
          <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
            We're here to help! Get instant answers to common questions or contact our support team directly.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <GlassCard key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${currentTheme.textPrimary} mb-2`}>
                  {method.title}
                </h3>
                <p className={`${currentTheme.textSecondary} mb-3`}>
                  {method.description}
                </p>
                <a
                  href={method.action}
                  className={`font-semibold ${currentTheme.textPrimary} hover:underline`}
                >
                  {method.contact}
                </a>
              </GlassCard>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard>
              <div className="flex items-center mb-6">
                <MessageSquare className={`w-6 h-6 mr-3 ${currentTheme.textPrimary}`} />
                <h2 className={`text-2xl font-bold ${currentTheme.textPrimary}`}>
                  Contact Support
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    disabled={submitting}
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    disabled={submitting}
                  />
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.textPrimary} mb-2`}>
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      disabled={submitting}
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Issues</option>
                      <option value="payment">Payment Problems</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Subject *"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of your issue"
                    required
                    disabled={submitting}
                  />
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.textPrimary} mb-2`}>
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      disabled={submitting}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${currentTheme.textPrimary} mb-2`}>
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please describe your issue in detail..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none h-32"
                    required
                    disabled={submitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard>
              <div className="flex items-center mb-6">
                <HelpCircle className={`w-6 h-6 mr-3 ${currentTheme.textPrimary}`} />
                <h2 className={`text-2xl font-bold ${currentTheme.textPrimary}`}>
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`${currentTheme.glassEffect} rounded-xl p-4`}
                  >
                    <h3 className={`font-semibold ${currentTheme.textPrimary} mb-2`}>
                      {faq.question}
                    </h3>
                    <p className={`${currentTheme.textSecondary} text-sm leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Additional Help Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <GlassCard>
            <h2 className={`text-2xl font-bold ${currentTheme.textPrimary} text-center mb-8`}>
              Additional Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center mx-auto mb-3`}>
                  <Book className="w-6 h-6 text-white" />
                </div>
                <h3 className={`font-semibold ${currentTheme.textPrimary} mb-2`}>
                  User Guide
                </h3>
                <p className={`${currentTheme.textSecondary} text-sm`}>
                  Complete guide on how to use DriveEase platform
                </p>
              </div>
              
              <div className="text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.secondary} flex items-center justify-center mx-auto mb-3`}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className={`font-semibold ${currentTheme.textPrimary} mb-2`}>
                  Safety Guidelines
                </h3>
                <p className={`${currentTheme.textSecondary} text-sm`}>
                  Important safety information for car rentals
                </p>
              </div>
              
              <div className="text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center mx-auto mb-3`}>
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className={`font-semibold ${currentTheme.textPrimary} mb-2`}>
                  24/7 Support
                </h3>
                <p className={`${currentTheme.textSecondary} text-sm`}>
                  Round-the-clock assistance for urgent issues
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}