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
import Seasons from './components/Seasons';


const ShowPage = () => {
  const {id} = useParams();
  
  interface DetailsInterface {
    name: string;
    original_name: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    overview: string|null;
    poster_path: string|null;
    episode_run_time: number|null;
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
    seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      overview: string|null;
      poster_path: string|null;
      season_number: number;
      name: string;
    }[];
  }
  interface CreditsInterface {
    cast: {
      id: number;
      name: string;
      profile_path: string|null;
      character: string;
      roles: {
        character: string;
      }[]
    }[];
    crew: {
      id: number;
      name: string;
      profile_path: string|null;
      department: string;
      job: string;
      jobs: {
        job: string
      }[]
    }[];
  }
  interface ShowsDataInterface {
    results: {
      name: string;
      id: number;
      poster_path: string|null;
      vote_average: number;
      first_air_date: string;
    }[];
  }
  
  
  const tvDetails = useFetch<DetailsInterface>(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_KEY}`
  )
  const tvCredits = useFetch<CreditsInterface>(
    `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${process.env.REACT_APP_KEY}`
  )
  const tvRecommended = useFetch<ShowsDataInterface>(
    `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.REACT_APP_KEY}`
  )
  const tvSimilar = useFetch<ShowsDataInterface>(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_KEY}`
  )
          
  const apiCalls = [tvDetails, tvCredits, tvRecommended, tvSimilar];
  const {loading, error, errorMessage} = useCallsStatus(apiCalls);
  
  function formatAggregateCredits(data: CreditsInterface) {
    const formatedCredits: CreditsInterface = {cast: [], crew: []};
    data.cast.forEach((person) => {
      let characters = person.roles.map((role) => (role.character)).join(", ")
      formatedCredits.cast.push({
        ...person, character: characters
      })
    })
    data.crew.forEach((person) => {
      let jobs = person.jobs.map((job) => (job.job)).join(", ")
      formatedCredits.crew.push({
        ...person, job: jobs
      })
    })
    return formatedCredits
  }

  return (
    <>
      {loading && <LoadingPage/>}
      {!loading && error && <ErrorPage message={errorMessage}/>}
      {!loading && !error &&
        <>
          <TitleBanner
            backdrop_path={tvDetails.data!.backdrop_path}
            original_title={tvDetails.data!.original_name}
            title={tvDetails.data!.name}
            release_date={tvDetails.data!.first_air_date}
            runtime={tvDetails.data!.episode_run_time}
            vote_average={tvDetails.data!.vote_average}
            vote_count={tvDetails.data!.vote_count}
          />
          <Overwiev
            overview={tvDetails.data!.overview}
            status={tvDetails.data!.status}
            release_date={tvDetails.data!.first_air_date}
            genres={tvDetails.data!.genres}
            original_title={tvDetails.data!.original_name}
            production_companies={tvDetails.data!.production_companies}
            production_countries={tvDetails.data!.production_countries}
            poster_path={tvDetails.data!.poster_path}
            original_language={tvDetails.data!.original_language}
          />
          <Credits
            // cast={tvCredits.data!.cast}
            cast={formatAggregateCredits(tvCredits.data!).cast}
            // crew={tvCredits.data!.crew}
            crew={formatAggregateCredits(tvCredits.data!).crew}
          />
          <Seasons 
            tvId={id}
            seasons={tvDetails.data!.seasons}
          />
          <Recommendations
            recommended={tvRecommended.data!.results.map((result) => {
              return {
                title: result.name,
                id: result.id,
                release_date: result.first_air_date,
                vote_average: result.vote_average,
                poster_path: result.poster_path,
                linkTo: `/show/${result.id}`
              }
            })}
            similar={tvSimilar.data!.results.map((result) => {
              return {
                title: result.name,
                id: result.id,
                release_date: result.first_air_date,
                vote_average: result.vote_average,
                poster_path: result.poster_path,
                linkTo: `/show/${result.id}`
              }
            })}
          />
        </>    
      }
    </>
  )
}

export default ShowPage;