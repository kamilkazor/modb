import React from 'react';
import styles from './NameBanner.module.scss';

import LazyImage from '../../../../sharedComponents/LazyImage';
import returnImagePath from '../../../../utils/returnImagePath';
import Banner from '../../../../sharedComponents/Banner';
import backdrop from '../../../../assets/stars.jpg';



interface Props {
  name: string;
  profile_path: string|null;
  also_known_as: string[];
  known_for_department: string;
  birthday: string|null;
  deathday: null|string;
  place_of_birth: string|null;
}

const NameBanner: React.FC<Props> = ({
  name,
  profile_path,
  also_known_as,
  known_for_department,
  birthday,
  deathday,
  place_of_birth, 
}) => {

  const dateFromatter = new Intl.DateTimeFormat("en", {
    dateStyle: "long"
  })

  function returnBornString() {
    if(birthday && place_of_birth) return `${dateFromatter.format(new Date(birthday))} in ${place_of_birth}`;
    if(birthday && !place_of_birth) return `${dateFromatter.format(new Date(birthday))}`;
    if(!birthday) return 'no data'
  }

  return (
    <Banner backdropSrc={backdrop}>
      <div className={styles.NameBanner}>
        <div className={styles.contentWrapper}>
          <div className={styles.profileWrapper}>
            <LazyImage src={returnImagePath(profile_path, "h632")}/>
          </div>
          <div className={styles.textWrapper}>
            <h1 className={styles.name}>{name.toLocaleUpperCase()}</h1>
            <p className={styles.alsoKnown}>{also_known_as.join(" / ")}</p>
            {known_for_department &&
              <p className={styles.info}><span className={styles.label}>known for: </span><span className={styles.value}>{known_for_department}</span></p>
            }
            <p className={styles.info}><span className={styles.label}>born: </span><span className={styles.value}>{returnBornString()}</span></p>
            {deathday &&
              <p className={styles.info}><span className={styles.label}>died: </span><span className={styles.value}>{dateFromatter.format(new Date(deathday))}</span></p>
            }
          </div>
        </div>
      </div>
    </Banner>
  )
}

export default NameBanner;