import React, { useState } from 'react';
import styles from './Sliders.module.scss';

import Slider from '../../../../sharedComponents/Slider';
import SliderCard from '../../../../sharedComponents/SliderCard';
import ToggleSelector from '../../../../sharedComponents/ToggleSelector';
import returnImagePath from '../../../../utils/returnImagePath';
import SubsectionTitle from '../../../../sharedComponents/SubsectionTitle';


interface MoviesData {
  results: {
    title: string;
    id: number;
    poster_path: string|null;
    vote_average: number;
    release_date: string;
  }[];
}
interface TvData {
  results: {
    name: string;
    id: number;
    poster_path: string|null;
    vote_average: number;
    first_air_date: string;
  }[];
}

interface Props {
  moviesPopular : MoviesData;
  moviesTop : MoviesData;
  moviesNowPlaying : MoviesData;
  tvPopular : TvData;
  tvTop : TvData;
}


function createMovieSlides(data: MoviesData) {
  return data.results.map((result) => {
    return (
      <SliderCard 
          key={result.id} 
          title={result.title} 
          image={returnImagePath(result.poster_path, "w342")}
          score={result.vote_average}
          date={result.release_date}
          linkTo={`/movie/${result.id}`}
        />
    )
  })
}
function createTvSlides(data: TvData) {
  return data.results.map((result) => {
    return (
      <SliderCard 
          key={result.id} 
          title={result.name} 
          image={returnImagePath(result.poster_path, "w342")}
          score={result.vote_average}
          date={result.first_air_date}
          linkTo={`/show/${result.id}`}
        />
    )
  })
}

const Sliders: React.FC<Props> = ({
  moviesPopular,
  moviesTop,
  moviesNowPlaying,
  tvPopular,
  tvTop
}) => {
  const [moviesSelected, setMoviesSelected] = useState<"POPULAR"|"TOP"|"NOW_PLAYING">("POPULAR");
  const [tvSelected, setTvSelected] = useState<"POPULAR"|"TOP">("POPULAR");

  return (
    <>
    {moviesPopular && moviesTop && moviesNowPlaying && tvPopular && tvTop &&
    <>
      <section className={styles.movies}>
        <div className={styles.titleWrapper}>
          {/* <h2 className={styles.title}>Movies:</h2> */}
          <SubsectionTitle>Movies:</SubsectionTitle>
          <ToggleSelector 
            initial={0} 
            onSelect={(value)=>{setMoviesSelected(value)}} 
            options={[
              {label: "popular", value: "POPULAR"},
              {label: "top", value: "TOP"},
              {label: "now playing", value:"NOW_PLAYING"}
            ]}
          />
        </div>
        {moviesSelected === "POPULAR" &&
          <Slider >
            {createMovieSlides(moviesPopular)}
          </Slider>
        }
        {moviesSelected === "TOP" &&
          <Slider >
            {createMovieSlides(moviesTop)}
          </Slider>
        }
        {moviesSelected === "NOW_PLAYING" &&
          <Slider >
            {createMovieSlides(moviesNowPlaying)}
          </Slider>
        }
      </section> 
      <section className={styles.tvShows}>
        <div className={styles.titleWrapper}>
          <SubsectionTitle>TV Shows:</SubsectionTitle>
          <ToggleSelector 
            initial={0} 
            onSelect={(value)=>{setTvSelected(value)}} 
            options={[
              {label: "popular", value: "POPULAR"},
              {label: "top", value: "TOP"}
            ]}
          />
        </div>
        {tvSelected === "POPULAR" &&
          <Slider >
            {createTvSlides(tvPopular)}
          </Slider>
        }
        {tvSelected === "TOP" &&
          <Slider >
            {createTvSlides(tvTop)}
          </Slider>
        }
      </section>
      </>
      }
    </>
  )
}

export default Sliders;