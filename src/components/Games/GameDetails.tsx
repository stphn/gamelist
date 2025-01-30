import React from 'react'
import { Game } from '../../types/Game'
import { formatDate } from '../../utils/formatDate'

interface GameDetailsProps {
  game: Game
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  return (
    <div>
      <h2>{game.label}</h2>
      {['png', 'avif', 'jpg', 'jpeg', 'webp'].map((extension) => (
        <img
          key={extension}
          src={`thumbs/${game.thumb_url}/thumb.${extension}`}
          alt={`${game.label} thumbnail`}
          width={150}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      ))}
      {['png', 'avif', 'jpg', 'jpeg', 'webp'].map((extension) => (
        <img
          key={extension}
          src={`thumbs/${game.thumb_url}/screen.${extension}`}
          alt={`${game.label} thumbnail`}
          width={150}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      ))}
      {['png', 'avif', 'jpg', 'jpeg', 'webp'].map((extension) => (
        <img
          key={extension}
          src={`thumbs/${game.thumb_url}/decal.${extension}`}
          alt={`${game.label} thumbnail`}
          width={150}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      ))}
      <p>Genre: {game.genre}</p>
      <p>Core name: {game.core_name}</p>
      <p>Description: {game.desc}</p>
      <p>Released: {formatDate(game.released)}</p>
      <p>Developed by: {game.developed_by}</p>
      <p>Publisher: {game.publisher}</p>
      <p>System: {game.systems?.name || 'Unknown'}</p>
      <img src={game.systems?.iconURL} alt={game.systems?.name} />
      <p>
        Retroachievements ID:
        {game.retroachievements_id !== null
          ? game.retroachievements_id
          : ' N/A'}
      </p>
    </div>
  )
}

export default GameDetails
