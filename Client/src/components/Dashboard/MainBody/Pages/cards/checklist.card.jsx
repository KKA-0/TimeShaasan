import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import components from './../overview/components/components.module.css'
import { updateChecklistStatus, removeChecklist, updateChecklistTitle } from '../../../../../features/userSlice';

const ChecklistCard = ({title, status, task_id}) => {
    const dispatch = useDispatch()
    const [Edit, setEdit] = useState(false) // State to store Edit status
    const [EditTitle, setEditTitle] = useState(title); // State to store Task Title 
    const newStatus = useRef(null) // Ref For Checking the Status of CheckBox
    
    const handleChangeStatus = () => {  // Fn For handling Status Change Events
        const task_id = newStatus.current.getAttribute('task_id');
        dispatch(updateChecklistStatus({ task_id }))
    }
    const handleDeleteTask = () => {  // Fn For handling Status Change Events
        const task_id = newStatus.current.getAttribute('task_id');
        dispatch(removeChecklist({ task_id }))
    }
    const handleEditTask = () => {  // Fn For handling Edit Events
        if(title !== EditTitle) { // Check if Title is Modified or not
            dispatch(updateChecklistTitle({ task_id, newTitle: EditTitle })) // if Title is Modified then update redux status
        }
        setEdit(false) // set state to false to exit from edit mode
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleEditTask()
        }
      }
    
    useEffect(() => {
        if (status !== null && status !== undefined) {
            newStatus.current.checked = status;
        }
    }, [status]);

    
  return (
    <div className={components.checklist}>
        <div className={components.checkList_list_content}>
            <input ref={newStatus} task_id={task_id} onClick={handleChangeStatus} type='checkbox'/>
            {
                (Edit) 
                ? <input type='text' value={EditTitle} maxLength={40} onKeyDown={handleKeyDown} className={components.EditTitle} onChange={(e) => setEditTitle(e.target.value)}/>
                : <span style={(status) ? {textDecoration: "line-through", margin: "0px 10px"} : {textDecoration: "none", margin: "0px 10px"}}>{title}</span>
            }
        </div>
        <div className={components.optionsChecklist}>
            {
                (Edit) 
                ? <FaCheck size="1.5em" onClick={handleEditTask} className={components.MdEdit}/>
                : <MdEdit size="1.5em" onClick={() => {setEdit(true); setEditTitle(title)}} className={components.MdDelete}/>
            }
            <MdDelete size="1.5em" onClick={handleDeleteTask} className={components.MdDelete} style={{margin: "2px 20px"}}/>
        </div>
    </div>
  )
}

export default ChecklistCard