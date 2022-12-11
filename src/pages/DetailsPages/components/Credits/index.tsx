import React from 'react';
import styles from './Credits.module.scss';

import PersonElement from '../PersonElement';
import Accordion from '../../../../sharedComponents/Accordion';


interface Props {
  cast: {
    id: number;
    name: string;
    profile_path: string|null;
    character: string
  }[];
  crew: {
    id: number;
    name: string;
    profile_path: string|null;
    department: string;
    job: string;
  }[];
}

const Credits: React.FC<Props> = ({ cast, crew }) => {
  return (
    <section className={styles.Credits}>
      <Accordion 
        initialLengthLimit={10} 
        title={<h3>Cast:</h3>} 
        bottomButtonText={`show full cast: ${cast.length} people`}
      >
        {cast.map((person) => {
          return (
            <PersonElement 
            key={person.id}
            name={person.name}
            details={`character: ${person.character}`}
            profile_path={person.profile_path}
            linkTo={`/person/${person.id}`}
            />
          )
        })}
      </Accordion>
      <Accordion 
        initialLengthLimit={10} 
        title={<h3>Crew:</h3>}
        bottomButtonText={`show full crew: ${crew.length} people`}
      >
        {crew.map((person) => {
          return (
            <PersonElement 
              key={person.id}
              name={person.name}
              details={`${person.department} / ${person.job}`}
              profile_path={person.profile_path}
              linkTo={`/person/${person.id}`}
            />
          )
        })}
      </Accordion>
    </section>
  )
}

export default Credits;