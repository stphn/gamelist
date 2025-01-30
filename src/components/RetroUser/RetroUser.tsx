import React, { useEffect, useState } from 'react'

// Define the UserProfile type
interface UserProfile {
  user: string
  memberSince: string
  richPresenceMsg: string
  lastGameId: number
  totalPoints: number
  totalTruePoints: number
  motto: string
}

import { userProfile as fetchUserProfile } from '../../retroachievements.ts'

const RetroUser: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const data = await fetchUserProfile
        setProfile(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(String(error))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfileData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Username:</strong> {profile?.user}
      </p>
      <p>
        <strong>Member Since:</strong> {profile?.memberSince}
      </p>
      <p>
        <strong>Rich Presence Message:</strong> {profile?.richPresenceMsg}
      </p>
      <p>
        <strong>Last Game ID:</strong> {profile?.lastGameId}
      </p>
      <p>
        <strong>Total Points:</strong> {profile?.totalPoints}
      </p>
      <p>
        <strong>Total True Points:</strong> {profile?.totalTruePoints}
      </p>
      <p>
        <strong>Motto:</strong> {profile?.motto}
      </p>
      {/* Add more fields as needed */}
    </div>
  )
}

export default RetroUser
