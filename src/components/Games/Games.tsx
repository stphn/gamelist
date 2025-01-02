import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Game } from '../../types/Game'
import { formatDate } from '../../utils/formatDate'
import { v4 as uuidv4 } from 'uuid'
import { debounce } from 'lodash'
import styles from './Games.module.css'

function Games() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [votes, setVotes] = useState<{
    [key: string]: { average_rating: number; total_votes: number }
  }>({})

  useEffect(() => {
    const fetchGames = async () => {
      console.log('Fetching games...')
      const { data, error } = await supabase.from('games').select('*')

      if (error) {
        console.error('Error fetching games:', error.message)
      } else {
        console.log('Games fetched:', data)
        setGames(data || [])
      }
      setLoading(false)
    }

    fetchGames()
  }, [])

  const fetchVotes = async () => {
    console.log('Fetching all vote stats...')
    const { data, error } = await supabase.rpc('get_vote_stats')

    if (error) {
      console.error('Error fetching votes:', error.message)
    } else {
      console.log('Votes fetched:', data)
      interface VoteStats {
        game_id: string
        total_votes: number
        average_rating: number
      }

      const formattedVotes = data.reduce(
        (
          acc: {
            [key: string]: { total_votes: number; average_rating: number }
          },
          vote: VoteStats,
        ) => {
          acc[vote.game_id] = {
            total_votes: vote.total_votes,
            average_rating: vote.average_rating,
          }
          return acc
        },
        {},
      )
      setVotes(formattedVotes)
    }
  }

  useEffect(() => {
    fetchVotes()
  }, [games])

  useEffect(() => {
    const votesChannel = supabase
      .channel('realtime:votes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'votes' },
        (payload) => {
          console.log('Vote change detected:', payload)
          fetchVotes() // Refetch votes when changes occur
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(votesChannel) // Cleanup subscription
    }
  }, [])

  useEffect(() => {
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
  }, [])

  const handleVote = debounce(async (gameId: string, rating: number) => {
    const userId = localStorage.getItem('anonymous_user_id')
    console.log(
      `Submitting vote for game ${gameId} by user ${userId} with rating ${rating}`,
    )
    const { error } = await supabase
      .from('votes')
      .upsert(
        { game_id: gameId, user_id: userId, vote_value: rating },
        { onConflict: 'game_id, user_id' },
      )

    if (error) {
      console.error('Error submitting rating:', error.message)
    } else {
      console.log('Rating submitted successfully')
      fetchVotes()
    }
  }, 300)

  if (loading) return <p>Loading...</p>

  return (
    <div className="App">
      <h1>GameList</h1>
      <ul className={styles.gameList}>
        {games.map((game) => (
          <li key={game.id} className={styles.listItem}>
            <strong>{game.label}</strong> - {game.genre} - {game.core_name} -{' '}
            {formatDate(game.released)} - {game.developed_by} - {game.publisher}{' '}
            - {game.thumb_url}
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleVote(game.id, star)}
                  style={{
                    color:
                      votes[game.id]?.average_rating >= star ? 'gold' : 'gray',
                  }}
                >
                  ★
                </button>
              ))}
              <span>Rating: {votes[game.id]?.average_rating || 0} stars</span>
              <span>Total Votes: {votes[game.id]?.total_votes || 0}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Games
