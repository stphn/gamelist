import React from 'react'
import { UserCompletionProgressEntity } from '@retroachievements/api'
import styles from './UserProgress.module.css'

interface UserProgressProps {
  progress: UserCompletionProgressEntity
}

const UserProgress: React.FC<UserProgressProps> = ({ progress }) => {
  const formattedDate = progress.mostRecentAwardedDate
    ? new Date(progress.mostRecentAwardedDate).toLocaleDateString()
    : 'N/A'
  const progressPercentage = (
    (progress.numAwarded / progress.maxPossible) *
    100
  ).toFixed(2)

  return (
    <div>
      <h2>Game Info and User Progress</h2>
      <p>
        <strong>Game Title:</strong> {progress.title}
      </p>
      <p>
        <strong>Console Name:</strong> {progress.consoleName}
      </p>
      <p>
        <strong>Most Recent Awarded Date:</strong> {formattedDate}
      </p>
      <p>
        <strong>Progress:</strong> {progress.numAwarded}/{progress.maxPossible}{' '}
        ({progressPercentage}%)
      </p>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p>
        <strong>Number Awarded:</strong> {progress.numAwarded}
      </p>
      <img
        src={`https://media.retroachievements.org/${progress.imageIcon}`}
        alt={progress.title}
      />
    </div>
  )
}

export default UserProgress
