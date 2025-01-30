import { buildAuthorization, getUserProfile } from '@retroachievements/api'

// Load Retroachievements details from environment variables

const username = import.meta.env.VITE_RA_USERNAME
const webApiKey = import.meta.env.VITE_RA_API_KEY

if (!username || !webApiKey) {
  throw new Error('Missing Retroachievement environment variables')
}

export const authorization = buildAuthorization({ username, webApiKey })
export const userProfile = getUserProfile(authorization, {
  username: 'TheAspen',
})
