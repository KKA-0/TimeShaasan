import React from 'react'
import widget from './widget.module.scss'
import { MdAdd } from "react-icons/md";

const AddWidget = () => {
  return (
    <div className={widget.add_Btn_div}>
        <MdAdd size='2em'/>
    </div>
  )
}

export default AddWidget