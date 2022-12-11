import React from 'react'
import styles from './LoadingPage.module.scss'
import LoadingSpinner from '../../sharedComponents/FilmRoll'

const LoadingPage = () => {
  return (
    <div className={styles.LoadingPage}>
      <LoadingSpinner/>
    </div>
  )
}

export default LoadingPage;