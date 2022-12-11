import React, {useState, useEffect, useRef, createContext, useContext, ReactElement} from 'react';
import { useLocation } from "react-router";

interface Props {
  children: ReactElement
}

const ScrollContext = createContext<boolean|undefined>(undefined);
const SetScrollContext = createContext<React.Dispatch<React.SetStateAction<boolean>>
  |((setScroll: boolean)=> void)>((psetScroll: boolean)=>{});

export function useScrollContext() {
  return useContext(ScrollContext);
}
export function useSetScrollContext() {
  return useContext(SetScrollContext);
}

const DissableScrollProvider: React.FC<Props> = ({children}) => {
  const scrollY = useRef(window.scrollY);
  const location = useLocation();
  const [scroll, setScroll] = useState(true);

  useEffect(() => {
    scrollY.current = 0;
    window.scrollTo(0, 0);
    setScroll(true);
  }, [location]);
  useEffect(() => {
    if(!scroll) {
      scrollY.current = window.scrollY;
      window.onscroll = function() {window.scrollTo(0, scrollY.current)};
    }
    if(scroll) {
      window.onscroll = function() {};
    }
    return () => {
      window.onscroll = function() {};
    }
  },[scroll])


  return (
    <ScrollContext.Provider value={scroll}>
      <SetScrollContext.Provider value={setScroll}>
        {children}
      </SetScrollContext.Provider>
    </ScrollContext.Provider>
  )
}

export default DissableScrollProvider;