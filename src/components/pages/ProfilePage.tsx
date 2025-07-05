import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Edit2, Save, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { toast } from 'react-hot-toast'

interface Profile {
  id: string
  name: string
  address: string
  mobile: string
  date_of_birth: string
  aadhar_number: string
}

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<Profile>>({})
  const { user } = useAuth()
  const { currentTheme } = useTheme()

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, this is normal for new users
          toast.error('Profile not found. Please complete your registration.')
        } else {
          toast.error('Error fetching profile: ' + error.message)
        }
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Error fetching profile')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setEditData(profile || {})
    setEditing(true)
  }

  const handleSave = async () => {
    if (!profile || !user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update(editData)
        .eq('id', user.id)

      if (error) {
        console.error('Error updating profile:', error)
        toast.error('Error updating profile: ' + error.message)
        return
      }

      setProfile({ ...profile, ...editData })
      setEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Error updating profile')
    }
  }

  const handleCancel = () => {
    setEditData({})
    setEditing(false)
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${currentTheme.background}`}>
        <motion.div
          className={`w-16 h-16 border-4 border-t-transparent rounded-full bg-gradient-to-r ${currentTheme.primary}`}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${currentTheme.background} pt-24`}>
        <div className="text-center">
          <p className={`text-xl ${currentTheme.textSecondary} mb-4`}>
            Profile not found
          </p>
          <p className={`${currentTheme.textSecondary}`}>
            Please complete your registration to create a profile.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${currentTheme.background} p-4 pt-24`}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-3xl md:text-4xl font-bold ${currentTheme.textPrimary} mb-2`}>
            My Profile
          </h1>
          <p className={`text-lg ${currentTheme.textSecondary}`}>
            Manage your account information
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentTheme.primary} flex items-center justify-center`}>
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${currentTheme.textPrimary}`}>
                    {profile.name}
                  </h2>
                  <p className={`${currentTheme.textSecondary}`}>
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                {editing ? (
                  <>
                    <Button onClick={handleSave} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEdit} variant="outline" size="sm">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`flex items-center text-sm font-medium ${currentTheme.textPrimary}`}>
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  {editing ? (
                    <Input
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    <p className={`px-4 py-3 rounded-xl bg-white/50 ${currentTheme.textPrimary}`}>
                      {profile.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className={`flex items-center text-sm font-medium ${currentTheme.textPrimary}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Mobile Number
                  </label>
                  {editing ? (
                    <Input
                      value={editData.mobile || ''}
                      onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
                    />
                  ) : (
                    <p className={`px-4 py-3 rounded-xl bg-white/50 ${currentTheme.textPrimary}`}>
                      {profile.mobile}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className={`flex items-center text-sm font-medium ${currentTheme.textPrimary}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Date of Birth
                  </label>
                  {editing ? (
                    <Input
                      type="date"
                      value={editData.date_of_birth || ''}
                      onChange={(e) => setEditData({ ...editData, date_of_birth: e.target.value })}
                    />
                  ) : (
                    <p className={`px-4 py-3 rounded-xl bg-white/50 ${currentTheme.textPrimary}`}>
                      {new Date(profile.date_of_birth).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className={`flex items-center text-sm font-medium ${currentTheme.textPrimary}`}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Aadhar Number
                  </label>
                  {editing ? (
                    <Input
                      value={editData.aadhar_number || ''}
                      onChange={(e) => setEditData({ ...editData, aadhar_number: e.target.value })}
                    />
                  ) : (
                    <p className={`px-4 py-3 rounded-xl bg-white/50 ${currentTheme.textPrimary}`}>
                      {profile.aadhar_number.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className={`flex items-center text-sm font-medium ${currentTheme.textPrimary}`}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Address
                </label>
                {editing ? (
                  <textarea
                    value={editData.address || ''}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none h-20"
                  />
                ) : (
                  <p className={`px-4 py-3 rounded-xl bg-white/50 ${currentTheme.textPrimary}`}>
                    {profile.address}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className={`flex items-center text-sm font-medium ${currentTheme.textPrimary}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                <p className={`px-4 py-3 rounded-xl bg-gray-100 ${currentTheme.textSecondary}`}>
                  {user?.email} (Cannot be changed)
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}