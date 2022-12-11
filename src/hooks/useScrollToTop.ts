import React, { useEffect } from "react";
import { useLocation } from "react-router";

function useScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}

export default useScrollToTop;