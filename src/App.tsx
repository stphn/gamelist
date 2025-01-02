import { useState, useEffect } from 'react'

import RandomGamePicker from './components/RandomGamePicker'
import Header from './components/Header'
import './App.css'

import Collection from './components/Collection'
import Games from './components/Games'

function App() {
  const [theme, setTheme] = useState('light')
  const [showItemList, setShowItemList] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const handleShowItemList = () => {
    setShowItemList((prevShowItemList) => !prevShowItemList)
  }

  return (
    <div id="root">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="main-content">
        <RandomGamePicker />
        <Games />

        <button onClick={handleShowItemList}>
          {showItemList ? 'Hide Game List' : 'Show Game List'}
        </button>
        {showItemList && (
          <Collection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
      </div>
    </div>
  )
}

export default App
