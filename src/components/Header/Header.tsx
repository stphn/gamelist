import React from 'react'
import styles from './Header.module.css'
import Logo from '../Logo'
import ThemeToggle from './../ThemeToggle'
import RetroUser from '../RetroUser'

interface HeaderProps {
  theme: string
  toggleTheme: () => void
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <RetroUser />

      <ThemeToggle />
    </header>
  )
}

export default Header
