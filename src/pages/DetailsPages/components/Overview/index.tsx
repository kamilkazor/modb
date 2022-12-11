import React from 'react';
import styles from './Overwiev.module.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

import LazyImage from '../../../../sharedComponents/LazyImage';
import returnImagePath from '../../../../utils/returnImagePath';
import SubsectionTitle from '../../../../sharedComponents/SubsectionTitle';


interface Props {
  overview: string|null;
  status: string;
  release_date: string;
  original_title: string;
  poster_path: string|null;
  production_companies: {
    name: string;
  }[];
  production_countries: {
    name: string;
  }[];
  genres: {
    name: string;
  }[];
  original_language: string;
}

const Overview: React.FC<Props> = ({
  overview, 
  status, 
  release_date, 
  genres, 
  original_title, 
  production_companies, 
  production_countries, 
  poster_path,
  original_language
}) => {

  function joinElements(arr: Object[], key: string) {
    const newArray = arr.map((el) => {
      return el[key as keyof typeof el];
    })
    return newArray.join(", ");
  }

  const languages = useSelector((state: RootState) => (state.configuration.languages));
  function findLanguage(iso_639_1: string) {
    const language = languages.find((el) => el.iso_639_1 === iso_639_1);
    if(language) return language.english_name;
    return iso_639_1;
  }

  const dateFromatter = new Intl.DateTimeFormat("en", {
    dateStyle: "long"
  })

  return (
    <section className={styles.Overview}>
      <div className={styles.textWrapper}>
        <SubsectionTitle>Overview:</SubsectionTitle>
        <p className={styles.overviewText}>{overview ? overview : "There is no overview"}</p>
        <SubsectionTitle>Details:</SubsectionTitle>
        <p><span className={styles.label}>Status: </span>{status}</p>
        <p><span className={styles.label}>Release date: </span>{release_date 
          ? dateFromatter.format(new Date(release_date)) 
          : <span className={styles.noData}>no data</span>}
        </p>
        <p><span className={styles.label}>Genres: </span>{genres && genres.length > 0
          ? joinElements(genres, "name") 
          : <span className={styles.noData}>no data</span>}
        </p>
        <p><span className={styles.label}>Original title: </span>{original_title 
          ? original_title 
          : <span className={styles.noData}>no data</span>}
        </p>
        <p><span className={styles.label}>Original language: </span>{
        original_language 
          ? findLanguage(original_language) 
          : <span className={styles.noData}>no data</span>}
        </p>
        <p><span className={styles.label}>Production: </span>{production_companies && production_companies.length > 0
          ? joinElements(production_companies, "name")
          : <span className={styles.noData}>no data</span>}
        </p>
        <p><span className={styles.label}>Production countries: </span>{production_countries && production_countries.length > 0
          ? joinElements(production_countries, "name") 
          : <span className={styles.noData}>no data</span>}
        </p>
      </div>
      <div className={styles.posterWrapper}>
        <LazyImage 
          src={returnImagePath(poster_path, "w500")} 
          alt="poster"
        />
      </div>
    </section>
  )
}

export default Overview;