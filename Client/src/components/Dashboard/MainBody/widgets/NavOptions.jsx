import React from 'react'
import widget from './widget.module.scss'

const NavOptions = () => {
  const removeCookies = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.reload(false);
  }

  return (
    <div className={widget.NavOptions_div}>
      <div className={widget.loggout} onClick={removeCookies}>
        <span>LoggOut</span>
      </div>
    </div>
  )
}

export default NavOptions