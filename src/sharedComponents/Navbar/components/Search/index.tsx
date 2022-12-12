import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.module.scss';
import {useNavigate } from "react-router-dom";

import useFetch from '../../../../hooks/useFetch';
import useOutClick from '../../../../hooks/useOutClick';


interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonsRef: React.RefObject<HTMLElement>[];
}

const Search: React.FC<Props> = ({open, setOpen, buttonsRef}) => {

  interface Suggestion {
    media_type: "movie"|"tv"|"person";
    name: string;
    title: string;
    release_date: string;
    first_air_date: string;
    id: number;
  }
  interface Suggestions {
    results: Suggestion[];
  };

  const navigate = useNavigate();

  const searchRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const optionsRef = useRef<HTMLLIElement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);  
  const [searchFor, setSearchFor] = useState("");
  const [callAddress, setCallAddress] = useState("");
  const suggestionsCall = useFetch<Suggestions>(callAddress);

  const targets: React.RefObject<HTMLElement>[] = [searchRef, ...buttonsRef];
  useOutClick(targets, () => {setOpen(false)})

  useEffect(() => {
    if(open && searchRef.current) searchRef.current.focus(); 
  },[searchRef.current])
  
  function createOptions() {
    if(!searchFor) return;
    const options: JSX.Element[] = [];
    options.push(createOption(
      0, 
      `/search/${searchFor}`,
      "Search for: ",
      `"${searchFor}"`
    ));
    if(suggestionsCall.data) {
      const suggestionArray = suggestionsCall.data.results.slice(0,5);
      suggestionArray.forEach((result, i) => {
        if(result.media_type === "movie") {
          options.push(createOption(
            i+1, 
            `/movie/${result.id}`,
            "Movie: ",
            result.title,
            result.release_date,
          ));
        }
        if(result.media_type === "tv") {
          options.push(createOption(
            i+1, 
            `/show/${result.id}`,
            "TV Show: ",
            result.name,
            result.first_air_date,
          ));
        }
        if(result.media_type === "person") {
          options.push(createOption(
            i+1, 
            `/person/${result.id}`,
            "Person: ",
            result.name
          ));
        }
      })
    }
    return options;
  }

  useEffect(() => {
    setSelected(0);
  },[searchFor])

  function createOption(selectIndex: number, linkTo: string, label: string, name: string, date?: string) {
    return(
      <li
        key={selectIndex}
        ref={(el) => {optionsRef.current[selectIndex] = el as HTMLLIElement}}
        onClick={() => {
          navigate(linkTo);
          setSelected(0);
          setOpen(false);
        }} 
        className={`
          ${styles.option}
          ${selected === selectIndex && styles.selected}
        `}
      >
        {label}{name}{date ? ` (${new Date(date).getFullYear()})` : ""}
      </li>
    )
  }

  function keydownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    const next = selected + 1;
    const prev = selected > 0 ? selected - 1 : 0;
    if(e.key === "ArrowDown" && optionsRef.current[next]) {
      e.preventDefault();
      setSelected(next);
    }
    if(e.key === "ArrowUp" && optionsRef.current[prev]) {
      e.preventDefault();
      setSelected(prev);
    }
  }
  useEffect(() => {
    const debounce = setTimeout(() => {
      if(!searchFor) {
        setCallAddress("");
        return;
      }
      setCallAddress(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_KEY}&page=1&query=${searchFor}`
        );
    }, 250)
    return () => {
      clearTimeout(debounce);
    }
  },[searchFor])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!searchFor) return;
    setOpen(false);
    setSelected(0);
    inputRef.current?.blur();
    const selectedOption = optionsRef.current[selected];
    selectedOption && selectedOption.click();
  }

  return (
    <>
    {open &&
    <div className={styles.Search} ref={searchRef}>
      <div className={styles.content}>
        <div className={styles.searchBar}>
          <form onSubmit={onSubmit}>
            <div className={styles.inputWrapper}>
              <input 
                type="text"
                spellCheck="false"
                placeholder='Search:'
                autoFocus
                ref={inputRef} 
                className={styles.input} 
                value={searchFor} 
                onChange={(e)=>{setSearchFor(e.target.value)}} 
                onKeyDown={keydownHandler}
              />
              <button className={styles.clearButton}>
                <i className={`material-symbols ${styles.clear}`} onClick={() => {setSearchFor(""); inputRef.current?.focus()}}>close</i>
              </button>
            </div>
            <button type="submit" style={{display: "none"}}></button>
          </form>
        </div>
        <div className={styles.optionsWrapper}>
          <ul className={styles.options}>
            {createOptions()}
          </ul>
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default Search;