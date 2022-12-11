import React from 'react';
import styles from './TitleBanner.module.scss';

import Banner from '../../../../sharedComponents/Banner';
import Rating from '../../../../sharedComponents/Rating';
import returnImagePath from '../../../../utils/returnImagePath';

interface Props {
  backdrop_path: string|null;
  original_title: string;
  title: string;
  release_date: string;
  runtime: number|null;
  vote_average: number;
  vote_count: number;
}

const TitleBanner: React.FC<Props> = ({
  backdrop_path, 
  original_title, 
  title, 
  release_date, 
  runtime, 
  vote_average, 
  vote_count
}) => {


  function minFormatter(minutes: number) {
    let h = Math.floor(minutes/60);
    let min = minutes % 60;
    if(h > 0 && min > 0) return `${h}h ${min}min`;
    if(h > 0 && min === 0) return `${h}h`;
    if(h === 0 && min > 0) return `${min}min`;
    return null;
  }


  return (
    <Banner backdropSrc={returnImagePath(backdrop_path, "w1280")}>
      <div className={styles.TitleBanner}>
          <div className={styles.textWrapper}>
            <div className={styles.titleBlock}>
              {title !== original_title && <p className={styles.originalTitle}>{original_title.toUpperCase()}</p>}
              <h1 className={styles.title}>{title.toUpperCase()}</h1>
              <div className={styles.bottomLine}>
                {release_date && <p className={styles.year}>{new Date(release_date).getFullYear()}</p>}
                {runtime ? <p className={styles.runtime}>{minFormatter(runtime)}</p> : null}
              </div>
            </div>
            <Rating score={vote_average} ratings={vote_count} />
          </div>
        </div>
    </Banner>
  )
}

export default TitleBanner;