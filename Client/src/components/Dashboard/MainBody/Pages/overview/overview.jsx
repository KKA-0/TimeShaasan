import React from 'react'
import dashboard from '../../../Dashboard.module.css'
import FocusSession from './components/FocusSession.overview'
import RequireAuth from '../../../../RequireAuth/RequireAuth'
import KarbanBoard from './components/KarbanBoard.overview'
import CheckList from './components/CheckList.overview'

const Overview = () => {
  return (
   <div className={dashboard.mainBody}>
        <KarbanBoard />
        <FocusSession/>
        <CheckList/>
   </div>
  )
}

export default RequireAuth(Overview)