import React, { useState, useEffect, useLayoutEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import useCallsStatus from '../../hooks/useCallsStatus';
import { useParams } from 'react-router-dom';
import styles from './SearchPage.module.scss';

import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';
import InfiniteScroll from '../../sharedComponents/InfiniteScroll';
import MovieCard from '../../sharedComponents/MovieCard';
import ShowCard from '../../sharedComponents/ShowCard';
import PersonCard from '../../sharedComponents/PersonCard';


interface Movie {
  id: number;
  poster_path: string|null;
  title: string;
  vote_count: number;
  vote_average: number;
  release_date: number;
  genre_ids: number[];
}
interface Show {
  id: number;
  poster_path: string|null;
  name: string;
  vote_count: number;
  vote_average: number;
  first_air_date: number;
  genre_ids: number[];
}
interface Person {
  id: number;
  profile_path: string|null;
  name: string;
  known_for_department: string;
}

interface Movies {
  page: number,
  total_pages: number;
  total_results: number;
  results: Movie[];
}
interface TvShows {
  page: number,
  total_pages: number;
  total_results: number;
  results: Show[];
}
interface People {
  page: number,
  total_pages: number;
  total_results: number;
  results: Person[];
}

const SearchPage = () => {

  const { searchFor } = useParams();
  const [selected, setSelected] = useState<"MOVIES"|"TV"|"PEOPLE">("MOVIES");

  const [moviesPage, setMoviesPage] = useState<number>(1);
  const [moviesResults, setMoviesResults] = useState<Movie[]>([]);
  const [moviesTotalResults, setMoviesTotalResults] = useState(0);
  const [tvPage, setTvPage] = useState(1);
  const [tvResults, setTvResults] = useState<Show[]>([]);
  const [tvTotalResults, setTvTotalResults] = useState(0);
  const [peoplePage, setPeoplePage] = useState(1);
  const [peopleResults, setPeopleResults] = useState<Person[]>([]);
  const [peopleTotalResults, setPeopleTotalResults] = useState(0);

  const [initialLoading, setInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState(false);

  useEffect(() => {
    setInitialLoading(true);
    setInitialError(false);
    setMoviesPage(1);
    setMoviesResults([]);
    setMoviesTotalResults(0);
    setTvPage(1);
    setTvResults([]);
    setTvTotalResults(0);
    setPeoplePage(1);
    setPeopleResults([]);
    setPeopleTotalResults(0);
  },[searchFor])

  const moviesCall = useFetch<Movies>(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&page=${moviesPage}&query=${searchFor}`
  )
  const tvCall = useFetch<TvShows>(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_KEY}&page=${tvPage}&query=${searchFor}`
  )
  const peopleCall = useFetch<People>(
    `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_KEY}&page=${peoplePage}&query=${searchFor}`
  )
  
  const apiCalls = [moviesCall, tvCall, peopleCall];
  const { loading, error, errorMessage } = useCallsStatus(apiCalls);

  useEffect(() => {
    if(!loading && initialLoading) {
      setInitialLoading(false);
      if(error) setInitialError(error);
    }
  },[loading, error])

  function returnBottomMessage() {
    let call;
    let message =" ";
    if(selected === "MOVIES") call = moviesCall;
    if(selected === "TV") call = tvCall;
    if(selected === "PEOPLE") call = peopleCall;
    if(call) {
      if(call.loading) message = "Loading...";
      if(call.error) message = `${call.statusCode} - ${call.error}`;
      if(call.data && call.data.page >= call.data.total_pages) message = "No more results";
      if(call.data && call.data.total_results === 0) message = "No results";
    }
    return message;
  }

  useLayoutEffect(() => {
    if(initialLoading) return;
    if(moviesCall.data && tvCall.data && peopleCall.data) {
      setMoviesTotalResults(moviesCall.data.total_results);
      setTvTotalResults(tvCall.data.total_results);
      setPeopleTotalResults(peopleCall.data.total_results);
      if(moviesCall.data.total_results >= tvCall.data.total_results
        && moviesCall.data.total_results >= peopleCall.data.total_results) {
          setSelected("MOVIES")
        }
      if(tvCall.data.total_results > moviesCall.data.total_results
        && tvCall.data.total_results >= peopleCall.data.total_results) {
        setSelected("TV")
      }
      if(peopleCall.data.total_results > moviesCall.data.total_results
        && peopleCall.data.total_results > tvCall.data.total_results) {
        setSelected("PEOPLE")
      }
    }
  },[initialLoading])

  const fetchMoreMovies = React.useCallback(() => {
    if(moviesCall.data!.page < moviesCall.data!.total_pages) {
      setMoviesPage(moviesPage + 1);
    }
  },[moviesCall.data]);
  const fetchMoreShows = React.useCallback(() => {
    if(tvCall.data!.page < tvCall.data!.total_pages) {
      setTvPage(tvPage + 1);
    }
  },[tvCall.data]);
  const fetchMorePeople = React.useCallback(() => {
    if(peopleCall.data!.page < peopleCall.data!.total_pages) {
      setPeoplePage(peoplePage + 1);
    }
  },[peopleCall.data]);


  useEffect(() => {
    if(!moviesCall.loading && moviesCall.data) {
      setMoviesResults([...moviesResults, ...moviesCall.data.results])
    }
  },[moviesCall.loading]);
  useEffect(() => {
    if(!tvCall.loading && tvCall.data) {
      setTvResults([...tvResults, ...tvCall.data.results])
    }
  },[tvCall.loading]);
  useEffect(() => {
    if(!peopleCall.loading && peopleCall.data) {
      setPeopleResults([...peopleResults, ...peopleCall.data.results])
    }
  },[peopleCall.loading]);

  return (
    <>
    {initialLoading && <LoadingPage/>}
    {!initialLoading && initialError && <ErrorPage message={errorMessage}/>}
    {!initialLoading && !initialError &&
    <>
      <div className={styles.header}>
        <h2 className={styles. title}>Search resluts for: <span className={styles.searchFor}>"{searchFor}"</span></h2>
        <ul className={styles.options}>
          <li 
            className={`
            ${styles.option}
            ${selected === "MOVIES" && styles.selected}
            `} 
            onClick={()=>{setSelected("MOVIES")}}
            >
              <h3 className={styles.label}>MOVIES: <span className={styles.amount}>{moviesTotalResults}</span></h3>
          </li>
          <li
            className={`
            ${styles.option}
            ${selected === "TV" && styles.selected}
            `} 
            onClick={()=>{setSelected("TV")}}
          >
            <h3 className={styles.label}>TV SHOWS: <span className={styles.amount}>{tvTotalResults}</span></h3>
          </li>
          <li
            className={`
            ${styles.option}
            ${selected === "PEOPLE" && styles.selected}
            `}
            onClick={()=>{setSelected("PEOPLE")}}
          >
            <h3 className={styles.label}>PEOPLE: <span className={styles.amount}>{peopleTotalResults}</span></h3>
          </li>
        </ul>
      </div>
    <section className={styles.results}>
      {selected === "MOVIES" &&
      <InfiniteScroll
        onIntersection={fetchMoreMovies} 
        bottomMessage={returnBottomMessage()}
      >
        {moviesResults.map((result, i) => (
          <MovieCard movie={result} key={`movie${i}`}/>
        ))}
      </InfiniteScroll>
      }
      {selected === "TV" &&
      <InfiniteScroll
        onIntersection={fetchMoreShows}
        bottomMessage={returnBottomMessage()}
      >
        {tvResults.map((result, i) => (
          <ShowCard show={result} key={`show${i}`}/>
        ))}
      </InfiniteScroll>
      }
      {selected === "PEOPLE" &&
      <InfiniteScroll
        onIntersection={fetchMorePeople}
        bottomMessage={returnBottomMessage()}
      >
        {peopleResults.map((result, i) => (
          <PersonCard person={result} key={`person${i}`}/>
        ))}
      </InfiniteScroll>
      }
    </section>
    </>
    }
    </>
  )
}

export default SearchPage;