import React from 'react'
import dashboard  from './../../../../Dashboard.module.css'
import components from './components.module.css'
import useCheckList from '../../../../../../hooks/useCheckList.redux' 

const CheckList = () => {

    const CheckListData = useCheckList()
    
  return (
    <div className={dashboard.checklistDiv}>
        <div className={components.checklistTitle}>
        CheckList
        </div>
        <div className={components.checkList_listDiv}>
        {
            CheckListData.map((item) =>
                <div className={components.checklist}> <input type='checkbox'/><span> {item.title} </span> </div>
            )
        }
        </div>
    </div>
  )
}

export default CheckList