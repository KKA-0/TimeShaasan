import React, { useState } from 'react'
import navbar from './navbar.module.css'
import logo from './../images/logoFull.png'
import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";
import NavOptions from './../Dashboard/MainBody/widgets/NavOptions'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const Navbar = () => {
  const username = useSelector((state) => state.user.username)
  
  const [ToggleNav, setToggleNav] = useState(1)
  const toggle = () => {
    if(ToggleNav === 0) setToggleNav(1)
    else setToggleNav(0)
  }
  
  return (
    <div className={navbar.nav}>
      { (ToggleNav === 1) ? "" : <NavOptions /> }
        <div className={navbar.logoDiv}>
            <Link to={"/"}><img className={navbar.logo} src={logo} alt='logo'/></Link>
        </div>
        {username && username !== "" && (
        <div className={navbar.user} onClick={toggle}>
          <h2>{username}</h2>
          {
            (ToggleNav === 0) ? <IoIosArrowUp color="white" size="1.5em" style={{marginTop: "25px"}}/> : <IoIosArrowDown color="white" size="1.5em" style={{marginTop: "25px"}}/>
          }   
        </div>
      )}</div>
  )
}

export default Navbar
