import React from 'react';
import styles from './AttributionBanner.module.scss';

import Banner from '../../../../sharedComponents/Banner';
import {ReactComponent as TmdbLogoLong} from '../../../../assets/tmdb-logo-long.svg';
import {ReactComponent as TmdbLogoShort} from '../../../../assets/tmdb-logo-short.svg'


const AttributionBanner = () => {
  return (
    <Banner>
      <div className={styles.AttributionBanner}>
        <TmdbLogoShort className={styles.logoShort}/>
        <TmdbLogoLong className={styles.logoLong}/>
        <h2 className={styles.text}>
          The App was created thanks to the API privded by TMDB. To learn more click <a href="https://www.themoviedb.org/documentation/api" className={styles.link}>here</a>.
        </h2>
      </div>
    </Banner>
  )
}

export default AttributionBanner;