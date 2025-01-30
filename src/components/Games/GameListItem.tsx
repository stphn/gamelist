import React, { useState } from 'react'
import styles from './GameListItem.module.css'
import { Game } from '../../types/Game'
import GameDetails from './GameDetails'
import { UserCompletionProgressEntity } from '@retroachievements/api'
import UserProgress from '../UserProgress'

interface GameListItemProps {
  game: Game
  progress: UserCompletionProgressEntity | undefined
  votes: {
    [key: string]: { average_rating: number; total_votes: number }
  }
  handleVote: (gameId: string, rating: number) => void
}

const GameListItem: React.FC<GameListItemProps> = ({
  game,
  progress,
  votes,
  handleVote,
}) => {
  const [userVote, setUserVote] = useState<number | null>(null)

  const handleUserVote = (rating: number) => {
    setUserVote(rating)
    handleVote(game.id, rating)
  }

  return (
    <li key={game.id} className={styles.listItem}>
      <GameDetails game={game} />
      {progress && <UserProgress progress={progress} />}
      <div>
        <div>
          <span>Your Rating: </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleUserVote(star)}
              style={{
                color: userVote && userVote >= star ? 'gold' : 'gray',
              }}
            >
              ★
            </button>
          ))}
        </div>
        <div>
          <span>Global Rating: </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                color: votes[game.id]?.average_rating >= star ? 'gold' : 'gray',
              }}
            >
              ★
            </span>
          ))}
          <span>Rating: {votes[game.id]?.average_rating || 0} stars</span>
          <span>Total Votes: {votes[game.id]?.total_votes || 0}</span>
        </div>
      </div>
    </li>
  )
}

export default GameListItem
