import React, { useState } from 'react';
import styles from './Banner.module.scss';


interface Props {
  backdropSrc?: string|null;
  children?: React.ReactNode;
}

const Banner: React.FC<Props> = ({backdropSrc, children}) => {
  const [backdropLoaded, setBackdropLoaded] = useState(false);


  return (
    <section className={styles.Banner}>
      <div className={styles.backdropWrapper}>
        <img 
          className={styles.backdrop}
          src={backdropSrc
            ? backdropSrc
            : require("../../assets/altBackdrop.jpg")} 
          alt="backdrop"
          style={{
            opacity: backdropLoaded ? 1 : 0
          }}
          onLoad={() => {setBackdropLoaded(true)}} 
        />
        <div className={styles.backdropCover}></div>
      </div>
      <div className={styles.contentWrapper}>
        {children}
        {/* <div className={styles.textWrapper}>
        </div> */}
      </div>
    </section>
  )
}

export default Banner;