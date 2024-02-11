import React from 'react'
import FocusSession from './../FocusSession'
import RequireAuth from '../../../../RequireAuth/RequireAuth'
import KarbanBoard from './components/KarbanBoard.overview'
import CheckList from './components/CheckList.overview'

const Overview = () => {
  return (
    <>
      <KarbanBoard />
      <CheckList/>
      <FocusSession/>
    </>
  )
}

export default RequireAuth(Overview)