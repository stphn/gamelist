import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import ListView from './ListView'
import GridView from './GridView'
import styles from './Collection.module.css'
import { Game } from '../../types/Game'

type ItemListProps = {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const Collection = ({ searchTerm, setSearchTerm }: ItemListProps) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [items, setItems] = useState<Game[]>([])

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from('games').select('*')
      if (error) {
        console.error('Error fetching games:', error)
      } else {
        setItems(data)
      }
    }
    fetchGames()
  }, [])

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        <ListView items={filteredItems} />
      ) : (
        <GridView items={filteredItems} />
      )}
    </div>
  )
}

export default Collection
