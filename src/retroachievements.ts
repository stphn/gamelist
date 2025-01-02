import { buildAuthorization } from '@retroachievements/api'

// Load Retroachievements details from environment variables
const username = process.env.RA_USERNAME
const webApiKey = process.env.RA_API_KEY

if (!username || !webApiKey) {
  throw new Error('Missing Supabase environment variables')
}

export const authorization = buildAuthorization({ username, webApiKey })
