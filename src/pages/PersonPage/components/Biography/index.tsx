import React, {useRef, useState, useLayoutEffect} from 'react';
import styles from './Biography.module.scss';

import SubsectionTitle from '../../../../sharedComponents/SubsectionTitle';


interface Props {
  biography: String;
}

const Biography: React.FC<Props> = ({ biography }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [showAll, setShowAll] = useState(false);
  const [minHeight, setMinHeight] = useState<number>();
  const [maxHeight, setMaxHeight] = useState<number>();

  function calculateMaxHeight() {
    const wrapperRect = wrapperRef.current!.getBoundingClientRect();
    const textRect = textRef.current!.getBoundingClientRect();
    const height = textRect.bottom - wrapperRect.top;
    setMaxHeight(height);
    setMinHeight(height < 160 ? height : 160);
  }

  function buttonHandler() {
    setShowAll(!showAll);
  }

  useLayoutEffect(() => {
    calculateMaxHeight();
    window.addEventListener("resize", calculateMaxHeight);
    return () => {
      window.removeEventListener("resize", calculateMaxHeight)
    }
  },[showAll]);

  return (
    <div className={styles.Biography}>
      <SubsectionTitle>Biography:</SubsectionTitle>
      <div
        ref={wrapperRef} 
        className={styles.textWrapper}
        style={{
          height: showAll ? (maxHeight! + 20) : minHeight
        }}
      >
        <div
          ref={textRef} 
          className={styles.text}
        >
          {biography ? biography : "There is no biography added."}
        </div>
        <button 
          className={styles.readAll}
          onClick={buttonHandler}
          style={{
            display: maxHeight! > minHeight! ? "block" : "none",
          }}
        >
          {!showAll ? "show all" : "show less"}
        </button>
      </div>
    </div>
  )
}

export default Biography;