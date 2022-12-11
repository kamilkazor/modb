import React, { useEffect } from 'react';

function useOutClick(components: React.RefObject<HTMLElement>[], callback: Function) {
  
  useEffect(() => {
    function checkTarget(e: MouseEvent) {
      let componentClicked = false;
      components.forEach((component) => {
        if(e.target instanceof Element 
        && (e.target === component.current || component.current?.contains(e.target))) {
          componentClicked = true;
        }
      })
      if(!componentClicked){
        callback();
      }
    }
    window.addEventListener("click", checkTarget);
    return () => {
      window.removeEventListener("click", checkTarget);
    }
  },[])
}

export default useOutClick;