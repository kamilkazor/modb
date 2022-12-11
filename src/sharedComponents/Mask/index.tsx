import React, { useState, useEffect, useLayoutEffect, useRef, ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Mask.module.scss';


interface Props {
  open: boolean;
  onClick?: Function;
  zIndex?: number;
}

const Mask: React.FC<Props> = ({open, onClick, zIndex = 1000}) => {
  
  function clickHandler() {
    if(onClick) onClick();
  }

  return (
    <CSSTransition
      in={open}
      timeout = {500}
      classNames={{
        enter: styles.MaskEnter,
        enterActive: styles.MaskEnterActive,
        enterDone: styles.MaskEnterDone,
        exit: styles.MaskExit,
        exitActive: styles.MaskExitActive,
        exitDone: styles.MaskExitDone
      }}
    >
      <div 
        className={styles.Mask}
        style={{zIndex: zIndex}}
        onClick={clickHandler}
      >
      </div>
    </CSSTransition>
  )
}

export default Mask;