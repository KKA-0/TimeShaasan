import React, { useState } from 'react'
import widget from './widget.module.scss'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { removeTodo } from "./../../../../features/taskSlice"

const TaskOption = ({task_id, colm, ToggleEditData}) => {
    const [ToggleEdit, setToggleEdit] = useState(false)
    const user_id = useSelector((state) => state.user.id)
    const dispatch = useDispatch()

    const handleEdit = () => {
        const newToggleEdit = !ToggleEdit;
        setToggleEdit(newToggleEdit);
        ToggleEditData(newToggleEdit); // Pass the updated state to the parent component
    }

  return (
    <div className={widget.options_div}>
        <div className={widget.delete_Div} onClick={() => dispatch(removeTodo({user_id, task_id, colm}))}>
            <MdDelete size="1.5em" color='white'/>
        </div>
        <div className={widget.delete_Div}>
            <MdEdit size="1.5em" color='white' onClick={handleEdit}/>
        </div>
    </div>
  )
}

export default TaskOption