import React, { useState, useRef, useEffect, Children } from 'react';
import styles from './Accordion.module.scss';


interface Props {
  children: JSX.Element[] | JSX.Element | undefined;
  title: JSX.Element|string;
  initialLengthLimit?: number;
  bottomButtonText?: string;
}

const Accordion: React.FC<Props> = ({ 
  children, initialLengthLimit, 
  title, 
  bottomButtonText = "show all" 
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const liRefs = useRef<HTMLLIElement[]>([]);
  const [open, setOpen] = useState(false);
  const [showNum, setShowNum] = useState(0);
  const [height, setHeight] = useState(0);

  const lengthAll = Children.toArray(children).length;
  const lengthShort = initialLengthLimit && initialLengthLimit < lengthAll 
    ? initialLengthLimit 
    : lengthAll;

  function createList() {
    const listElements  = Children.toArray(children).map((child, i) => {
      return (
        <li
          key={i}
          ref={(el) => {liRefs.current[i] = el as HTMLLIElement}}
          className={styles.listElement}
        >
          {child}
        </li>
      )
    })
    return listElements;
  }

  function calculateHeight() {
    if(!open) {
      setHeight(0);
      return;
    }
    if(open && showNum === 0) {
      setHeight(50);
      return;
    }
    const ulrect = ulRef.current!.getBoundingClientRect();
    const lirect = liRefs.current[showNum -1]!.getBoundingClientRect();
    setHeight(lirect.bottom - ulrect.top + 50);
  }
  function openList() {
    if(open) {
      setOpen(false);
      setShowNum(0);
      return;
    }
    setOpen(true);
    setShowNum(lengthShort);
  }
  function bottomButtonHandler() {
    if(open && showNum === lengthAll) {
      setOpen(false);
      setShowNum(0);
      return;
    }
    setShowNum(lengthAll);
  }

  useEffect(() => {
    calculateHeight();
    const observer = new ResizeObserver((entry) => {
      calculateHeight();
    })
    observer.observe(ulRef.current as Element);
    return () => {
      observer.disconnect();
    }
  },[showNum, open])


  return (
    <div className={styles.Accordion}>
      <button
        className={`
        ${styles.titleBar}
        ${open && styles.open}
        `}
        onClick={openList}
      >
        <div ref={wrapperRef} className={styles.titleWrapper}>
          {title}
        </div>
        <div className={styles.arrow}></div>
      </button>
      <div className={styles.listWrapper} style={{height: height}}>
        <ul
          ref={ulRef} 
          className={styles.list}
        >
          {createList()}
        </ul>
        <button 
          className={styles.bottomButton} 
          onClick={bottomButtonHandler}
          >
            <p className={styles.buttonText}>
              {showNum === lengthAll || showNum === 0 ? "close" : `${bottomButtonText}`}
            </p>
        </button>
      </div>
    </div>
  )
}

export default Accordion;