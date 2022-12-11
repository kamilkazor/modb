import React from 'react';
import styles from './Rating.module.scss';

interface ScoreProps {
  score: number;
  ratings: number;
}

const Score: React.FC<ScoreProps> = ({score, ratings}) => {
  const formatter = Intl.NumberFormat("en", {
    notation: "standard"
  })
  const formattedScore = score.toFixed(1);
  const formattedRatings = formatter.format(ratings);

  return (
    <div className={styles.Rating}>
      <i className={`material-symbols ${styles.star}`}>star</i>
      <div className={styles.scoreWrapper}>
        <p className={styles.score}>{formattedScore}<span className={styles.outOf}>/ 10</span></p>
        <p className={styles.ratings}>ratings: {formattedRatings}</p>
      </div>
    </div>
  )
}

export default Score;