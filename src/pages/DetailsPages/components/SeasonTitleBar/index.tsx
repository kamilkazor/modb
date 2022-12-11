import React from 'react';
import styles from './SeasonTitleBar.module.scss';

import LazyImage from '../../../../sharedComponents/LazyImage';
import returnImagePath from '../../../../utils/returnImagePath';


interface Props {
  poster_path: string|null;
  name: string;
  episode_count: number;
  overview: string|null;
  air_date: string;
}

const SeasonTitleBar: React.FC<Props> = ({ poster_path, name, episode_count, overview, air_date }) => {
  return (
    <div
      className={styles.SeasonTitleBar}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.poster}>
          <LazyImage src={returnImagePath(poster_path, "w185")}/>
        </div>
        <div className={styles.textWrapper}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.episodeCount}>episodes: {episode_count}</p>
          <p className={styles.overview}>{overview ? overview : "There is no overview for this season."}</p>
          <p className={styles.date}>{air_date}</p>
        </div>
      </div>
      <p className={`${styles.hide} ${styles.forSmallDevices}`}>{overview ? overview : "There is no overview for this season."}</p>
    </div>
  )
}

export default SeasonTitleBar;