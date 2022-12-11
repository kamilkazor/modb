import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SliderCard.module.scss';

import FilmRoll from '../FilmRoll';


interface SliderCardProps {
  title: string;
  image: string|null;
  score: number;
  date: string;
  linkTo: string; 
}

const SliderCard: React.FC<SliderCardProps> = ({title, image, score, date, linkTo}) => {
  const [loading, setLoading] = useState(true);
  const posterRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if(!image) {
      setLoading(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) {
        posterRef.current?.setAttribute("src", posterRef.current.dataset.src!);
        observer.unobserve(entry.target);
      }
    })
    observer.observe(posterRef.current as Element);
  },[]);

  return (
    <div className={styles.SliderCard}>
      <Link to={linkTo}>
      <div className={styles.contentWrapper}>
          <div className={styles.ribbon}>{score.toFixed(1)}</div>
          <div className={styles.posterWrapper}>
            {loading && <FilmRoll/>}
            {!loading && !image && <FilmRoll spin={false}/>}
            {image &&
              <img
              ref={posterRef} 
                className={styles.poster}
                style={{opacity: loading ? "0" : "1"}}
                data-src={image}
                alt={title} 
                onLoad={() => {setLoading(false)}} 
              />
            }
          </div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.date}>{date}</p>
      </div>
      </Link>
    </div>
  )
}

export default SliderCard;