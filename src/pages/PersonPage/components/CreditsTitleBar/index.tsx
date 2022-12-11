import React from 'react';
import styles from './CreditsTitleBar.module.scss';


interface Props {
  title: string;
  credits_count: number;
}

const CreditsTitleBar: React.FC<Props> = ({ title, credits_count }) => {

  return (
    <h3 className={styles.CreditsTitleBar}>{title}: <span className={styles.count}>{credits_count > 1 ? `(${credits_count} credits)` : "(1 credit)"}</span></h3>
  )
}

export default CreditsTitleBar;