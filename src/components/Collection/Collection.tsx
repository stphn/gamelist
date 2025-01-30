import { useState } from 'react'
import ListView from './ListView'
import GridView from './GridView'
import styles from './Collection.module.css'
import useFetchGames from '../../hooks/useFetchGames'

type ItemListProps = {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const Collection = ({ searchTerm, setSearchTerm }: ItemListProps) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const { games, loading, error } = useFetchGames()

  const filteredItems = games.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.viewButtons}>
          <button onClick={() => setViewMode('list')}>List View</button>
          <button onClick={() => setViewMode('grid')}>Grid View</button>
        </div>
      </div>
      {viewMode === 'list' ? (
        <ListView games={filteredItems} />
      ) : (
        <GridView games={filteredItems} />
      )}
    </div>
  )
}

export default Collection
