import React, { useEffect, useState } from 'react'
import { buildAuthorization, getUserProfile } from '@retroachievements/api'

interface UserProfile {
  user: string
  memberSince: string
  richPresenceMsg: string
  lastGameId: number
  totalPoints: number
  totalTruePoints: number
  motto: string
  // Add more fields as needed
}

const RetroUser: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = import.meta.env.VITE_RA_USERNAME
        const webApiKey = import.meta.env.VITE_RA_API_KEY

        if (!username || !webApiKey) {
          throw new Error('Missing Retroachievements environment variables')
        }

        const authorization = buildAuthorization({ username, webApiKey })
        const profile = await getUserProfile(authorization, {
          username: 'TheAspen',
        })
        setUserProfile(profile)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Username:</strong> {userProfile?.user}
      </p>
      <p>
        <strong>Member Since:</strong> {userProfile?.memberSince}
      </p>
      <p>
        <strong>Rich Presence Message:</strong> {userProfile?.richPresenceMsg}
      </p>
      <p>
        <strong>Last Game ID:</strong> {userProfile?.lastGameId}
      </p>
      <p>
        <strong>Total Points:</strong> {userProfile?.totalPoints}
      </p>
      <p>
        <strong>Total True Points:</strong> {userProfile?.totalTruePoints}
      </p>
      <p>
        <strong>Motto:</strong> {userProfile?.motto}
      </p>
      {/* Add more fields as needed */}
    </div>
  )
}

export default RetroUser
