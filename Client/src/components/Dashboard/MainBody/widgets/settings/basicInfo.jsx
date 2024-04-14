import React from 'react'
import widget from './../widget.module.scss'
import { useSelector } from 'react-redux'
const BasicInfo = () => {
  const details_title = {
    fontFamily: 'Silkscreen, sans-serif'
  } 
  const details = {
    color: "rgb(157, 157, 157)",
    height: "1px",
    marginBottom: "20px"
  } 
  const user = useSelector((state) => state.user)

  return (
    <div className={widget.container_basicinfo}>
        <span className={widget.title_}>Basic Info</span>
        <div className={widget.line}></div>

        <span className={widget.title_} style={details_title}>Account Number</span>
        <span className={widget.title_} style={details}>{user.id}</span>
        <span className={widget.title_} style={details_title}>Username</span>
        <span className={widget.title_} style={details}>{user.username}</span>
        <span className={widget.title_} style={details_title}>Email</span>
        <span className={widget.title_} style={details}>{user.email}</span>
        <span className={widget.title_} style={details_title}>Login Method</span>
        <span className={widget.title_} style={details}>Google</span>
    </div>
  )
}

export default BasicInfo