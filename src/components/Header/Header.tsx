import React from 'react'
import styles from './Header.module.css'
import Logo from '../Logo'
import ThemeToggle from './../ThemeToggle'

interface HeaderProps {
  theme: string
  toggleTheme: () => void
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>Game List</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
      <ThemeToggle />
    </header>
  )
}

export default Header
