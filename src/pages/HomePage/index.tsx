import React from 'react';
import useFetch from '../../hooks/useFetch';
import useCallsStatus from '../../hooks/useCallsStatus';

import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';
import Sliders from './components/Sliders';
import AttributionBanner from './components/AttributionBanner';


const HomePage = () => {

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

  const moviesPopular = useFetch<MoviesData>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_KEY}`
  )
  const moviesTop = useFetch<MoviesData>(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_KEY}`
  )
  const moviesNowPlaying = useFetch<MoviesData>(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_KEY}`
  )
  const tvPopular = useFetch<TvData>(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_KEY}`
  )
  const tvTop = useFetch<TvData>(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_KEY}`
  )
        
  const apiCalls = [moviesPopular, moviesTop, moviesNowPlaying]
  const { loading, error, errorMessage } = useCallsStatus(apiCalls);


  return (
    <>
      {loading && <LoadingPage/>}
      {!loading && error && <ErrorPage message={errorMessage}/>}
      {!loading && !error &&
        <>
        <AttributionBanner/>
        <Sliders
          moviesPopular={moviesPopular.data!}
          moviesTop={moviesTop.data!}
          moviesNowPlaying={moviesNowPlaying.data!}
          tvPopular={tvPopular.data!}
          tvTop={tvTop.data!}
        />
        </>
      }
    </>
  )
}


export default HomePage;