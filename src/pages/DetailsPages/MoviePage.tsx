import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useCallsStatus from '../../hooks/useCallsStatus';

import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';

import TitleBanner from './components/TitleBanner';
import Overwiev from './components/Overview';
import Credits from './components/Credits';
import Recommendations from './components/Recommendations';

const MoviePage = () => {
  const {id} = useParams();
  
  interface DetailsInterface {
    title: string;
    original_title: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    overview: string|null;
    poster_path: string|null;
    runtime: number|null;
    status: string;
    original_language: string;
    production_companies: {
      name: string;
    }[];
    production_countries: {
      name: string;
    }[];
    genres: {
      name: string;
    }[];
  }
  interface CreditsInterface {
    cast: {
      id: number;
      name: string;
      profile_path: string|null;
      character: string
    }[];
    crew: {
      id: number;
      name: string;
      profile_path: string|null;
      department: string;
      job: string;
    }[];
  }
  interface MoviesDataInterface {
    results: {
      title: string;
      id: number;
      poster_path: string|null;
      vote_average: number;
      release_date: string;
    }[];
  }
  
  
  const movieDetails = useFetch<DetailsInterface>(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}`
  )
  const movieCredits = useFetch<CreditsInterface>(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_KEY}`
  )
  const moviesRecommended = useFetch<MoviesDataInterface>(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_KEY}`
  )
  const moviesSimilar = useFetch<MoviesDataInterface>(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_KEY}`
  )
          
  const apiCalls = [movieDetails, movieCredits, moviesRecommended, moviesSimilar];
  const {loading, error, errorMessage} = useCallsStatus(apiCalls);


  return (
    <>
      {loading && <LoadingPage/>}
      {!loading && error && <ErrorPage message={errorMessage}/>}
      {!loading && !error &&
        <>
          <TitleBanner
            backdrop_path={movieDetails.data!.backdrop_path}
            original_title={movieDetails.data!.original_title}
            title={movieDetails.data!.title}
            release_date={movieDetails.data!.release_date}
            runtime={movieDetails.data!.runtime}
            vote_average={movieDetails.data!.vote_average}
            vote_count={movieDetails.data!.vote_count}
          />
          <Overwiev
            overview={movieDetails.data!.overview}
            status={movieDetails.data!.status}
            release_date={movieDetails.data!.release_date}
            genres={movieDetails.data!.genres}
            original_title={movieDetails.data!.original_title}
            production_companies={movieDetails.data!.production_companies}
            production_countries={movieDetails.data!.production_countries}
            poster_path={movieDetails.data!.poster_path}
            original_language={movieDetails.data!.original_language}
          />
          <Credits
            cast={movieCredits.data!.cast}
            crew={movieCredits.data!.crew}
          />
          <Recommendations
            recommended={moviesRecommended.data!.results.map((result) => {
              return {
                title: result.title,
                id: result.id,
                release_date: result.release_date,
                vote_average: result.vote_average,
                poster_path: result.poster_path,
                linkTo: `/movie/${result.id}`
              }
            })}
            similar={moviesSimilar.data!.results.map((result) => {
              return {
                title: result.title,
                id: result.id,
                release_date: result.release_date,
                vote_average: result.vote_average,
                poster_path: result.poster_path,
                linkTo: `/movie/${result.id}`
              }
            })}
          />
        </>    
      }
    </>
  )
}

export default MoviePage;