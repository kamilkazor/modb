import React, {useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './PopupWindow.module.scss';


interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onReset: Function;
  onNext: Function;
  onApply: Function;
  title: string;
}

const PopupWindow: React.FC<Props> = ({children, open, onClose, onReset, onNext, onApply, title}) => {
  const popupWindowRef = useRef<HTMLDivElement>(null);
  function close(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(e.target === popupWindowRef.current) {
      onClose();
    }
  }
  return (
    <CSSTransition in={open} timeout={500} classNames={{
      enter: styles.PopupWindowEnter,
      enterActive: styles.PopupWindowEnterActive,
      enterDone: styles.PopupWindowEnterDone,
      exit: styles.PopupWindowExit,
      exitActive: styles.PopupWindowExitActive,
      exitDone: styles.PopupWindowExitDone
    }}>
      <div className={styles.PopupWindow} ref={popupWindowRef} onClick={(e) => {close(e)}}>
        <div className={styles.window}>
          <div className={styles.bar}>
            <button 
              className={`${styles.button} ${styles.resetButton}`} 
              onClick={() => {onReset()}}
            >
              RESET
            </button>
            <h4 className={styles.title}>{title}</h4>
            <button 
              className={`${styles.button} ${styles.closeButton}`} 
              onClick={() => {onClose()}}
            >
              <span className="material-symbols">close</span>
            </button>
          </div>
          <div className={styles.contentWrapper}>
            {children}
          </div>
          <div className={styles.bottomBar}>
          <button 
          className={`${styles.button} ${styles.nextButton}`}
          onClick={() => {onNext()}}
          >
            NEXT
          </button>
          <button 
            className={`${styles.button} ${styles.applyButton}`}
            onClick={() => {onApply()}}
          >
            APPLY
          </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default PopupWindow;