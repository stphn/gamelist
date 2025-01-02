import React from 'react'
import styles from './Header.module.css'
import Logo from '../Logo'
import ThemeToggle from './../ThemeToggle'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />

      <ThemeToggle />
    </header>
  )
}

export default Header
