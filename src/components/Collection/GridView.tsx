import styles from './Grid.module.css'
import { formatDate } from '../../utils/formatDate'
import { Game } from '../../types/Game'

type GridViewProps = {
  items: Game[]
}

const GridView = ({ items }: GridViewProps) => {
  return (
    <div className={styles.gridWrapper}>
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          {['png', 'avif', 'jpg', 'jpeg', 'webp'].map((extension) => (
            <img
              key={extension}
              src={`thumbs/${item.thumb_url}/thumb.${extension}`}
              alt={`${item.label} thumbnail`}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ))}
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>{item.label}</div>
            <div className={styles.cardDetails}>{item.core_name}</div>
            <div className={styles.cardDetails}>
              {formatDate(item.released)}
            </div>
            <div className={styles.cardDetails}>{item.developed_by}</div>
            <div className={styles.cardDetails}>{item.publisher}</div>
            <div className={styles.cardDetails}>{item.genre}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GridView
