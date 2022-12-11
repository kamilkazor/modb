import React from 'react';
import styles from './Footer.module.scss';

import {ReactComponent as Logo} from "../../assets/Logo.svg";
import {ReactComponent as GithubLogo} from "../../assets/github-icon.svg";


const dummyMode = "Caution! Right now you are in a dummy mode. That means the APP"
+ " is using fixed sample data instead of that provided by TMDB."
+ " Some features like filters need access to the API to work properly.";

const apiMode = "Right now you are in a API mode. That means presented data"
 + " comes from TMDB API server.";

const Footer: React.FC = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.contentWrapper}>
        <div className={styles.contribution}>

        </div>
        <Logo className={styles.logo}/>
        <h3 className={styles.about}>
          MODB is a React project build around the API provided by The Movie 
          Database. 
          To learn more about the project 
          click <a className={styles.link} href="https://github.com/kamilkazor/modb">here</a>.
          If you want to know more about the API, please 
          visit <a className={styles.link} href="https://www.themoviedb.org/documentation/api">TMDB</a>.
        </h3>
        <p className={styles.createdBy}>
          <a href="https://github.com/kamilkazor" className={styles.githubLink}>
            Site created by Kamil Kazor<GithubLogo className={styles.githubLogo}/>
          </a>
        </p>
        <p className={styles.mode}>
          {process.env.REACT_APP_KEY ? apiMode : dummyMode}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
