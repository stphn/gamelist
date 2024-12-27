import React from 'react'
import styles from './Header.module.css'
import Logo from '../Logo'

interface HeaderProps {
  theme: string
  toggleTheme: () => void
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className={styles.header}>
      <Logo />
      <h3>Which game to play?</h3>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  )
}

export default Header
