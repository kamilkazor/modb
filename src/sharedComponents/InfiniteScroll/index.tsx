import React, { useRef, useEffect, useState, Children } from 'react';
import styles from './InfiniteScroll.module.scss';

interface Props {
  children: JSX.Element[] | JSX.Element | undefined;
  onIntersection: Function;
  bottomMessage?: string;
}

const InfiniteScroll: React.FC<Props> = ({ children, onIntersection, bottomMessage="" }) => {
  const elementsRef = useRef<HTMLLIElement[]>([]);
  const [childrenArray, setChildrenArray] = useState(Children.toArray(children));
  useEffect(() => {
    elementsRef.current = []
    setChildrenArray(Children.toArray(children))
  },[children])

  const observer = new IntersectionObserver(([entry]) => {
    if(entry.isIntersecting){
      observer.unobserve(entry.target);
      onIntersection();
    }
  })

  useEffect(() => {
    if(elementsRef.current.length > 0) {
      const lastElement = elementsRef.current[elementsRef.current.length - 1];
      if(!lastElement) return;
      observer.observe(lastElement);
    }
    return () => {
      observer.disconnect();
    }
  },[childrenArray])



  return (
    <div className={styles.InfiniteScroll}>
      {childrenArray.length > 0 &&
        <ul className={styles.list}>
          {childrenArray.map((child, i) => (
            <li
            key={i}
            ref={(el) => {elementsRef.current[i] = el as HTMLLIElement}}
            >
              {child}
            </li>
          ))}
        </ul>
      }
      <div className={styles.info}><p>{bottomMessage}</p></div>
    </div>
  )
}

export default InfiniteScroll;