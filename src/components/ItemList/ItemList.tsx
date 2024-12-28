import { useState } from 'react'
import list from '../../data/gamelist.json'
import styles from './ItemList.module.css'
import SearchBar from '../SearchBar/SearchBar'

type Item = {
  id: string
  label: string
  path: string
  core_path: string
  core_name: string
  crc32: string
  db_name: string
  thumb_url: string
  released: string
  developed_by: string
  genre: string // Added genre property
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
  const [searchTerm, setSearchTerm] = useState('')

  const sortedItems = [...list.items].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  const filteredItems = sortedItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const requestSort = (key: keyof Item) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                onClick={() => requestSort('label')}
                className={
                  sortConfig.key === 'label'
                    ? sortConfig.direction === 'ascending'
                      ? styles.sortAsc
                      : styles.sortDesc
                    : ''
                }
              >
                Label
                {sortConfig.key === 'label' && (
                  <span
                    className={
                      sortConfig.direction === 'ascending'
                        ? styles.sortAsc
                        : styles.sortDesc
                    }
                  />
                )}
              </th>
              <th
                onClick={() => requestSort('core_name')}
                className={
                  sortConfig.key === 'core_name'
                    ? sortConfig.direction === 'ascending'
                      ? styles.sortAsc
                      : styles.sortDesc
                    : ''
                }
              >
                Core Name
                {sortConfig.key === 'core_name' && (
                  <span
                    className={
                      sortConfig.direction === 'ascending'
                        ? styles.sortAsc
                        : styles.sortDesc
                    }
                  />
                )}
              </th>
              <th
                onClick={() => requestSort('crc32')}
                className={
                  sortConfig.key === 'crc32'
                    ? sortConfig.direction === 'ascending'
                      ? styles.sortAsc
                      : styles.sortDesc
                    : ''
                }
              >
                CRC32
                {sortConfig.key === 'crc32' && (
                  <span
                    className={
                      sortConfig.direction === 'ascending'
                        ? styles.sortAsc
                        : styles.sortDesc
                    }
                  />
                )}
              </th>
              <th
                onClick={() => requestSort('db_name')}
                className={
                  sortConfig.key === 'db_name'
                    ? sortConfig.direction === 'ascending'
                      ? styles.sortAsc
                      : styles.sortDesc
                    : ''
                }
              >
                DB Name
                {sortConfig.key === 'db_name' && (
                  <span
                    className={
                      sortConfig.direction === 'ascending'
                        ? styles.sortAsc
                        : styles.sortDesc
                    }
                  />
                )}
              </th>
              <th>Thumbnail</th>
              <th>Released</th>
              <th>Developed By</th>
              <th
                onClick={() => requestSort('genre')}
                className={
                  sortConfig.key === 'genre'
                    ? sortConfig.direction === 'ascending'
                      ? styles.sortAsc
                      : styles.sortDesc
                    : ''
                }
              >
                Genre
                {sortConfig.key === 'genre' && (
                  <span
                    className={
                      sortConfig.direction === 'ascending'
                        ? styles.sortAsc
                        : styles.sortDesc
                    }
                  />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td data-label="Label">{item.label}</td>
                <td data-label="Core Name">{item.core_name}</td>
                <td data-label="CRC32">{item.crc32}</td>
                <td data-label="DB Name">{item.db_name}</td>
                <td data-label="Thumbnail">
                  {['png', 'avif', 'jpg', 'jpeg', 'webp'].map((format) => (
                    <img
                      key={format}
                      src={`thumbs/${item.thumb_url}/thumb.${format}`}
                      alt={`${item.label} thumbnail`}
                      width="50"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  ))}
                </td>
                <td data-label="Released">{item.released}</td>
                <td data-label="Developed By">{item.developed_by}</td>
                <td data-label="Genre">{item.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.version}>Version: {list.version}</div>
    </div>
  )
}

export default ItemList
