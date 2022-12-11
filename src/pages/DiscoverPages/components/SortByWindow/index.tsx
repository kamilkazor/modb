import React, {useState, useEffect} from 'react';
import styles from './SortByWindow.module.scss';
import { useSearchParams, useLocation } from "react-router-dom";

import PopupWindow from '../PopupWindow';


interface Props {
  open: boolean;
  onClose: Function;
  onNext: Function;
  setModified: React.Dispatch<React.SetStateAction<boolean>>
}

const SortByWindow: React.FC<Props> = ({
  open,
  onClose,
  onNext,
  setModified
}) => {
  type SortBy = 
  "popularity.desc"
  |"popularity.asc"
  |"vote_average.desc"
  |"vote_average.asc"
  |"release_date.desc"
  |"release_date.asc";

  const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function onReset() {
    setSortBy("popularity.desc");

    searchParams.delete("sort_by");
    setSearchParams(searchParams);
  }

  function onApply() {
    sortBy === "popularity.desc"
    ? searchParams.delete("sort_by")
    : searchParams.set("sort_by", sortBy);
    setSearchParams(searchParams);
  }

  function setFromQuery() {
    let modified = false;
    const querySortBy = searchParams.get("sort_by");
    if(querySortBy) {
      setSortBy(querySortBy as SortBy);
      modified = true;
    }
    else {
      setSortBy("popularity.desc");
    }
    setModified(modified)
  }

  useEffect(() => {
    setFromQuery();
  },[location]);

  return (
    <PopupWindow
    open={open}
    onClose={onClose}
    onReset={onReset}
    onNext={onNext}
    onApply={onApply}
    title="SORT BY"
  >
    <div className={styles.sortByWindow}>
      <button 
        className={`
          ${styles.sortingOption}
          ${sortBy==="popularity.desc" && styles.selected}
        `}
        onClick={() => {setSortBy("popularity.desc")}}
      >
        MOST POPULAR
      </button>
      <button 
        className={`
        ${styles.sortingOption}
        ${sortBy==="popularity.asc" && styles.selected}
      `}
      onClick={() => {setSortBy("popularity.asc")}}
      >
        LEAST POPULAR
      </button>
      <button 
        className={`
        ${styles.sortingOption}
        ${sortBy==="vote_average.desc" && styles.selected}
      `}
      onClick={() => {setSortBy("vote_average.desc")}}
      >
        HIGHEST SCORE
      </button>
      <button 
        className={`
        ${styles.sortingOption}
        ${sortBy==="vote_average.asc" && styles.selected}
      `}
      onClick={() => {setSortBy("vote_average.asc")}}
      >
        LOWEST SCORE
      </button>
      <button 
        className={`
        ${styles.sortingOption}
        ${sortBy==="release_date.desc" && styles.selected}
      `}
      onClick={() => {setSortBy("release_date.desc")}}
      >
        NEWEST
      </button>
      <button 
        className={`
          ${styles.sortingOption}
          ${sortBy==="release_date.asc" && styles.selected}
        `}
        onClick={() => {setSortBy("release_date.asc")}}
      >
        OLDEST
      </button>
    </div>
  </PopupWindow>
  )
}

export default SortByWindow;