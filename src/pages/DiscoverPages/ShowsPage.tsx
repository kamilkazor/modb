import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import useFetch from '../../hooks/useFetch';
import useCallsStatus from '../../hooks/useCallsStatus';
import { useLocation } from 'react-router-dom';
import styles from "./Discover.module.scss";

import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';
import Filters from './components/Filters';
import InfiniteScroll from '../../sharedComponents/InfiniteScroll';
import ShowCard from '../../sharedComponents/ShowCard';


interface Show {
  id: number;
  poster_path: string|null;
  name: string;
  vote_count: number;
  vote_average: number;
  first_air_date: number;
  genre_ids: number[];
}
interface Shows {
  page: number,
  total_pages: number;
  total_results: number;
  results: Show[];
}



const ShowsPage = () => {

  const [page, setPage] = useState<any>(1);
  const [results, setResults] = useState<Show[]>([]);

  const [initialLoading, setInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState(false);

  const {search} = useLocation();
  const [searchQuery, setSearchQuery] = useState(search ? `&${search.substring(1)}` : "");

  useEffect(() => {
    setResults([]);
    setPage(1);
    setSearchQuery(search ? `&${search.substring(1)}` : "");
  },[search])

  const call = useFetch<Shows>(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_KEY}&page=${page}${searchQuery}`
  )
  const apiCalls = [call];
  const { loading, error, errorMessage } = useCallsStatus(apiCalls);

  useEffect(() => {
    if(!loading && initialLoading) {
      setInitialLoading(false);
      if(error) setInitialError(error);
    }
  },[loading, error])

  const fetchMore = React.useCallback(() => {
    if(call.data!.page < call.data!.total_pages) {
      setPage(call.data!.page + 1);
    }
  },[call.data]);

  useEffect(() => {
    if(!call.loading && call.data) {
      setResults([...results, ...call.data.results])
    }
  },[call.loading]);

  function returnBottomMessage() {
    if(call.loading) return "Loading...";
    if(call.error) return `${call.statusCode} - ${call.error}`;
    if(call.data && call.data.page >= call.data.total_pages) return "No more results";
    if(call.data && call.data.total_results === 0) return "No results";
  }


  return (
    <>
    {initialLoading && <LoadingPage/>}
    {!initialLoading && initialError && <ErrorPage message={errorMessage}/>}
    {!initialLoading && !initialError &&
    <>
      <Filters mediaType="TV"/>
      <section className={styles.results}>
          <InfiniteScroll
          onIntersection={fetchMore} 
          bottomMessage={returnBottomMessage()}
        >
          {results.map((result, i) => (
            <ShowCard show={result} key={`movie${i}`}/>
          ))}
        </InfiniteScroll>
      </section>
    </>
    }
    </>
  )
}

export default ShowsPage;