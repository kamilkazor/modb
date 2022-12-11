import React, { useEffect } from 'react';
import useFetch from '../../../../hooks/useFetch';

import Accordion from '../../../../sharedComponents/Accordion';
import SeasonTitleBar from '../SeasonTitleBar';
import EpisodeElement from '../EpisodeElement';


interface Props {
  tvId: string|undefined;
  season: {
    air_date: string;
    episode_count: number;
    id: number;
    overview: string|null;
    poster_path: string|null;
    season_number: number;
    name: string;
  }
}

const Season: React.FC<Props> = ({ tvId, season }) => {

  interface SeasonDetailsInterface {
    episodes: {
      id: number;
      air_date: string;
      episode_number: number;
      name: string;
      overview: string|null;
      still_path: string|null;
      vote_average: number;
      vote_count: number;
    }[]
  }

  const seasonDetails = useFetch<SeasonDetailsInterface>(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${season.season_number}?api_key=${process.env.REACT_APP_KEY}`
  )

  return (
    <Accordion
      title={<SeasonTitleBar 
        poster_path={season.poster_path} 
        name={season.name}
        episode_count={season.episode_count}
        overview={season.overview}
        air_date={season.air_date}
      />}
    >
      {seasonDetails.data && seasonDetails.data.episodes.map((episode) => {
        return (
          <EpisodeElement
            key={episode.id}
            name={episode.name}
            still_path={episode.still_path}
            overview={episode.overview}
            vote_average={episode.vote_average}
            vote_count={episode.vote_count}
            episode_number={episode.episode_number}
            air_date={episode.air_date}
          />

        )
      })}
    </Accordion>
  )
}

export default Season;