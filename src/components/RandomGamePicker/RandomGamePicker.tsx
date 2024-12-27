import { useState } from 'react'
import Confetti from 'react-confetti'
import list from '../../data/gamelist.json'
import styles from './RandomGamePicker.module.css'

interface Game {
  path: string
  label: string
  core_path: string
  core_name: string
  crc32: string
  db_name: string
  id: string
  thumb_url: string
}

const RandomGamePicker = () => {
  const [currentGame, setCurrentGame] = useState<Game | null>(null)
  const [finalGame, setFinalGame] = useState<Game | null>(null)
  const [isPicking, setIsPicking] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const pickRandomGame = () => {
    setIsPicking(true)
    setFinalGame(null)
    setShowConfetti(false)

    let currentIndex = 0
    const interval = setInterval(() => {
      setCurrentGame(list.items[currentIndex])
      currentIndex = (currentIndex + 1) % list.items.length
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      const finalIndex = Math.floor(Math.random() * list.items.length)
      setCurrentGame(list.items[finalIndex])
      setFinalGame(list.items[finalIndex])
      setShowConfetti(true)
      setTimeout(() => {
        setIsPicking(false)
        setShowConfetti(false)
      }, 3000) // Show the final result and confetti for 3 seconds
    }, 3000) // Spin for 3 seconds
  }

  return (
    <div className={styles.container}>
      {showConfetti && <Confetti />}
      <button
        onClick={pickRandomGame}
        disabled={isPicking}
        className={styles.button}
      >
        {isPicking ? 'Picking...' : 'Pick One'}
      </button>
      {currentGame && (
        <div className={styles.randomGame}>
          <h2>{finalGame ? "Let's play" : 'Picking...'}</h2>
          <p className={finalGame ? styles.finalGameLabel : ''}>
            {currentGame.label}
          </p>
          <p>Path: {currentGame.path}</p>
          <p>Core Path: {currentGame.core_path}</p>
          <p>Core Name: {currentGame.core_name}</p>
          <p>CRC32: {currentGame.crc32}</p>
          <p>DB Name: {currentGame.db_name}</p>
          <img
            src={currentGame.thumb_url}
            alt={currentGame.label}
            className={styles.thumbnail}
          />
        </div>
      )}
    </div>
  )
}

export default RandomGamePicker
