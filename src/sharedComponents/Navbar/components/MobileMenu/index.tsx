import React, {useState, useEffect, useRef} from 'react';
import styles from './MobileMenu.module.scss';
import { CSSTransition } from 'react-transition-group';
import { Link, useLocation } from 'react-router-dom';

import Mask from '../../../Mask';
import {ReactComponent as Logo} from "../../../../assets/Logo.svg"

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const MobileMenu: React.FC<Props> = ({children, open, setOpen}) => {

const location = useLocation();
useEffect(() => {
  setOpen(false);
},[location])

  return (
    <>
      <Mask open={open} onClick={() => {setOpen(false)}} zIndex={10001}/>
      <CSSTransition in={open} timeout={500} classNames={{
        enter: styles.MobileMenuEnter,
        enterActive: styles.MobileMenuEnterActive,
        enterDone: styles.MobileMenuEnterDone,
        exit: styles.MobileMenuExit,
        exitActive: styles.MobileMenuExitActive,
        exitDone: styles.MobileMenuExitDone
      }}>
      <div className={styles.MobileMenu}>
        <div className={styles.bar}>
          <Link to="/">
            <Logo className={styles.logo}/>
          </Link>
          <button onClick={() => {setOpen(false)}}>
            <i className={`material-symbols ${styles.close}`}>close</i>
          </button>
        </div>
        {children}
      </div>
      </CSSTransition>
    </>
  )
}

export default MobileMenu;