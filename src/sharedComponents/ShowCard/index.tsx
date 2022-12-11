import React, {useState, useRef, useEffect} from 'react';
import styles from './ShowCard.module.scss';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

import returnImagePath from '../../utils/returnImagePath';
import { Link } from 'react-router-dom';
import FilmRoll from '../../sharedComponents/FilmRoll';

interface Show {
  id: number;
  poster_path: string|null;
  name: string;
  vote_count: number;
  vote_average: number;
  first_air_date: number;
  genre_ids: number[];
}
interface Props {
  show: Show
}

const ShowCard: React.FC<Props> = ({show}) => {

  const genres = useSelector((state: RootState) => (state.configuration.tvGenres));
  function findGenre(id: number) {
    const genre = genres.find((el) => el.id === id);
    if(genre) return genre.name;
  }

  function returnGenres() {
    const genresArray = show.genre_ids.map((id) => (findGenre(id)));
    return genresArray.join(", ");
  }
  const [loading, setLoading] = useState(true);
  const posterRef = useRef<HTMLImageElement>(null);

  const image = returnImagePath(show.poster_path, "w342");

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
    <Link to={`/show/${show.id}`}>
      <div className={styles.ShowCard}>
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
          <h3 className={styles.title}>{show.name}</h3>
          <p className={styles.genres}>{returnGenres()}</p>
        </div>
        <div className={styles.bottomLine}>
          <p className={styles.date}>{show.first_air_date}</p>
          <p className={styles.score}>
            <i className={`material-symbols ${styles.star}`}>star</i>
            <span className={styles.value}>{show.vote_average.toFixed(1)}</span>/10
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ShowCard;