import React from 'react'
import widget from './widget.module.scss'
import { IoIosLogOut } from "react-icons/io";
import { PiEyeSlashDuotone } from "react-icons/pi";

const NavOptions = () => {
  const removeCookies = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.reload(false);
  }

  return (
    <div className={widget.NavOptions_div}>
      <div className={widget.loggout} onClick={removeCookies}>
        <PiEyeSlashDuotone  size={"1.5em"}/>  <span>Focus</span>
      </div>
      <div className={widget.loggout} onClick={removeCookies}>
        <IoIosLogOut size={"1.5em"}/>  <span> Sign out</span>
      </div>
    </div>
  )
}

export default NavOptions