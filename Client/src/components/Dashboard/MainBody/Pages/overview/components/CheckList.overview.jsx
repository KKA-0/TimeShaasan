import React, { useEffect } from 'react'
import dashboard  from './../../../../Dashboard.module.css'
import components from './components.module.css'
import useCheckList from '../../../../../../hooks/useCheckList.redux' 
import ChecklistCard from './../../cards/checklist.card'
const CheckList = () => {

    const getCheckList = useCheckList() // Hooks for getting the Checklist data from DB if available in Redux

    useEffect(() => {
    }, [getCheckList])

  return (
    <div className={dashboard.checklistDiv}>
        <div className={components.checklistTitle}>
        CheckList
        </div>
        <div className={`${components.checkList_listDiv} ${components.scrollContainer}`}>
        {
          getCheckList.slice().reverse().map((item) =>
            <ChecklistCard 
              title={item.title}
              status={item.status}
              task_id={item.task_id}
            />
          )
        }
        </div>
    </div>
  )
}

export default CheckList