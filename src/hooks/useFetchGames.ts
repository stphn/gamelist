import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Game } from '../types/Game'

const useFetchGames = () => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*, systems(*)') // Fetch games with system name
      if (error) {
        setError(error.message)
      } else {
        setGames(data)
      }
      setLoading(false)
    }
    fetchGames()
  }, [])

  return { games, loading, error }
}

export default useFetchGames
