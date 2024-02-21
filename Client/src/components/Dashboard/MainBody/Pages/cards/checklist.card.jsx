import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import components from './../overview/components/components.module.css'
import { updatechecklist, removeChecklist } from '../../../../../features/userSlice';

const ChecklistCard = ({title, status, task_id}) => {
    const dispatch = useDispatch()
    const [Checked, setChecked] = useState(status) // State to store checkbox status
    const newStatus = useRef(null) // Fn For Checking the Status of CheckBox
    
    const handleChangeStatus = () => {  // Fn For handling Status Change Events
        const status = newStatus.current.checked;
        const task_id = newStatus.current.getAttribute('task_id');
        dispatch(updatechecklist({ task_id }))
        setChecked(status)
    }
    const handleDeleteTask = () => {  // Fn For handling Status Change Events
        const task_id = newStatus.current.getAttribute('task_id');
        dispatch(removeChecklist({ task_id }))
        // console.log('delete', task_id)
    }
    useEffect(() => {
        if (status !== null && status !== undefined) {
            newStatus.current.checked = status;
        }
    }, [status]);

    
  return (
    <div className={components.checklist}>
        <div className={components.checkList_list_content}>
            <input ref={newStatus} task_id={task_id} onChange={handleChangeStatus} type='checkbox'/>
            <span style={(Checked) ? {textDecoration: "line-through", margin: "0px 10px"} : {textDecoration: "none", margin: "0px 10px"}}>{title}</span>
        </div>
        <div>
            <MdEdit size="1.5em" className={components.MdDelete}/>
            <MdDelete size="1.5em" onClick={handleDeleteTask} className={components.MdDelete} style={{margin: "2px 20px"}}/>
        </div>
    </div>
  )
}

export default ChecklistCard