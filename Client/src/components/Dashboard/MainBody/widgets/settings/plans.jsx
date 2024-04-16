import React from 'react'
import widget from './../widget.module.scss'
import ComingSoon from './../../../../images/comingSoon.svg'

const Plans = () => {
  return (
    <div className={widget.container_basicinfo}>
        <span className={widget.title_}>Plans & Bills</span>
        <div className={widget.line}></div>
        
        <div className={widget.center_div_flex}>
          <img src={ComingSoon} height={300} />
        </div>
    </div>
  )
}

export default Plans