import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import styles from './MinMaxSlider.module.scss';

interface Props {
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
}

const MinMaxSlider: React.FC<Props> = ({
  setMinValue, setMaxValue, minValue, maxValue, min, max, step = 1, disabled = false
}) => {
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const [firstValue, setFirstValue] = useState(minValue);
  const [secondValue, setSecondValue] = useState(maxValue);
  const [firstLeft, setFirstLeft] = useState(0);
  const [secondLeft, setSecondLeft] = useState(0);

  const observer = new ResizeObserver((entry) => {
    setFirstLeft(calculateLeft(firstValue));
    setSecondLeft(calculateLeft(secondValue));
  })
  useEffect(() => {
    observer.observe(trackWrapperRef.current as Element);
    return () => {
      observer.disconnect();
    }
  },[])

  function calculateLeft(value: number) {
    const range = max - min;
    const percentage = (value - min)/range;
    const trackWidth = trackWrapperRef.current!.getBoundingClientRect().width;
    return trackWidth * percentage - 20 * percentage;
  }
  function calculateRangeStyle() {
    if(firstLeft < secondLeft) {
      return({
        left: firstLeft + 10,
        width: secondLeft - firstLeft
      })
    }
    return({
      left: secondLeft + 10,
      width: firstLeft - secondLeft
    })
  }
  function updateValues() {
    if(firstValue < secondValue) {
      setMinValue(firstValue);
      setMaxValue(secondValue);
      return;
    }
    setMinValue(secondValue);
    setMaxValue(firstValue);
  }
  useEffect(() => {
    if(firstValue <= secondValue) {
      setFirstValue(minValue);
      setSecondValue(maxValue);
      return;
    }
    setSecondValue(minValue);
    setFirstValue(maxValue);
  },[minValue, maxValue])

  useEffect(() => {
    updateValues();
    setFirstLeft(calculateLeft(firstValue));
    setSecondLeft(calculateLeft(secondValue));
  },[firstValue, secondValue]);

  return (
    <div className={`
    ${styles.MinMaxSlider}
    ${disabled && styles.disabled}
    `}>
      <input 
        className={styles.slider}
        type="range" 
        min={min} 
        max={max}
        step={step}
        value={firstValue} 
        onChange={(e) => {setFirstValue(e.target.valueAsNumber)}}
        disabled={disabled}
      />
      <input 
        className={styles.slider}
        type="range" 
        min={min} 
        max={max}
        step={step}
        value={secondValue} 
        onChange={(e) => {setSecondValue(e.target.valueAsNumber)}}
        disabled={disabled}
      />
      <div className={styles.trackWrapper} ref={trackWrapperRef}>
        <div className={styles.track}>
          <div 
            className={styles.range}
            style={calculateRangeStyle()}
          />
          <div 
            className={styles.thumb}
            style={{
              left: firstLeft
            }}  
          />
          <div 
            className={styles.thumb}
            style={{
              left: secondLeft
            }}  
          />
        </div>
      </div>
    </div>
  )
}

export default MinMaxSlider;