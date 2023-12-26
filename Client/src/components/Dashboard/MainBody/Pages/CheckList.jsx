import React, { useEffect } from 'react'
import dashboard from './../../Dashboard.module.css'
import pages from './../Pages/Pages.module.css'
import components from './../Pages/overview/components/components.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import { useSelector, useDispatch } from 'react-redux'
import { checklistData } from './../../../../features/userThunk'
import { removeChecklist } from '../../../../features/userSlice'

const CheckList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(removeChecklist())
    dispatch(checklistData())
  }, [])
  
  const checklist = useSelector((state) => state.user.checklist);
  useEffect(() => {
    console.log(checklist);
  }, [])

  // const checklists = checklist[0]
  // console.log(checklists)
  return (
    <div className={dashboard.mainBody}>
      <div className={pages.checklistDiv}>
      <div className={components.checklistTitle}>
            CheckList
          </div>
          <div className={components.checkList_listDiv}>
            {
              checklist.map((item) =>
                  <div className={components.checklist}> <input type='checkbox'/><span> {item.title} </span> </div>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default RequireAuth(CheckList)