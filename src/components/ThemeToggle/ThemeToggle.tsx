import React, { useEffect, useState } from 'react'

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'dark',
  )

  useEffect(() => {
    document.documentElement.className = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  )
}

export default ThemeToggle
