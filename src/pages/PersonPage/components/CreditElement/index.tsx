import React from 'react';
import styles from './CreditElement.module.scss';

import { Link } from 'react-router-dom';

interface Props {
  title: string;
  moreInfo: string;
  year: number|null;
  linkTo: string;
}

const CreditElement: React.FC<Props> = ({ title, moreInfo, year, linkTo }) => {
  return (
    <div className={styles.CreditElement}>
      <div className={styles.year}>
        <p>{year}</p>
      </div>
      <p className={styles.title}><Link to={linkTo}>{title}</Link> <span className={styles.moreInfo}>{moreInfo}</span></p>

    </div>
  )
}

export default CreditElement;