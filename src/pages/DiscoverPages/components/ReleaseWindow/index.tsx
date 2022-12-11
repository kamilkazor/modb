import React, {useState, useEffect} from 'react';
import styles from './ReleaseWindow.module.scss';
import { useSearchParams, useLocation } from "react-router-dom";

import PopupWindow from '../PopupWindow';
import MinMaxSlider from '../MinMaxSlider';


interface Props {
  open: boolean;
  onClose: Function;
  onNext: Function;
  setModified: React.Dispatch<React.SetStateAction<boolean>>;
  mediaType: "MOVIE"|"TV"
}

const ReleaseWindow: React.FC<Props> = ({
  open,
  onClose,
  onNext,
  setModified,
  mediaType
}) => {

  type Upcomming = "YES"|"NO"|"ONLY";
  const [upcomming, setUpcomming] = useState<Upcomming>("YES");

  function formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }
  const today = formatDate(new Date());
  const currentYear = new Date().getFullYear();
  const [minYear, setMinYear] = useState(1878);
  const [maxYear, setMaxYear] = useState(currentYear);
  let minYearKey = "";
  let maxYearKey = "";
  if(mediaType === "MOVIE") {
    minYearKey = "primary_release_date.gte"
    maxYearKey = "primary_release_date.lte"
  }
  if(mediaType === "TV") {
    minYearKey = "first_air_date.gte"
    maxYearKey = "first_air_date.lte"
  }

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();


  function onReset() {
    setMinYear(1878);
    setMaxYear(currentYear);
    setUpcomming("YES");

    searchParams.delete(minYearKey); 
    searchParams.delete(maxYearKey);
    setSearchParams(searchParams);
  }

  function onApply() {
    if(upcomming === "ONLY") {
      searchParams.delete(maxYearKey);
      searchParams.set(minYearKey, today);
    }
    if(upcomming === "NO") {
      minYear === 1878 
      ? searchParams.delete(minYearKey) 
      : searchParams.set(minYearKey, `${minYear}-01-01`);
      maxYear === currentYear
      ? searchParams.set(maxYearKey, today)
      : searchParams.set(maxYearKey, `${maxYear}-12-31`);
    }
    if(upcomming === "YES") {
      minYear === 1878 
      ? searchParams.delete(minYearKey) 
      : searchParams.set(minYearKey, `${minYear}-01-01`);
      maxYear === currentYear
      ? searchParams.delete(maxYearKey)
      : searchParams.set(maxYearKey, `${maxYear}-12-31`);
    }
    setSearchParams(searchParams);
  }

  function setFromQuery() {
    let modified = false;
    const queryMinYear = searchParams.get(minYearKey);
    const queryMaxYear = searchParams.get(maxYearKey);
    if(queryMaxYear) {
      queryMaxYear === today && setUpcomming("NO");
      setMaxYear(new Date(queryMaxYear).getFullYear());
      modified = true;
    }
    else {
      queryMinYear !== today && setUpcomming("YES");
      setMaxYear(currentYear);
    }
    if(queryMinYear) {
      queryMinYear === today
      ? queryMinYear === today && setUpcomming("ONLY")
      : setMinYear(new Date(queryMinYear).getFullYear());
      modified = true;
    }
    else {
      setMinYear(1878);
    }
    setModified(modified);
  }

  useEffect(() => {
    setFromQuery();
  },[location]);


  function releaseYearsValue() {
    if(minYear === 1878 && maxYear === currentYear && upcomming === "YES") {
      return <span className={styles.value}>ALL</span>
    }
    if(minYear === 1878 && maxYear === currentYear && upcomming === "NO") {
      return <span className={styles.value}>ALL RELEASED</span>
    }
    if(upcomming === "ONLY") {
      return <span className={styles.value}>ONLY UPCOMMING</span>
    }
    if(minYear !== 1878 && maxYear === currentYear && upcomming === "NO") {
      return <span className={styles.value}>{minYear} - TODAY</span>
    }
    if(minYear !== 1878 && maxYear === currentYear && upcomming === "YES") {
      return <span className={styles.value}>{minYear} - UPCOMMING</span>
    }
    if(minYear === maxYear) {
      return <span className={styles.value}>{minYear}</span>
    }
    return <span className={styles.value}>{minYear} - {maxYear}</span>
  }
  function toggleUpcomming() {
    if(upcomming === "YES") {
      setUpcomming("NO");
      return;
    }
    if(upcomming === "NO") {
      setUpcomming("ONLY");
      return;
    }
    if(upcomming === "ONLY") {
      setUpcomming("YES");
      return;
    }
  }

  return (
    <PopupWindow
      open={open}
      onClose={onClose}
      onReset={onReset}
      onNext={onNext}
      onApply={onApply}
      title="RELEASE DATE"
    >
      <div className={styles.ReleaseWindow}>
        <div className={styles.years}>
          <h4 className={styles.title}>RELEASE: {releaseYearsValue()}</h4>
          <div className={styles.labels}>
            <p className={styles.label}>1878</p>
            <p className={styles.label}>TODAY</p>
          </div>
          <MinMaxSlider 
            min={1878} 
            max={currentYear} 
            minValue={minYear} 
            maxValue={maxYear} 
            setMinValue={setMinYear} 
            setMaxValue={setMaxYear}
            disabled={upcomming==="ONLY"}
          />
        </div>
        <button
          className={styles.upcommingButton}
          onClick={toggleUpcomming}
          disabled={maxYear !== currentYear}
        >
          SHOW UPCOMMING: <span className={styles.value}>{upcomming}</span>
        </button>
      </div>
    </PopupWindow>
  )
}

export default ReleaseWindow;