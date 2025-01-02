import React from 'react'
import styles from './Header.module.css'
import Logo from '../Logo'
import ThemeToggle from './../ThemeToggle'

interface HeaderProps {
  theme: string
  toggleTheme: () => void
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <Logo />

      <ThemeToggle />
    </header>
  )
}

export default Header
