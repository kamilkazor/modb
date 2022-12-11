import React from 'react';
import styles from './ErrorPage.module.scss';

interface ErrorPageProps {
  message: string
}

const ErrorPage: React.FC<ErrorPageProps> = ({message}) => {
  return (
    <div className={styles.ErrorPage}>
      <h2 className={styles.title}>Something went wrong...</h2>
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default ErrorPage;