import { buildAuthorization, getUserProfile } from '@retroachievements/api'

// Load Retroachievements details from environment variables
const username = process.env.VITE_RA_USERNAME
const webApiKey = process.env.VITE_RA_API_KEY

if (!username || !webApiKey) {
  throw new Error('Missing Supabase environment variables')
}

export const authorization = buildAuthorization({ username, webApiKey })
export const userProfile = await getUserProfile(authorization, {
  username: 'TheAspen',
})
