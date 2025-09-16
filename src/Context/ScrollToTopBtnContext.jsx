import { createContext } from "react";

export let scrollToTopBtn =createContext(null)
import React from 'react'

export default function ScrollToTopBtnContextProvider({children}) {
      const scrollToTop = () => {
     window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  };
 return (
  <scrollToTopBtn.Provider value={scrollToTop}>
    {children}

  </scrollToTopBtn.Provider>
    
  );
}


