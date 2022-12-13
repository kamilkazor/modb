import React, {useState, useEffect} from 'react';
import styles from './RatingsWindow.module.scss';
import { useSearchParams, useLocation } from "react-router-dom";

import PopupWindow from '../PopupWindow';
import MinMaxSlider from '../MinMaxSlider';


interface Props {
  open: boolean;
  onClose: Function;
  onNext: Function;
  setModified: React.Dispatch<React.SetStateAction<boolean>>
}

const RatingsWindow: React.FC<Props> = ({
  open,
  onClose,
  onNext,
  setModified
}) => {
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(10);
  const [minVoteCount, setMinVoteCount] = useState(0);
  const [maxVoteCount, setMaxVoteCount] = useState(19);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function onReset() {
    setMinScore(0);
    setMaxScore(10);
    setMinVoteCount(0);
    setMaxVoteCount(19);

    searchParams.delete("vote_average.gte");
    searchParams.delete("vote_average.lte"); 
    searchParams.delete("vote_count.gte");
    searchParams.delete("vote_count.lte");
    setSearchParams(searchParams);
  }

  function onApply() {
    minScore === 0 
    ? searchParams.delete("vote_average.gte") 
    : searchParams.set("vote_average.gte", minScore.toString());
    maxScore === 10 
    ? searchParams.delete("vote_average.lte") 
    : searchParams.set("vote_average.lte", maxScore.toString());
    const minVoteCountValue = minVoteCount < 10 
    ? minVoteCount * 100 : (minVoteCount - 9) * 1000;
    minVoteCount === 0 
    ? searchParams.delete("vote_count.gte") 
    : searchParams.set("vote_count.gte", minVoteCountValue.toString());
    const maxVoteCountValue = maxVoteCount < 10 
    ? maxVoteCount * 100 : (maxVoteCount - 9) * 1000;
    maxVoteCount === 19 
    ? searchParams.delete("vote_count.lte") 
    : searchParams.set("vote_count.lte", maxVoteCountValue.toString());
    setSearchParams(searchParams);
    onClose();
  }

  function setFromQuery() {
    let modified = false;
    const queryMinScore = searchParams.get("vote_average.gte");
    if(queryMinScore) {
      setMinScore(Number(queryMinScore));
      modified = true;
    }
    else {
      setMinScore(0);
    }
    const queryMaxScore = searchParams.get("vote_average.lte");
    if(queryMaxScore) {
      setMaxScore(Number(queryMaxScore))
      modified = true;
    }
    else {
      setMaxScore(10)
    }
    const queryMinVoteCount = searchParams.get("vote_count.gte");
    if(queryMinVoteCount) {
      if(Number(queryMinVoteCount) < 1000) {
        setMinVoteCount(Math.floor((Number(queryMinVoteCount)/100)));
      }
      if(Number(queryMinVoteCount) >= 1000 && Number(queryMinVoteCount) <= 10000) {
        setMinVoteCount(Math.floor((Number(queryMinVoteCount)/1000)));
      }
      modified = true;
    }
    else {
      setMinVoteCount(0);
    }
    const queryMaxVoteCount = searchParams.get("vote_count.lte");
    if(queryMaxVoteCount) {
      if(Number(queryMaxVoteCount) < 1000) {
        setMaxVoteCount(Math.floor((Number(queryMaxVoteCount)/100)));
      }
      if(Number(queryMaxVoteCount) >= 1000 && Number(queryMaxVoteCount) <= 10000) {
        setMaxVoteCount(Math.floor((Number(queryMaxVoteCount)/1000)) + 9);
      }
      modified = true;
    }
    else {
      setMaxVoteCount(19);
    }
    setModified(modified);
  }

  useEffect(() => {
    setFromQuery();
  },[location]);



  function ratingScoreValue() {
    if(minScore === 0 && maxScore === 10) return <span className={styles.value}>ALL</span>;
    if(minScore === 0 && maxScore === 0) return <span className={styles.value}>UNRATED</span>;
    if(minScore === maxScore) return <span className={styles.value}>{minScore}<i className={`material-symbols ${styles.star}`}>star</i></span>;
    return <span className={styles.value}>{`${minScore} - ${maxScore}`}<i className={`material-symbols ${styles.star}`}>star</i></span>;
  }
  function voteCountValue() {
    let min = minVoteCount < 10 ? minVoteCount * 100 : (minVoteCount - 9) + "K";
    let max = maxVoteCount < 10 ? maxVoteCount * 100 : (maxVoteCount - 9) + "K";
    
    if(minVoteCount === 0 && maxVoteCount === 19) return <span className={styles.value}>ALL</span>;
    if(minVoteCount > 0 && maxVoteCount === 19) return <span className={styles.value}><span>&#8805;</span>{min}</span>;
    if(minVoteCount === maxVoteCount) return <span className={styles.value}>{min}</span>; 
    return <span className={styles.value}>{min} - {max}</span>;
  }

  return (
    <PopupWindow 
      open={open}
      onClose={onClose}
      onReset={onReset}
      onNext={onNext}
      onApply={onApply}
      title="RATINGS"
    >
      <div className={styles.RatingsWindow}>
        <div className={styles.ratingScore}>
          <h4 className={styles.title}>RATING SCORE:{ratingScoreValue()}</h4>
          <div className={styles.sliderWrapper}>
            <div className={styles.labels}>
              <p className={styles.label}>0</p>
              <p className={styles.label}>10</p>
            </div>
            <MinMaxSlider 
              min={0} 
              max={10} 
              minValue={minScore} 
              maxValue={maxScore} 
              setMinValue={setMinScore} 
              setMaxValue={setMaxScore} 
            />
          </div>
        </div>
        <div className={styles.voteCount}>
          <h4 className={styles.title}>VOTE COUNT:{voteCountValue()}</h4>
          <div className={styles.sliderWrapper}>
            <div className={styles.labels}>
              <p className={styles.label}>0</p>
              <p className={styles.label}>+10K</p>
            </div>
            <MinMaxSlider 
              min={0} 
              max={19} 
              minValue={minVoteCount} 
              maxValue={maxVoteCount} 
              setMinValue={setMinVoteCount} 
              setMaxValue={setMaxVoteCount} 
            />
          </div>
        </div>
      </div>
    </PopupWindow>
  )
}

export default RatingsWindow;