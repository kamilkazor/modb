import React, { useState, useEffect } from 'react';
import styles from "./Filters.module.scss";
import { useNavigate } from "react-router-dom";

import {useSetScrollContext} from '../../../../providers/DissableScrollProvider';
import Mask from '../../../../sharedComponents/Mask';
import SortByWindow from '../SortByWindow';
import ReleaseWindow from '../ReleaseWindow';
import GenresWindow from '../GenresWindow';
import RatingsWindow from '../RatingsWindow';


interface Props {
  mediaType: "MOVIE"|"TV";
}

const MovieFilters: React.FC<Props> = ({mediaType}) => {
  const [open, setOpen] = useState<"RATINGS"|"GENRES"|"RELEASE"|"RESET"|"SORT_BY"|null>(null);
  const [sortByModified, setSortByModified] = useState(false);
  const [ratingsModified, setRatingsModified] = useState(false);
  const [genresModified, setGenresModified] = useState(false);
  const [releaseModified, setReleaseModified] = useState(false);

  const setScrollContext = useSetScrollContext();
  const navigate = useNavigate();

  useEffect(() => {
    setScrollContext(open === null);
  })

  function toggleOpen(option: typeof open) {
    open === option ? setOpen(null) : setOpen(option);
  }

  function resetAll() {
    if(mediaType === "MOVIE") {
      navigate("/movies")
    }
    if(mediaType === "TV") {
      navigate("/shows")
    }
  }

  return (
    <section className={styles.Filters}>
      <div className={styles.filtersBar}>
        <ul className={styles.options}>
          <li 
            className={`
              ${styles.option}
              ${open === "SORT_BY" && styles.selected}
              ${sortByModified && styles.modified}
            `}  
            onClick={() => {toggleOpen("SORT_BY")}}
          >
            <i className={`material-symbols ${styles.icon}`}>sort</i>
            <span className={styles.label}>SORT BY</span>
          </li>
          <li 
            className={`
              ${styles.option}
              ${open === "RATINGS" && styles.selected}
              ${ratingsModified && styles.modified}
            `} 
            onClick={() => {toggleOpen("RATINGS")}}
          >
            <i className={`material-symbols ${styles.icon}`}>star</i>
            <span className={styles.label}>RATINGS</span>
          </li>
          <li 
            className={`
              ${styles.option}
              ${open === "GENRES" && styles.selected}
              ${genresModified && styles.modified}
            `} 
            onClick={() => {toggleOpen("GENRES")}}
          >
            <i className={`material-symbols ${styles.icon}`}>theater_comedy</i>
            <span className={styles.label}>GENRES</span>
          </li>
          <li 
            className={`
              ${styles.option}
              ${open === "RELEASE" && styles.selected}
              ${releaseModified && styles.modified}
            `} 
            onClick={() => {toggleOpen("RELEASE")}}
          >
            <i className={`material-symbols ${styles.icon}`}>date_range</i>
            <span className={styles.label}>RELEASE</span>
          </li>
          <li 
            className={`
              ${styles.option}
            `} 
            onClick={resetAll}
          >
            <i className={`material-symbols ${styles.icon}`}>restart_alt</i>
            <span className={styles.label}>RESET ALL</span>
          </li>
        </ul>
      </div>
      <Mask open={Boolean(open)} onClick={() => {setOpen(null)}} />
      <SortByWindow
        open={open === "SORT_BY"}
        onClose={() => {toggleOpen(null)}}
        onNext={() => {setOpen("RATINGS")}}
        setModified={setSortByModified}
      />
      <RatingsWindow
        open={open === "RATINGS"}
        onClose={() => {setOpen(null)}}
        onNext={() => {setOpen("GENRES")}}
        setModified={setRatingsModified}
      />
      <GenresWindow
        open={open === "GENRES"}
        onClose={() => {toggleOpen(null)}}
        onNext={() => {setOpen("RELEASE")}}
        setModified={setGenresModified}
        mediaType={mediaType}
      />
      <ReleaseWindow
        open={open === "RELEASE"}
        onClose={() => {toggleOpen(null)}}
        onNext={() => {setOpen("SORT_BY")}}
        setModified={setReleaseModified}
        mediaType={mediaType}
      />
    </section>
  )
}

export default MovieFilters;