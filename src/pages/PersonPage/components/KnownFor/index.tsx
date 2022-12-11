import React from 'react';
import styles from './KnownFor.module.scss';

import Slider from '../../../../sharedComponents/Slider';
import SliderCard from '../../../../sharedComponents/SliderCard';
import returnImagePath from '../../../../utils/returnImagePath';
import SubsectionTitle from '../../../../sharedComponents/SubsectionTitle';


interface Props {
  known_for_department: string;
  credits: {
    cast: {
      id: number;
      poster_path: string|null;
      vote_count: number;
      vote_average: number;
      media_type: "movie"|"tv";

      name: string;
      episode_count: number;
      first_air_date: string;

      title :string;
      release_date: string;

      character: string;
    }[];
    crew: {
      id: number;
      poster_path: string|null;
      vote_count: number;
      vote_average: number;
      media_type: "movie"|"tv";

      name: string;
      episode_count: number;
      first_air_date: string;

      title :string;
      release_date: string;

      department: string;
      job: string;
    }[];
  }
}

const KnownFor: React.FC<Props> = ({known_for_department, credits}) => {

  type PreparedCredits = {
    title: string,
    release_date: string,
    poster_path: string|null,
    linkTo: string,
    key: string,
    vote_average: number
  }[]

  function prepareCredits() {
    let chosenDepartment;
    let preparedCredits: PreparedCredits = [];
    let keys: string[] = [];
    if(known_for_department === "Acting") {
      chosenDepartment = credits.cast.filter((credit) => {
        const key = `${credit.media_type}_${credit.id}`;
        if(!keys.includes(key)) {
          keys.push(key);
          return true;
        }
        return false;
      })
    }
    if(known_for_department !== "Acting") {
      chosenDepartment = credits.crew.filter((credit) => {
        if(credit.department === known_for_department) {
          const key = `${credit.media_type}_${credit.id}`;
          if(!keys.includes(key)) {
            keys.push(key);
            return true;
          }
        }
        return false;
      })
    }
    if(chosenDepartment) {
      chosenDepartment.sort((a, b) => {
        if(a.vote_count && b.vote_count) return b.vote_count - a.vote_count;
        if(!b.vote_count && a.vote_count) return -1;
        if(b.vote_count && !a.vote_count) return 1;
        return 0;
      })
      chosenDepartment.slice(0,10).forEach((credit) => {
        if(credit.media_type === "movie") {
          preparedCredits.push({
            title: credit.title,
            release_date: credit.release_date,
            poster_path: credit.poster_path,
            linkTo: `/movie/${credit.id}`,
            key: `movie_credit${credit.id}`,
            vote_average: credit.vote_average
          })
        }
        if(credit.media_type === "tv") {
          preparedCredits.push({
            title: credit.name,
            release_date: credit.first_air_date,
            poster_path: credit.poster_path,
            linkTo: `/show/${credit.id}`,
            key: `movie_credit${credit.id}`,
            vote_average: credit.vote_average
          })
        }
      })
    }
    return preparedCredits;
  }
  const preparedCredits = prepareCredits()

  return (
    <section className={styles.KnownFor}>
        <div className={styles.titleWrapper}>
          <SubsectionTitle>Might be known for:</SubsectionTitle>
        </div>
      {preparedCredits.length > 0 && 
        <Slider>
          {preparedCredits.map((credit) => {
            return(
              <SliderCard
                key={credit.key}
                title={credit.title}
                image={returnImagePath(credit.poster_path, "w342")}
                score={credit.vote_average}
                date={credit.release_date}
                linkTo={credit.linkTo}
              />
            )
          })}
        </Slider>
      }
      {preparedCredits.length === 0 &&
        <p className={styles.noData}>Nothing here</p>
      }
    </section>
  )
}

export default KnownFor;