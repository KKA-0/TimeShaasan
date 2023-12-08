import React from 'react'
import navbar from './navbar.module.css'
import logo from './../images/logoFull.png'

const Navbar = () => {
  return (
    <div className={navbar.nav}>
        <div className={navbar.logoDiv}>
            <img className={navbar.logo} src={logo} alt='logo'/>
        </div>
    </div>
  )
}

export default Navbar
