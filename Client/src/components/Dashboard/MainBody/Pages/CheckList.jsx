// CheckList.js
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import pages from './../Pages/Pages.module.css'
import components from './../Pages/overview/components/components.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import AddWidget from '../widgets/addWidget'
import useCheckList from '../../../../hooks/useCheckList.redux'
import { addchecklist } from '../../../../features/userSlice'
import ChecklistCard from './cards/checklist.card'


const CheckList = () => {
  const dispatch = useDispatch()
  const newCheckList = useRef(null) // Ref for Getting the Value of New Checklist Task

  const getCheckList = useCheckList() // Hooks for getting the Checklist data from DB if available in Redux
  
  const handleAddCheckList = () => { // Fn for Adding New Checklist Card to Checklist
    const input = newCheckList.current.value
    if (input && input.length < 40) {
      dispatch(addchecklist({title: input, status: 0}))
      newCheckList.current.value = ""
    }
  } 

  return (
    <div className={pages.checklistDiv}>
      <div className={components.checklistTitle}>
        CheckList
      </div>
      <input ref={newCheckList} className={pages.inputAddFeild} style={{margin: "5px 0", width: "40%", minWidth: "200px"}} placeholder='Add Item Here...'/>
      <div className={components.checkList_listDiv}>
        {
          getCheckList.slice().reverse().map((item) =>
            <ChecklistCard 
              title={item.title}
              status={item.status}
              task_id={item.task_id}
            />
          )
        }
      <div onClick={handleAddCheckList}>
          <AddWidget/>
        </div>
      </div>
    </div>
  )
}

export default RequireAuth(CheckList);
