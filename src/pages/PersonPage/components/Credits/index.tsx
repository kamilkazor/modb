import React, {ReactElement, useEffect} from 'react';
import styles from './Credits.module.scss';

import Accordion from '../../../../sharedComponents/Accordion';
import CreditsTitleBar from '../CreditsTitleBar';
import CreditElement from '../CreditElement';

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

const Credits: React.FC<Props> = ({ known_for_department, credits }) => {

  interface FormattedCredit {
    key: string;
    title: string;
    link: string;
    moreInfo: string;
    year: number|null;
  }

  interface CreditsInterface {
    [key: string]: FormattedCredit[];
  }

  function sortCredits() {
    function createActingTvMoreInfo(character: string, episode_count: number) {
      if(character && episode_count > 1) return `as ${character} (${episode_count} episodes)`;
      if(character && episode_count === 1) return `as ${character} (${episode_count} episode)`;
      if(character && !episode_count) return `as ${character}`;
      if(!character && episode_count > 1) return `(${episode_count} episodes)`;
      if(!character && episode_count === 1) return `(${episode_count} episode)`;
      return "";
    }
    const sortedCredits: CreditsInterface = {};
    credits.cast.forEach((credit) => {
      if(!("Acting" in sortedCredits)) {
        sortedCredits["Acting"] = [];
      }
      if(credit.media_type === "movie") {
        sortedCredits["Acting"].push({
          key: `acting_movie_${credit.id}`,
          title: credit.title,
          link: `/movie/${credit.id}`,
          moreInfo: credit.character ? `as ${credit.character}` : "",
          year: credit.release_date ? new Date(credit.release_date).getFullYear() : null
        })
      }
      if(credit.media_type === "tv") {
        sortedCredits["Acting"].push({
          key: `acting_tv_${credit.id}`,
          title: credit.name,
          link: `/show/${credit.id}`,
          moreInfo: createActingTvMoreInfo(credit.character, credit.episode_count),
          year: credit.first_air_date ? new Date(credit.first_air_date).getFullYear() : null
        })
      }
    })
    credits.crew.forEach((credit) => {
      if(!(credit.department in sortedCredits)) {
        sortedCredits[credit.department] = [];
      }
      if(credit.media_type === "movie") {
        sortedCredits[credit.department].push({
          key: `${credit.department}_movie_${credit.id}`,
          title: credit.title,
          link: `/movie/${credit.id}`,
          moreInfo: credit.job ? `- ${credit.job}` : "",
          year: credit.release_date ? new Date(credit.release_date).getFullYear() : null
        })
      }
      if(credit.media_type === "tv") {
        sortedCredits[credit.department].push({
          key: `${credit.department}_movie_${credit.id}`,
          title: credit.name,
          link: `/show/${credit.id}`,
          moreInfo: credit.job ? `- ${credit.job}` : "",
          year: credit.first_air_date ? new Date(credit.first_air_date).getFullYear() : null
        })
      }
    })
    for (let key in sortedCredits) {
      sortedCredits[key].sort((a, b) => {
        if(a.year && b.year) return b.year - a.year;
        if(!a.year && b.year) return -1;
        if(a.year && !b.year) return 1;
        return 0;
      })
    }
    return sortedCredits;
  }

  function createAccordions() {
    const sortedCredits = sortCredits();
    const accordions: ReactElement[] = [];
    const keys = Object.keys(sortedCredits);
    keys.sort((a, b) => {
      if(a === known_for_department) return -1;
      if(b === known_for_department) return 1;
      return sortedCredits[b].length - sortedCredits[a].length;
    })
    keys.forEach((key) => {
      accordions.push(
        <Accordion
          key={key}
          title={<CreditsTitleBar title={key} credits_count={sortedCredits[key].length} />}
        >
          {sortedCredits[key].map((credit) => {
            return (
              <CreditElement
                key={credit.key}
                title={credit.title}
                moreInfo={credit.moreInfo}
                year={credit.year}
                linkTo={credit.link}
              />
            )
          })}
        </Accordion>
      )
    })
    return accordions;
  }


  useEffect(() => {
    sortCredits();
  },[])

  return (
    <section
      className={styles.Credits}
    >
      {createAccordions()}
    </section>
  )
}

export default Credits;