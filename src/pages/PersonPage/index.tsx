import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useCallsStatus from '../../hooks/useCallsStatus';

import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';

import NameBanner from './components/NameBanner';
import Biography from './components/Biography';
import Credits from './components/Credits';
import KnownFor from './components/KnownFor';

const PersonPage = () => {
  const {id} = useParams();

  interface detailsInterface {
    name: string;
    profile_path: string|null;
    also_known_as: string[];
    known_for_department: string;
    birthday: string|null;
    deathday: null|string;
    place_of_birth: string|null;
    biography: string;
  }
  interface creditsInterface {
    cast: {
      id: number;
      poster_path: string|null;
      vote_count: number;
      vote_average: number;
      media_type: "movie"|"tv";

      name: string;
      episode_count: number;
      first_air_date: string;

      title :string;
      release_date: string;

      character: string;
    }[];
    crew: {
      id: number;
      poster_path: string|null;
      vote_count: number;
      vote_average: number;
      media_type: "movie"|"tv";

      name: string;
      episode_count: number;
      first_air_date: string;

      title :string;
      release_date: string;

      department: string;
      job: string;
    }[];
  }

  const personDetails = useFetch<detailsInterface>(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_KEY}`
  )
  const personCredits = useFetch<creditsInterface>(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.REACT_APP_KEY}`
  )

  const apiCalls = [personDetails, personCredits]
  const {loading, error, errorMessage} = useCallsStatus(apiCalls);

  return (
    <>
      {loading && <LoadingPage/>}
      {!loading && error && <ErrorPage message={errorMessage}/>}
      {!loading && !error &&
       <>
        <NameBanner
          name={personDetails.data!.name}
          profile_path={personDetails.data!.profile_path}
          also_known_as={personDetails.data!.also_known_as}
          known_for_department={personDetails.data!.known_for_department}
          birthday={personDetails.data!.birthday}
          deathday={personDetails.data!.deathday}
          place_of_birth={personDetails.data!.place_of_birth}
        />
        <Biography biography={personDetails.data!.biography} />
        <KnownFor
          known_for_department={personDetails.data!.known_for_department}
          credits={personCredits.data!} 
        />
        <Credits 
          known_for_department={personDetails.data!.known_for_department}
          credits={personCredits.data!} 
        />
       </>
      }
    </>
  )
}

export default PersonPage;