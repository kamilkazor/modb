import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './ScrollTop.module.scss';



const ScrollTop = () => {
  const [show, setShow] = useState(false);

  const lastScroll = useRef(0);
  const scrollDirrection = useRef<"DOWN"|"UP">("DOWN");
  const scrollChange = useRef(0);

  useEffect(() => {
    function scrollHandler(e: Event) {
      const currentScroll = window.scrollY;
      if(scrollDirrection.current === "DOWN" && currentScroll < lastScroll.current) {
        scrollDirrection.current = "UP";
        scrollChange.current = lastScroll.current;
      }
      if(scrollDirrection.current === "UP" && currentScroll > lastScroll.current) {
        scrollDirrection.current = "DOWN";
        scrollChange.current = lastScroll.current;
      }
      if(scrollDirrection.current === "UP" && currentScroll + 85 < scrollChange.current) {
        setShow(true);
      }
      if(scrollDirrection.current === "DOWN" && currentScroll - 85 < scrollChange.current) {
        setShow(false);
      }
      if(currentScroll < 85) {
        setShow(false);
      }
      lastScroll.current = currentScroll;
    }
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  },[])

  return (
    <div className={styles.scrollTop}>
        <CSSTransition in={show} timeout={500} classNames={{
          enter: styles.buttonEnter,
          enterActive: styles.buttonEnterActive,
          enterDone: styles.buttonEnterDone,
          exit: styles.buttonExit,
          exitActive: styles.buttonExitActive,
          exitDone: styles.buttonExitDone
        }}>
          <button 
            className={styles.button} 
            onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}}
          >
            TOP
          </button>
        </CSSTransition>
      </div>
  )
}

export default ScrollTop;