import React from 'react'
import FocusSession from './../FocusSession'
import RequireAuth from '../../../../RequireAuth/RequireAuth'
import KanbanBoard from './components/KanbanBoard.overview'
import CheckList from './components/CheckList.overview'

const Overview = () => {
  return (
    <>
      <KanbanBoard />
      <CheckList/>
      <FocusSession/>
    </>
  )
}

export default RequireAuth(Overview)