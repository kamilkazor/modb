import React, {useState, useRef, useEffect} from 'react';
import styles from './PersonCard.module.scss';

import returnImagePath from '../../utils/returnImagePath';
import { Link } from 'react-router-dom';
import FilmRoll from '../../sharedComponents/FilmRoll';

interface Person {
  id: number;
  profile_path: string|null;
  name: string;
  known_for_department: string;
}
interface Props {
  person: Person
}

const PersonCard: React.FC<Props> = ({person}) => {

  const [loading, setLoading] = useState(true);
  const posterRef = useRef<HTMLImageElement>(null);

  const image = returnImagePath(person.profile_path, "w342");

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
    <Link to={`/person/${person.id}`}>
      <div className={styles.PersonCard}>
        <div className={styles.imageWrapper}>
          {loading && <FilmRoll/>}
            {!loading && !image && <FilmRoll spin={false}/>}
            {image &&
            <img
              ref={posterRef} 
                className={styles.image}
                style={{opacity: loading ? "0" : "1"}}
                data-src={image}
                alt=""
                onLoad={() => {setLoading(false)}} 
              />
            }
        </div>
        <div className={styles.textWrapper}>
          <h3 className={styles.title}>{person.name}</h3>
          {person.known_for_department && 
            <p className={styles.department}>Departement: {person.known_for_department}</p>
          }
        </div>
      </div>
    </Link>
  )
}

export default PersonCard;