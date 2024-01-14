import React from 'react'
import dashboard from './../../Dashboard.module.css'
import pages from './../Pages/Pages.module.css'
import components from './../Pages/overview/components/components.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import AddWidget from '../widgets/addWidget'
import useCheckList from '../../../../hooks/useCheckList.redux'

const CheckList = () => {

  const CheckListData = useCheckList()
  
  return (
    <div className={dashboard.mainBody}>
      <div className={pages.checklistDiv}>
        <div className={components.checklistTitle}>
          CheckList
        </div>
        <div className={components.checkList_listDiv}>
          {
            CheckListData.map((item) =>
                <div className={components.checklist}> <input type='checkbox'/><span> {item.title} </span> </div>
            )
          }
        <AddWidget/>
        </div>
      </div>
    </div>
  )
}

export default RequireAuth(CheckList)