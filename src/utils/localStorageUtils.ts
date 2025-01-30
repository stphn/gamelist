import { v4 as uuidv4 } from 'uuid'

export const getOrCreateAnonymousUserId = () => {
  if (!localStorage.getItem('anonymous_user_id')) {
    const newUserId = uuidv4()
    localStorage.setItem('anonymous_user_id', newUserId)
    console.log('New anonymous user ID set:', newUserId)
  } else {
    console.log(
      'Anonymous user ID exists:',
      localStorage.getItem('anonymous_user_id'),
    )
  }
}
