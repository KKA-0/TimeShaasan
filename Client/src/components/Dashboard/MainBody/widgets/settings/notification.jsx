import React from 'react'
import widget from './../widget.module.scss'

const Notification = () => {
  return (
    <div className={widget.container_basicinfo}>
        <span className={widget.title_}>Notification</span>
        <div className={widget.line}></div>
    </div>
  )
}

export default Notification