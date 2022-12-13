import React, {useState, useEffect} from 'react';
import styles from './GenresWindow.module.scss';
import { useSearchParams, useLocation } from "react-router-dom";
import { RootState } from '../../../../store/store';
import { GenresType } from '../../../../store/configurationSlice';
import { useSelector } from 'react-redux';

import PopupWindow from '../PopupWindow';


interface Props {
  open: boolean;
  onClose: Function;
  onNext: Function;
  setModified: React.Dispatch<React.SetStateAction<boolean>>;
  mediaType: "MOVIE"|"TV"
}

const GenresWindow: React.FC<Props> = ({
  open,
  onClose,
  onNext,
  setModified,
  mediaType
}) => {
  const movieGenres = useSelector((state: RootState) => (state.configuration.movieGenres));
  const tvGenres = useSelector((state: RootState) => (state.configuration.tvGenres));
  let genres: GenresType = [];
  if(mediaType === "MOVIE") genres = movieGenres;
  if(mediaType === "TV") genres = tvGenres;
  const [includeGenres, setIncludeGenres] = useState<number[]>([]);
  const [excludeGenres, setExcludeGenres] = useState<number[]>([]);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();


  function onReset() {
    setIncludeGenres([]);
    setExcludeGenres([]);

    searchParams.delete("with_genres");
    searchParams.delete("without_genres");
    setSearchParams(searchParams);
  }

  function onApply() {
    includeGenres.length === 0 
    ? searchParams.delete("with_genres")
    : searchParams.set("with_genres", includeGenres.join(","));
    excludeGenres.length === 0 
    ? searchParams.delete("without_genres")
    : searchParams.set("without_genres", excludeGenres.join(","));
    setSearchParams(searchParams);
    onClose();
  }
  function setFromQuery() {
    let modified = false;
    const queryIncludeGenres = searchParams.get("with_genres");
    const queryExcludeGenres = searchParams.get("without_genres");
    if(queryIncludeGenres) {
      setIncludeGenres(queryIncludeGenres.split(",").map((genre) => (Number(genre))));
      modified = true;
    }
    else {
      setIncludeGenres([]);
    }
    if(queryExcludeGenres) {
      setExcludeGenres(queryExcludeGenres.split(",").map((genre) => (Number(genre))));
      modified = true;
    }
    else {
      setExcludeGenres([]);
    }
    setModified(modified);
  }

  useEffect(() => {
    setFromQuery();
  },[location]);


  function createGenres(option: "INCLUDE"|"EXCLUDE") {
    const genresState = option === "INCLUDE" ? includeGenres : excludeGenres;
    function toggleGenre(genreId: number) {
      if(option === "INCLUDE") {
        includeGenres.includes(genreId) 
          ? setIncludeGenres(includeGenres.filter((id) => (id != genreId)))
          : setIncludeGenres([...includeGenres, genreId]);
        excludeGenres.includes(genreId) && setExcludeGenres(excludeGenres.filter((id) => (id != genreId)))
      }
      if(option === "EXCLUDE") {
        excludeGenres.includes(genreId) 
          ? setExcludeGenres(excludeGenres.filter((id) => (id != genreId)))
          : setExcludeGenres([...excludeGenres, genreId]);
          includeGenres.includes(genreId) && setIncludeGenres(includeGenres.filter((id) => (id != genreId)))
      }
    }
    const genresButtons: React.ReactElement[] = [];
    genres.forEach((genre) => {
      genresButtons.push(
      <button 
        className={`
          ${styles.genre}
          ${genresState.includes(genre.id) && styles.active}
        `} 
        key={genre.id}
        onClick={() => {toggleGenre(genre.id)}}
      >
        {genre.name}
      </button>)
    })
    return genresButtons;
  }
  function includeValue() {
    if(includeGenres.length === 0 || includeGenres.length === genres.length) {
      return <span className={styles.value}>ALL</span>
    }
    return <span className={styles.value}>SELECTED</span>
  }
  function excludeValue() {
    if(excludeGenres.length === 0) return <span className={styles.value}>NONE</span>
    if(excludeGenres.length === genres.length) return <span className={styles.value}>ALL</span>

    return <span className={styles.value}>SELECTED</span>
  }

  return (
    <PopupWindow
        open={open}
        onClose={onClose}
        onReset={onReset}
        onNext={onNext}
        onApply={onApply}
        title="GENRES"
      >
        <div className={styles.GenresWindow}>
          <h4 className={styles.title}>LOOK FOR: {includeValue()}</h4>
          <p className={styles.description}>Select genres that you are looking for:</p>
          <div className={styles.genresWrapper}>
            {createGenres("INCLUDE")}
          </div>
          <h4 className={styles.title}>BLACKLIST: {excludeValue()}</h4>
          <p className={styles.description}>Select genres that should be filtered out:</p>
          <div className={styles.genresWrapper}>
            {createGenres("EXCLUDE")}
          </div>
        </div>
      </PopupWindow>
  )
}

export default GenresWindow;