import React from 'react';
import styles from './SubsectionTitle.module.scss';


interface Props {
  children: string;
}

const SubsectionTitle: React.FC<Props> = ({children}) => {
  return (
    <h2 className={styles.SubsectionTitle}>{children}</h2>
  )
}

export default SubsectionTitle;