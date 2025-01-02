import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { supabase } from '../../supabaseClient'
import styles from './RandomGamePicker.module.css'
import tadaSound from '../../assets/sound01.mp3'
import uiSound from '../../assets/ui.mp3'
import isPickingSound from '../../assets/searching.mp3'
import { Game } from '../../types/Game'
import { formatDate } from '../../utils/formatDate'

const getAllImageSrcs = (thumbUrl: string): string[] => {
  try {
    const images = import.meta.glob('./thumbs/**/*.{png,avif,jpg,jpeg}')
    const imageKeys = Object.keys(images).filter((key) =>
      key.includes(thumbUrl),
    )
    return imageKeys.map((key) => key.replace('./thumbs/', ''))
  } catch {
    return []
  }
}

const RandomGamePicker = () => {
  const [games, setGames] = useState<Game[]>([])
  const [currentGame, setCurrentGame] = useState<Game | null>(null)
  const [finalGame, setFinalGame] = useState<Game | null>(null)
  const [isPicking, setIsPicking] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [pickCounts, setPickCounts] = useState<{ [key: string]: number }>({})
  const [countdown, setCountdown] = useState(6) // 6 seconds total
  const [firstAttempt, setFirstAttempt] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from('games').select('*')
      if (error) {
        console.error('Error fetching games:', error)
      } else {
        setGames(data)
      }
    }
    fetchGames()
  }, [])

  const pickRandomGame = () => {
    const clickAudio = new Audio(uiSound)
    clickAudio.play()

    setIsPicking(true)
    setFinalGame(null)
    setShowConfetti(false)
    setShowDetails(false)

    const searchAudio = new Audio(isPickingSound)
    searchAudio.play()

    let currentIndex = 0
    const interval = setInterval(() => {
      setCurrentGame(games[currentIndex])
      currentIndex = (currentIndex + 1) % games.length
    }, 100)

    setCountdown(6)
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownInterval)
          setIsPicking(false)
          setShowConfetti(false)
          return 0
        }
        return prevCountdown - 1
      })
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
      searchAudio.pause()
      const finalIndex = Math.floor(Math.random() * games.length)
      const selectedGame = games[finalIndex]
      setCurrentGame(selectedGame)
      setFinalGame(selectedGame)
      setShowConfetti(true)
      const tadaAudio = new Audio(tadaSound)
      tadaAudio.play()
      setPickCounts((prevCounts) => ({
        ...prevCounts,
        [selectedGame.id]: (prevCounts[selectedGame.id] || 0) + 1,
      }))
      setTimeout(() => {
        setIsPicking(false)
        setShowConfetti(false)
        setFirstAttempt(false)
      }, 3000)
    }, 3000)
  }

  return (
    <div className={styles.container}>
      {showConfetti && <Confetti />}

      {currentGame && (
        <div className={styles.randomGame}>
          <h2 className={styles.gameHeader}>Let's play ...</h2>
          <div className={styles.gameInfo}>
            <p className={finalGame ? styles.finalGameLabel : ''}>
              {finalGame ? finalGame.label : currentGame.label}
            </p>
            {finalGame && (
              <>
                <p className={styles.pickCount}>
                  {pickCounts[finalGame.id] === 1
                    ? 'First time picked!'
                    : `Picked ${pickCounts[finalGame.id]} times`}
                </p>

                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className={styles.moreInfoButton}
                >
                  {showDetails ? 'Hide Info' : 'More Info'}
                </button>
                <button
                  onClick={pickRandomGame}
                  className={styles.tryAgainButton}
                  disabled={countdown > 0}
                >
                  {countdown > 0
                    ? `Retry in (${countdown}) second(s)`
                    : 'Try Again'}
                </button>
                {showDetails && (
                  <div className={styles.finalGameDetails}>
                    <p>Released: {formatDate(finalGame.released)}</p>
                    <p>Developed By: {finalGame.developed_by}</p>
                    <p>Publisher: {finalGame.publisher}</p>
                    <div className={styles.thumbnailContainer}>
                      {getAllImageSrcs(finalGame.thumb_url).map(
                        (src, index) => (
                          <img
                            key={index}
                            src={`thumbs/${src}`}
                            alt={`${finalGame.label} ${index + 1}`}
                            className={styles.thumbnail}
                          />
                        ),
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {firstAttempt && (
        <button
          onClick={pickRandomGame}
          disabled={isPicking}
          className={`${styles.button} ${isPicking ? styles.hidden : ''}`}
        >
          Pick Your Game
        </button>
      )}
    </div>
  )
}

export default RandomGamePicker
