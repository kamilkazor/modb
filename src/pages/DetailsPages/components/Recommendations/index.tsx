import React, { useState } from 'react';
import styles from './Recommendations.module.scss';

import Slider from '../../../../sharedComponents/Slider';
import SliderCard from '../../../../sharedComponents/SliderCard';
import ToggleSelector from '../../../../sharedComponents/ToggleSelector';
import returnImagePath from '../../../../utils/returnImagePath';
import SubsectionTitle from '../../../../sharedComponents/SubsectionTitle';


interface SlideInterface {
  title: string;
  id: number;
  poster_path: string|null;
  vote_average: number;
  release_date: string;
  linkTo: string;
}
interface Props {
  recommended: SlideInterface[];
  similar: SlideInterface[];
}

const Recommendations: React.FC<Props> = ({ recommended, similar }) => {
  const [selected, setSelected] = useState<"RECOMMENDED"|"SIMILAR">("RECOMMENDED");

  function createSlides(data: SlideInterface[]) {
    return (
      data.map((slide) => {
        return (
          <SliderCard 
            key={slide.id} 
            title={slide.title} 
            image={returnImagePath(slide.poster_path, "w342")}
            score={slide.vote_average}
            date={slide.release_date}
            linkTo={slide.linkTo}
          />
        )
      })
    )
  }


  return (
    <section className={styles.Recommendations}>
      <div className={styles.titleWrapper}>
        <SubsectionTitle>You might also like:</SubsectionTitle>
        <ToggleSelector 
          initial={recommended.length > 0 || similar.length === 0 ? 0 : 1} 
          onSelect={(value)=>{setSelected(value)}} 
          options={[
            {label: "recommended", value: "RECOMMENDED"},
            {label: "similar", value: "SIMILAR"}
          ]}
        />
      </div>
        {selected === "RECOMMENDED" && recommended.length > 0 &&
          <Slider>
            {createSlides(recommended)}
          </Slider>
        }
        {selected === "RECOMMENDED" && recommended.length === 0 &&
          <p className={styles.noData}>Nothing here</p>
        }
        {selected === "SIMILAR" && similar.length > 0 &&
          <Slider>
            {createSlides(similar)}
          </Slider>
        }
        {selected === "SIMILAR" && similar.length === 0 &&
          <p className={styles.noData}>Nothing here</p>
        }
    </section>
  )
}

export default Recommendations;