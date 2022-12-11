import React from 'react';
import styles from './EpisodeElement.module.scss';

import LazyImage from '../../../../sharedComponents/LazyImage';
import returnImagePath from '../../../../utils/returnImagePath';
import Rating from '../../../../sharedComponents/Rating';

interface Props {
  name: string;
  still_path: string|null;
  overview: string|null;
  vote_average: number;
  vote_count: number;
  episode_number: number;
  air_date: string;
}

const EpisodeElement: React.FC<Props> = ({
  name, 
  still_path, 
  overview, 
  vote_average, 
  vote_count,
  episode_number,
  air_date
 }) => {
  return (
    <div className={styles.EpisodeElement}>
      <div className={`${styles.textWrapper} ${styles.forSmallDevices}`}>
        <div className={styles.topLine}>
          <p className={styles.episodeNumber}>Episode {episode_number}</p>
          <p className={styles.date}>{air_date}</p>
        </div>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.overview}>{overview ? overview : "There is no overview for this episode."}</p>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.still}>
          <LazyImage
            src={returnImagePath(still_path, "w300")}
          />
        </div>
        <div className={`${styles.textWrapper} ${styles.forBigDevices}`}>
          <div className={styles.topLine}>
            <p className={styles.episodeNumber}>Episode {episode_number}</p>
            <p className={styles.date}>{air_date}</p>
          </div>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.overview}>{overview ? overview : "There is no overview for this episode."}</p>
        </div>
        <div className={styles.ratingWrapper1}>
          <div>
            <Rating score={vote_average} ratings={vote_count}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EpisodeElement;