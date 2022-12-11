import React, { createRef, useEffect, useRef, useState } from 'react';
import { Children } from 'react';
import styles from './Slider.module.scss';

interface SliderProps {
  children?: JSX.Element | JSX.Element[];
}

const Slider: React.FC<SliderProps> = ({children}) => {
  const [movedElements, setMovedElements] = useState(0);
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(true);
  const visibleElements = useRef(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const childrenArray = Children.toArray(children);
  
  
  const [hold, _setHold] = useState(false);
  const holdRef = useRef(hold);
  const setHold = (value: boolean) => {
    _setHold(value);
    holdRef.current = value;
  }
  const touchStart = useRef(0);
  const touchTranslation = useRef(0);
  const translateAmountStart = useRef(0);
  const [translateAmount, setTranslateAmount] = useState(0);
  const elementWidth = useRef(0);
  const listWrapperWidth = useRef(0);
  const maxTranslateRight = useRef(0);
  
  
  const moveToElement = (elementNumber: number) => {
    let moveTo = elementNumber;
    if(moveTo < 0) {
      moveTo = 0;
    }
    if(moveTo > childrenArray.length - visibleElements.current) {
      moveTo = childrenArray.length - visibleElements.current;
    }
    if(childrenArray.length < visibleElements.current) {
      moveTo = 0;
    }
    setMovedElements(moveTo);
  } 
  const moveSlider = (dirrection: "LEFT"|"RIGHT") => {
    switch(dirrection) {
      case "LEFT":
        moveToElement(movedElements - visibleElements.current);
        break;
      case "RIGHT":
        moveToElement(movedElements + visibleElements.current)
        break;
    }
  }
      
  const updateButtons = () => {
    movedElements > 0 ? setLeftButtonDisabled(false) : setLeftButtonDisabled(true);
    movedElements < childrenArray.length - visibleElements.current ?
    setRightButtonDisabled(false) : setRightButtonDisabled(true);
  }
        
  const touchStartHandler = (e: TouchEvent) => {
    if(e.target === sliderRef.current || sliderRef.current?.contains(e.target as Element)) {
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      const listWrapperRect = listWrapperRef.current!.getBoundingClientRect();
      const targetsListWrapper = clientX > listWrapperRect.left && 
      clientX < listWrapperRect.right &&
      clientY > listWrapperRect.top &&
      clientY < listWrapperRect.bottom;
      if(targetsListWrapper) {
        touchStart.current = e.touches[0].clientX;
        translateAmountStart.current = listRef.current!.getBoundingClientRect().left - listWrapperRect.left;
  
        setTranslateAmount(translateAmountStart.current);
  
        setHold(true);
        setLeftButtonDisabled(true);
        setRightButtonDisabled(true);
      }
    }
  }
  const touchMoveHandler = (e: TouchEvent) => {
    if(holdRef.current) {
      const maxOverTranslate = elementWidth.current / 3;
      touchTranslation.current = e.touches[0].clientX - touchStart.current;
      let updatedTranslateAmount = translateAmountStart.current + touchTranslation.current;
      if(touchTranslation.current > listWrapperWidth.current + maxOverTranslate) {
        updatedTranslateAmount = translateAmountStart.current + listWrapperWidth.current + maxOverTranslate;
      }
      if(touchTranslation.current < -listWrapperWidth.current - maxOverTranslate) {
        updatedTranslateAmount = translateAmountStart.current  - listWrapperWidth.current - maxOverTranslate;
      }
      if(updatedTranslateAmount > maxOverTranslate) {
        updatedTranslateAmount = maxOverTranslate;
      }
      if(updatedTranslateAmount < maxTranslateRight.current - maxOverTranslate) {
        updatedTranslateAmount = maxTranslateRight.current - maxOverTranslate;
      }
      setTranslateAmount(updatedTranslateAmount)
    }
  }
  const touchEndHandler = (e: TouchEvent) => {
    if(holdRef.current) {
      if(touchTranslation.current > elementWidth.current / 3) moveSlider("LEFT");
      if(touchTranslation.current < (elementWidth.current / 3) * -1) moveSlider("RIGHT");
      touchTranslation.current = 0;
      setHold(false);
      updateButtons();
    }
  }

  const updateSliderData = () => {
    visibleElements.current = parseInt(getComputedStyle(sliderRef.current!).getPropertyValue("--visibleElements"));
    listWrapperWidth.current = listWrapperRef.current!.getBoundingClientRect().width;

    if(childrenArray.length === 0) {
      elementWidth.current = 0;
      maxTranslateRight.current = 0;
    }
    else if(childrenArray.length < visibleElements.current) {
      let listElement = listRef.current!.querySelector("li");
      elementWidth.current = parseInt(getComputedStyle(listElement!).getPropertyValue("width"));
      maxTranslateRight.current = 0;
    }
    else {
      let listElement = listRef.current!.querySelector("li");
      let listElements = listRef.current!.querySelectorAll("li");
      elementWidth.current = parseInt(getComputedStyle(listElement!).getPropertyValue("width"));
      maxTranslateRight.current = (listElements[listElements.length - visibleElements.current].getBoundingClientRect().left 
      - listElements[0].getBoundingClientRect().left) * -1;
    }
    moveToElement(movedElements);
  }
  
  useEffect(() => {
    updateSliderData();
    updateButtons();

    const resizeHandler = (e: UIEvent) => {
      updateSliderData();
      updateButtons();
    }
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("touchstart", touchStartHandler);
    window.addEventListener("touchmove", touchMoveHandler);
    window.addEventListener("touchend", touchEndHandler);
    window.addEventListener("touchcancel", touchEndHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("touchstart", touchStartHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
      window.removeEventListener("touchend", touchEndHandler);
      window.removeEventListener("touchcancel", touchEndHandler);
    };
  },[movedElements, children])


  interface sliderStyleInterface extends React.CSSProperties{
    "--movedElements" : number;
    "--translateAmount" : string;
  }
  const sliderStyle: sliderStyleInterface = {
    "--movedElements" : movedElements,
    "--translateAmount" : translateAmount + "px"
  }

  return (
    <div 
      className={styles.Slider}
      style={sliderStyle}
      ref={sliderRef}>
        <div className={styles.track}>
          <button 
            onClick={() => {moveSlider("LEFT")}}
            disabled={leftButtonDisabled}
            className={
              `
              ${styles.button}
              ${styles.left}
              ${!leftButtonDisabled ? styles.show : ""}
            `}></button>
          <button 
            onClick={() => {moveSlider("RIGHT")}}
            disabled={rightButtonDisabled}
            className={`
              ${styles.button}
              ${styles.right}
              ${!rightButtonDisabled ? styles.show : ""}
            `}></button>
          <div className={styles.listWrapper} ref={listWrapperRef}>
            <ul 
              className={`
              ${styles.list}
              ${hold ? styles.hold : ""}
              `}
              ref={listRef}
            >
              {childrenArray.map((child, index) => {
                return (
                  <li key={index} className={styles.listElement}>{child}</li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Slider;