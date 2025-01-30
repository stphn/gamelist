import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { debounce } from 'lodash'
import { authorization } from '../../retroachievements'
import { getOrCreateAnonymousUserId } from '../../utils/localStorageUtils'
import {
  getUserCompletionProgress,
  UserCompletionProgressEntity,
} from '@retroachievements/api'

import useFetchGames from '../../hooks/useFetchGames'
import styles from './Games.module.css'
import GameListItem from './GameListItem'

type VoteStats = {
  game_id: string
  total_votes: number
  average_rating: number
}

const Games = () => {
  const { games, loading, error } = useFetchGames()

  const [votes, setVotes] = useState<{
    [key: string]: { average_rating: number; total_votes: number }
  }>({})

  const [progressData, setProgressData] = useState<
    UserCompletionProgressEntity[]
  >([])

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const { results } = await getUserCompletionProgress(authorization, {
          username: authorization.username,
        })
        setProgressData(results)
      } catch (error) {
        console.error('Error fetching progress data:', error)
      }
    }

    fetchProgressData()
  }, [])

  const fetchVotes = async () => {
    console.log('Fetching all vote stats...')
    const { data, error } = await supabase.rpc('get_vote_stats')

    if (error) {
      console.error('Error fetching votes:', error.message)
    } else {
      console.log('Votes fetched:', data)

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
    getOrCreateAnonymousUserId()
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

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="App">
      <h1>GameList</h1>

      <ul className={styles.gameList}>
        {games.map((game) => {
          const progress = progressData.find(
            (item) => item.gameId === game.retroachievements_id,
          )
          return (
            <GameListItem
              key={game.id}
              game={game}
              progress={progress}
              votes={votes}
              handleVote={handleVote}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default Games
