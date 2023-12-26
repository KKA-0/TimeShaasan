import React from 'react'
import dashboard from '../../../Dashboard.module.css'
import FocusSession from './components/FocusSession'
import RequireAuth from '../../../../RequireAuth/RequireAuth'
import components from './components/components.module.css'
import KarbanBoard from './components/KarbanBoard'

const Overview = () => {
  return (
   <div className={dashboard.mainBody}>
        <KarbanBoard />
        <FocusSession/>
        <div className={dashboard.checklistDiv}>
          <div className={components.checklistTitle}>
            CheckList
          </div>
          <div className={components.checkList_listDiv}>
              <div className={components.checklist}>
                <input type='checkbox'/><span> Checked List </span> 
              </div>
          </div>
        </div>
   </div>
  )
}

export default RequireAuth(Overview)