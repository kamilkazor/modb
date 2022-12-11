import React, {useEffect} from 'react';
import styles from './App.module.scss';
import './global.scss';
import {Route, Routes} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLanguages, LanguagesType, setMovieGenres, setTvGenres, GenresType } from './store/configurationSlice';
import useFetch from './hooks/useFetch';
import useCallsStatus from './hooks/useCallsStatus';

import Navbar from './sharedComponents/Navbar';
import ScrollTop from './sharedComponents/ScrollTop';
import Footer from './sharedComponents/Footer';
import HomePage from './pages/HomePage';
import ShowPage from './pages/DetailsPages/ShowPage';
import MoviePage from './pages/DetailsPages/MoviePage';
import ErrorPage from './pages/ErrorPage';
import LoadingPage from './pages/LoadingPage';
import PersonPage from './pages/PersonPage';
import SearchPage from './pages/SearchPage';
import MoviesPage from './pages/DiscoverPages/MoviesPage';
import ShowsPage from './pages/DiscoverPages/ShowsPage';

import useScrollToTop from './hooks/useScrollToTop';
import DissableScrollProvider from './providers/DissableScrollProvider';


const App = () => {
  const dispatch = useDispatch();
  useScrollToTop();

  const languagesConfig = useFetch<LanguagesType>(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.REACT_APP_KEY}`
  )
  const movieGenresConfig = useFetch<{genres: GenresType}>(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_KEY}`
  )
  const tvGenresConfig = useFetch<{genres: GenresType}>(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_KEY}`
  )
  useEffect(() => {
    if(languagesConfig.data) {
      dispatch(setLanguages(languagesConfig.data));
    }
  }, [languagesConfig.data])
  useEffect(() => {
    if(movieGenresConfig.data) {
      dispatch(setMovieGenres(movieGenresConfig.data.genres));
    }
  }, [movieGenresConfig.data])
  useEffect(() => {
    if(tvGenresConfig.data) {
      dispatch(setTvGenres(tvGenresConfig.data.genres));
    }
  }, [tvGenresConfig.data])


  const apiCalls = [languagesConfig, movieGenresConfig, tvGenresConfig];
  const { loading, error, errorMessage } = useCallsStatus(apiCalls);


  return (
    <DissableScrollProvider>

    <div className={styles.App}>
      <Navbar/>
      <ScrollTop/>
      <main className={styles.main}>
        {loading && <LoadingPage/>}
        {!loading && error && <ErrorPage message={errorMessage}/>}
        {!loading && !error &&
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/movie/:id" element={<MoviePage/>}/>
            <Route path="/show/:id" element={<ShowPage/>}/>
            <Route path="/person/:id" element={<PersonPage/>}/>
            <Route path="/search/:searchFor" element={<SearchPage/>}/>
            <Route path="/movies" element={<MoviesPage/>}/>
            <Route path="/shows" element={<ShowsPage/>}/>
          </Routes>
        }
      </main>
      <Footer/>
    </div>
    </DissableScrollProvider>
  );
}

export default App;
