import React from 'react';
import styles from './Seasons.module.scss';
import useFetch from '../../../../hooks/useFetch';

import Season from '../Season';


interface SeasonInterface {
  air_date: string;
  episode_count: number;
  id: number;
  overview: string|null;
  poster_path: string|null;
  season_number: number;
  name: string;
}

interface Props {
  tvId: string|undefined;
  seasons: SeasonInterface[];
}

const Seasons: React.FC<Props> = ({tvId, seasons}) => {
  return (
    <section className={styles.Seasons}>
      {seasons.slice(0).reverse().map((season) => {
        return (
          <Season
            key={season.id}
            tvId={tvId}
            season={season}
          />
        )
      })}
    </section>
  )
}

export default Seasons;