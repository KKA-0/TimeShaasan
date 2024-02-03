import React, { useState } from 'react'
import Pages from './Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import Colmn from './cards/kanbanboard.colmn'
import {DndContext, closestCenter} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable'

const KarbanBoard = () => {

  const [TODOs, setTODOs] = useState([
    {
      id: 1,
      title: "Title 1"
    },
    {
      id: 2,
      title: "Title 2"
    },
    {
      id: 3,
      title: "Title 3"
    }
  ])

  const getTODOPos = id => TODOs.findIndex(TODOs => TODOs.id === id)
  

  const handleDragEnd = event => {
    console.log("drag over")
    const {  active, over } = event
    console.log("drag active", active.id, over.id)
    if(active.id === over.id) return;
    setTODOs(TODOs => {
      const OrgPos = getTODOPos(active.id)
      const newPos = getTODOPos(over.id)

      return arrayMove( TODOs, OrgPos, newPos )
    })
  }
  

  return (
      <div className={Pages.mainBody}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className={Pages.kanbanBoarddiv}>
          <Colmn Colmn="TODO" Tasks={TODOs}/>
          <Colmn Colmn="IN-PROGRESS" Tasks={TODOs}/>
          <Colmn Colmn="DONE" Tasks={TODOs}/>
        </div>
        </DndContext>
      </div>
  )
  
}

export default RequireAuth(KarbanBoard)