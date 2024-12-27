import { useState } from 'react'
import Confetti from 'react-confetti'
import list from '../../data/gamelist.json'
import styles from './RandomGamePicker.module.css'
import tadaSound from '../../assets/sound01.mp3'
import uiSound from '../../assets/ui.mp3'
import isPickingSound from '../../assets/searching.mp3'

// Define the Game interface
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
  // State variables
  const [currentGame, setCurrentGame] = useState<Game | null>(null)
  const [finalGame, setFinalGame] = useState<Game | null>(null)
  const [isPicking, setIsPicking] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Function to pick a random game
  const pickRandomGame = () => {
    // Play click sound
    const clickAudio = new Audio(uiSound)
    clickAudio.play()

    setIsPicking(true)
    setFinalGame(null)
    setShowConfetti(false)
    setShowDetails(false)

    // Play search sound
    const searchAudio = new Audio(isPickingSound)
    searchAudio.play()

    let currentIndex = 0
    const interval = setInterval(() => {
      setCurrentGame(list.items[currentIndex])
      currentIndex = (currentIndex + 1) % list.items.length
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      searchAudio.pause() // Stop the search sound
      const finalIndex = Math.floor(Math.random() * list.items.length)
      setCurrentGame(list.items[finalIndex])
      setFinalGame(list.items[finalIndex])
      setShowConfetti(true)
      // Play tada sound
      const tadaAudio = new Audio(tadaSound)
      tadaAudio.play()
      setTimeout(() => {
        setIsPicking(false)
        setShowConfetti(false)
      }, 3000) // Show the final result and confetti for 3 seconds
    }, 3000) // Pick a game after 3 seconds
  }

  return (
    <div className={styles.container}>
      {showConfetti && <Confetti />}
      <button
        onClick={pickRandomGame}
        disabled={isPicking}
        className={styles.button}
      >
        {isPicking ? 'May Luck Be With You' : 'Pick Your Game'}
      </button>
      {currentGame && (
        <div className={styles.randomGame}>
          <h2 className={styles.gameHeader}>Let's play ...</h2>
          <div className={styles.gameInfo}>
            <p className={finalGame ? styles.finalGameLabel : ''}>
              {finalGame ? finalGame.label : currentGame.label}
            </p>
            {finalGame && (
              <>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className={styles.moreInfoButton}
                >
                  {showDetails ? 'Hide Info' : 'More Info'}
                </button>
                {showDetails && (
                  <div className={styles.finalGameDetails}>
                    <p>Path: {finalGame.path}</p>
                    <p>Core Path: {finalGame.core_path}</p>
                    <p>Core Name: {finalGame.core_name}</p>
                    <p>CRC32: {finalGame.crc32}</p>
                    <p>DB Name: {finalGame.db_name}</p>
                    <img
                      src={finalGame.thumb_url}
                      alt={finalGame.label}
                      className={styles.thumbnail}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RandomGamePicker
