import styles from './Grid.module.css'
import { formatDate } from '../../utils/formatDate'
import { Game } from '../../types/Game'

type GridViewProps = {
  games: Game[]
}

const GridView = ({ games }: GridViewProps) => {
  return (
    <div className={styles.gridWrapper}>
      {games.map((game) => (
        <div key={game.id} className={styles.card}>
          {['png', 'avif', 'jpg', 'jpeg', 'webp'].map((extension) => (
            <img
              key={extension}
              src={`thumbs/${game.thumb_url}/thumb.${extension}`}
              alt={`${game.label} thumbnail`}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))}
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>{game.label}</div>
            <div className={styles.cardDetails}>{game.core_name}</div>
            <div className={styles.cardDetails}>
              {formatDate(game.released)}
            </div>
            <div className={styles.cardDetails}>{game.developed_by}</div>
            <div className={styles.cardDetails}>{game.publisher}</div>
            <div className={styles.cardDetails}>{game.genre}</div>
            <div className={styles.cardDetails}>
              System: {game.systems?.name || 'Unknown'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GridView
