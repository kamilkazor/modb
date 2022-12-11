import React, { useState, useRef, useEffect } from 'react';
import styles from './LazyImage.module.scss';
import FilmRoll from '../FilmRoll';

interface LazyImageInterface {
  src: string|null;
  alt?: string;
}

const LazyImage: React.FC<LazyImageInterface> = ({src, alt=""}) => {
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    if(!src) {
      setLoading(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) {
        imageRef.current?.setAttribute("src", imageRef.current.dataset.src!);
        observer.unobserve(entry.target);
      }
    })
    observer.observe(imageRef.current as Element);
  
  },[src])
  

  return (
    <div className={styles.LazyImage}>
      {loading && <FilmRoll/>}
      {!loading && !src && <FilmRoll spin={false}/>}
      {src &&
        <img
          ref={imageRef} 
          className={styles.image}
          style={{opacity: loading ? "0" : "1"}} 
          onLoad={() => {setLoading(false)}}
          data-src={src} 
          src="" 
          alt={alt} 
        />
      }
    </div>
  )
}

export default LazyImage;