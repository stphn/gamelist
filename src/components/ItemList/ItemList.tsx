import { useState } from 'react'
import list from '../../data/gamelist.json'
import styles from './ItemList.module.css'

type Item = {
  id: string
  label: string
  path: string
  core_path: string
  core_name: string
  crc32: string
  db_name: string
  thumb_url: string
}

type SortConfig = {
  key: keyof Item
  direction: 'ascending' | 'descending'
}

const ItemList = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    direction: 'ascending',
  })

  const sortedItems = [...list.items].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  const requestSort = (key: keyof Item) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div>
      <h1>Game List</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => requestSort('label')}>Label</th>
            <th onClick={() => requestSort('core_name')}>Core Name</th>
            <th onClick={() => requestSort('crc32')}>CRC32</th>
            <th onClick={() => requestSort('db_name')}>DB Name</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.label}</td>
              <td>{item.core_name}</td>
              <td>{item.crc32}</td>
              <td>{item.db_name}</td>

              <td>
                <img
                  src={item.thumb_url}
                  alt={item.label}
                  width="500"
                  height="600"
                  crossOrigin="anonymous"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.version}>Version: {list.version}</div>
    </div>
  )
}

export default ItemList
