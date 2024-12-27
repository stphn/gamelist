import { useState, useEffect } from 'react'
import { ItemList } from './components/ItemList'
import RandomGamePicker from './components/RandomGamePicker'
import Header from './components/Header'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')
  const [showItemList, setShowItemList] = useState(false)

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
        <button onClick={handleShowItemList}>
          {showItemList ? 'Hide Game List' : 'Show Game List'}
        </button>
        {showItemList && <ItemList />}
      </div>
    </div>
  )
}

export default App
