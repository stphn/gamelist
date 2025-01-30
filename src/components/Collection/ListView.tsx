import { useState } from 'react'
import styles from './ListView.module.css'
import { Game } from '../../types/Game'
import { formatDate } from '../../utils/formatDate'

type SortConfig = {
  key: keyof Game
  direction: 'ascending' | 'descending'
}

type ListViewProps = {
  games: Game[]
}

const ListView = ({ games }: ListViewProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    direction: 'ascending',
  })

  const sortedItems = [...games].sort((a, b) => {
    const aValue = a[sortConfig.key] ?? ''
    const bValue = b[sortConfig.key] ?? ''
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  const requestSort = (key: keyof Game) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div>
      <h1>Game List</h1>
      <div className={styles.grid}>
        <div
          className={`${styles.header} ${styles.sortable}`}
          onClick={() => requestSort('label')}
        >
          Label
        </div>
        <div
          className={`${styles.header} ${styles.sortable}`}
          onClick={() => requestSort('systems')}
        >
          Systems
        </div>
        <div
          className={`${styles.header} ${styles.sortable}`}
          onClick={() => requestSort('core_name')}
        >
          Core Name
        </div>
        <div
          className={`${styles.header} ${styles.sortable}`}
          onClick={() => requestSort('systems')}
        >
          DB Name
        </div>
        <div
          className={`${styles.header} ${styles.sortable}`}
          onClick={() => requestSort('released')}
        >
          Released
        </div>
        <div
          className={`${styles.header} ${styles.sortable}`}
          onClick={() => requestSort('developed_by')}
        >
          Developed By
        </div>
        <div
          className={`${styles.header} ${styles.sortable}`}
          onClick={() => requestSort('genre')}
        >
          Genre
        </div>
        <div className={styles.header}>Thumbnail</div>

        {sortedItems.map((game) => (
          <div key={game.id} className={styles.row}>
            <div>{game.label}</div>
            <div>{game.core_name}</div>
            <div>{game.publisher}</div>
            <div>{formatDate(game.released)}</div>
            <div>{game.developed_by}</div>
            <div>{game.genre}</div>
            <div>System: {game.systems?.name || 'Unknown'}</div>
            <div>
              {['png', 'avif', 'jpg', 'jpeg', 'webp'].map((extension) => (
                <img
                  key={extension}
                  src={`/thumb/${game.thumb_url}.${extension}`}
                  alt={game.label}
                  className={styles.thumbnail}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListView
