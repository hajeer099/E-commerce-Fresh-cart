import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

export default function Layout() {
  let [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }




  
  return (
    <div className={`${theme} dark:bg-slate-700 `} >
      <div className={theme} >
        <Navbar changeTheme={changeTheme} theme={theme} />
      </div>
      <div className={`overflow-hidden  dark:bg-slate-700   ${theme}`}>
         
        <Outlet  />
      </div>
      <Footer />
    </div>
  )
}
