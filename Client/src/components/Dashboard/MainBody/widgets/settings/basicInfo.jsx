import React from 'react'
import widget from './../widget.module.scss'

const BasicInfo = () => {
  return (
    <div className={widget.container_basicinfo}>
        <span className={widget.div_basicinfo}>Basic Info</span>
        <div className={widget.line}></div>
    </div>
  )
}

export default BasicInfo