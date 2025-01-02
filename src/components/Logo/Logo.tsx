import React from 'react'
import styles from './Logo.module.css'

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M16 6H8a6 6 0 0 0 0 12h8a6 6 0 0 0 0-12m-5 7H9v2H7v-2H5v-2h2V9h2v2h2zm3.5 2a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m3-3a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3" />
      </svg>
      <div className={styles.name}>PlayNext</div>
      <p className={styles.version}>v.1.0.0</p>
    </div>
  )
}

export default Logo
