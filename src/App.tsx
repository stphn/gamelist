import { useState, useEffect } from 'react'
import { ItemList } from './components/ItemList'
import RandomGamePicker from './components/RandomGamePicker/RandomGamePicker'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div>
      <h1>Game List</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <RandomGamePicker />
      <ItemList />
    </div>
  )
}

export default App
