import React, { useState, useRef } from 'react'
import Pages from './Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import AddWidget from '../widgets/addWidget'
import Cards from './cards/karbanboard.card'
import {DndContext, closestCenter} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const KarbanBoard = () => {

  const ref = useRef(null);
  const [AddTODO, setAddTODO] = useState("")
  const [TODOs, setTODOs] = useState(["hello", "world", "hello world"])
  // const [DOING, setDOING] = useState([{id: "gewgw54gw4gwergwe4e4" ,note: "hello1", status: 1}])
  // const [DONE, setDONE] = useState([{id: "asdfasdgasdghq34h" ,note: "hello2", status: 2}])

  const addTODOfn = () => {

    if(AddTODO){ // If New TODO AVAILABLE in TODO State
      setTODOs(TODOs => [AddTODO, ...TODOs]) // Add Note to TODO Array
      // console.log(TODO) 
      ref.current.value = ''; // Empty the Input Feild
      setAddTODO("") // Emptying The TODO State
    }
  }

  function handleDragEnd(event) {
    console.log("drag over")
  }
  

  return (
      <div className={Pages.mainBody}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className={Pages.kanbanBoarddiv}>
          <div className={Pages.todo_Div}>
            <div className={Pages.todo_Div_title}>
              <span>ToDo</span>
            </div>
            <div className={Pages.Div_cards}>
              <div className={Pages.todo_Div_card}>
                <input type='text' ref={ref} className={Pages.inputAddFeild} placeholder='your task here...' onChange={(e) => setAddTODO(e.target.value)}/>
              </div>
                <SortableContext items={TODOs} strategy={verticalListSortingStrategy}>
                {
                  TODOs.map(TODO => 
                    <Cards key={TODO} id={TODO}/>
                  )
                }
                </SortableContext>
              <div onClick={addTODOfn} className={Pages.add_Btn_div}>
                <AddWidget/>
              </div>
            </div>
          </div>
          <div className={Pages.doin_Div}>
            <div className={Pages.doin_Div_title}>
              <span>In-Progress</span>
            </div>
            <div className={Pages.Div_cards}>
            {/* {
                DOING.map((item) => 
                  <Cards item={item}/>
                )
              } */}
            </div>
          </div>
          <div className={Pages.done_Div}>
            <div className={Pages.done_Div_title}>
              <span>Done</span>
            </div>
            <div className={Pages.Div_cards}>
            {/* {
                DONE.map((item) => 
                  <Cards item={item}/>
                )
              } */}
            </div>
          </div>
        </div>
        </DndContext>
      </div>
  )
  
}

export default RequireAuth(KarbanBoard)