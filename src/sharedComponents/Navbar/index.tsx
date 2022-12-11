import React, {useEffect, useState, useRef} from 'react';
import styles from './Navbar.module.scss';
import { Link, useLocation } from 'react-router-dom';

import {ReactComponent as Logo} from "../../assets/Logo.svg"
import {ReactComponent as GithubIcon} from '../../assets/github-icon.svg';
import Search from './components/Search';

import MobileMenu from './components/MobileMenu';


const Navbar: React.FC = () => {
  const location = useLocation();
  const lastScroll = useRef(0);
  const scrollDirrection = useRef<"DOWN"|"UP">("DOWN");
  const scrollChange = useRef(0);

  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const mobileSearchButtonRef = useRef<HTMLButtonElement>(null);

  const [sticky, setSticky] = useState(false)
  const [show, setShow] = useState(false);


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
      if(currentScroll > 85) {
        setSticky(true);
      }
      if(currentScroll < 85) {
        setSticky(false);
      }
      if(scrollDirrection.current === "UP" && currentScroll + 85 < scrollChange.current) {
        setShow(true);
      }
      if(scrollDirrection.current === "DOWN" && currentScroll - 85 < scrollChange.current) {
        setShow(false);
      }
      lastScroll.current = currentScroll;
    }

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  },[]);


  return (
    <>
      <div className={styles.placeholder}></div>
      <nav 
        className={`
        ${styles.Navbar}
        ${sticky && styles.sticky}
        ${show && styles.show}
        `}
      > 
        <Search open={openSearch} setOpen={setOpenSearch} buttonsRef={[searchButtonRef, mobileSearchButtonRef]}/>
        <div className={styles.content}>
          <div className={styles.mobile}>
            <MobileMenu open={openMenu} setOpen={setOpenMenu}>
              <div className={styles.menuOptions}>
              <ul className={styles.links}>
                <li className={`
                  ${styles.link} ${location.pathname === "/" && styles.activePath}
                `}>
                  <Link to={"/"}>HOME</Link>
                </li>
                <li className={`
                  ${styles.link} ${location.pathname === "/movies" && styles.activePath}
                `}>
                  <Link to={"/movies"}>MOVIES</Link>
                </li>
                <li className={`
                  ${styles.link} ${location.pathname === "/shows" && styles.activePath}
                `}>
                  <Link to={"/shows"}>TV SHOWS</Link>
                </li>
              </ul>
                <ul className={`${styles.links} ${styles.external}`}>
                  <li className={styles.link}>
                    <a 
                      href="https://github.com/kamilkazor/modb"
                      className={styles.externalLink}
                    >
                      <GithubIcon className={styles.githubIcon}/>
                      <span className={styles.linkLabel}>PROJECT</span>
                    </a>
                  </li>
                  <li className={styles.link}>
                    <a 
                      href="https://www.themoviedb.org/documentation/api" 
                      className={styles.externalLink}
                    >
                      <div className={styles.apiIcon}>API</div>
                      <span className={styles.linkLabel}>TMDB</span>
                    </a>
                  </li>
                </ul>
              </div>
            </MobileMenu>
            <button onClick={() => {setOpenMenu(true)}}>
              <i className={`material-symbols ${styles.hamburger}`}>menu</i>
            </button>
            <button 
              ref={mobileSearchButtonRef}
              className={`${styles.searchButton} ${openSearch && styles.active}`} 
              onClick={() => {setOpenSearch(!openSearch)}}
            >
              <i className={`material-symbols  ${styles.lupe}`}>search</i>
            </button>
          </div>
          <div className={styles.largeDevices}>
            <Link to="/"><Logo className={styles.logo}/></Link>
            <ul className={styles.links}>
              <li className={`
                ${styles.link} ${location.pathname === "/" && styles.activePath}
              `}>
                <Link to={"/"}>HOME</Link>
              </li>
              <li className={`
                ${styles.link} ${location.pathname === "/movies" && styles.activePath}
              `}>
                <Link to={"/movies"}>MOVIES</Link>
              </li>
              <li className={`
                ${styles.link} ${location.pathname === "/shows" && styles.activePath}
              `}>
                <Link to={"/shows"}>TV SHOWS</Link>
              </li>
            </ul>
            <div className={styles.icons}>
              <button 
                ref={searchButtonRef}
                className={`${styles.searchButton} ${openSearch && styles.active}`} 
                onClick={() => {setOpenSearch(!openSearch)}}
              >
                <i className={`material-symbols  ${styles.lupe}`}>search</i>
              </button>
              <a 
                className={styles.externalLink} 
                href="https://github.com/kamilkazor/modb"
              >
                <GithubIcon className={styles.githubIcon}/>
              </a>
              <a 
                className={styles.externalLink} 
                href="https://www.themoviedb.org/documentation/api"
              >
                <div className={styles.apiIcon}>API</div>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;