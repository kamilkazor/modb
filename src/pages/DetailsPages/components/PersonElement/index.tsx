import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PersonElement.module.scss';

import LazyImage from '../../../../sharedComponents/LazyImage';
import returnImagePath from '../../../../utils/returnImagePath';


interface Props {
  name: string;
  profile_path: string|null;
  details: string;
  linkTo: string;
}

const PersonElement: React.FC<Props> = ({ name, profile_path, details, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div className={styles.PersonElement}>
        <div className={styles.profileImage}>
          <LazyImage src={returnImagePath(profile_path, "w185")}/>
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.details}>{details}</p>
        </div>
      </div>
    </Link>
  )
}

export default PersonElement;