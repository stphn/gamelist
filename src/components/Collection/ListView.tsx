import { useState } from 'react'
import styles from './ListView.module.css'
import { formatDate } from '../../utils/formatDate'
import { Game } from '../../types/Game'

type SortConfig = {
  key: keyof Game
  direction: 'ascending' | 'descending'
}

type ListViewProps = {
  items: Game[]
}

const ListView = ({ items }: ListViewProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    direction: 'ascending',
  })

  const sortedItems = [...items].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
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
          onClick={() => requestSort('core_name')}
        >
          Core Name
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
        <div
          className={`${styles.header} ${styles.sortable}`}
          onClick={() => requestSort('publisher')}
        >
          Publisher
        </div>
        <div className={styles.header}>Thumbnail</div>
        {sortedItems.map((item) => (
          <div key={item.id}>
            <div>{item.label}</div>
            <div>{item.core_name}</div>
            <div>{formatDate(item.released)}</div>
            <div>{item.developed_by}</div>
            <div>{item.genre}</div>
            <div>{item.publisher}</div>
            <div>
              {['png', 'avif', 'jpg', 'jpeg', 'webp'].map((extension) => (
                <img
                  key={extension}
                  src={`thumbs/${item.thumb_url}/thumb.${extension}`}
                  alt={item.label}
                  className={styles.thumbnail}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  width={100}
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
