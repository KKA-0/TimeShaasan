import React, { useState, useRef } from 'react'
import Pages from './Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import AddWidget from '../widgets/addWidget'
import Cards from './cards/karbanboard.card'

import { useDrop } from 'react-dnd'

const KarbanBoard = () => {

  const ref = useRef(null);
  const [AddTODO, setAddTODO] = useState("")
  const [TODO, setTODO] = useState([{id: "hw3h4ergaw4gaew4g" ,note: "hello", status: 0}])
  const [DOING, setDOING] = useState([{id: "gewgw54gw4gwergwe4e4" ,note: "hello1", status: 1}])
  const [DONE, setDONE] = useState([{id: "asdfasdgasdghq34h" ,note: "hello2", status: 2}])

  const addTODOfn = () => {
    if(AddTODO){ // If New TODO AVAILABLE in TODO State
      setTODO(TODO => [AddTODO, ...TODO]) // Add Note to TODO Array
      // console.log(TODO) 
      ref.current.value = ''; // Empty the Input Feild
      setAddTODO("") // Emptying The TODO State
    }
  }



  return (
        <div className={Pages.kanbanBoarddiv}>
          <div className={Pages.todo_Div}>
            <div className={Pages.todo_Div_title}>
              <span>ToDo</span>
            </div>
            <div className={Pages.Div_cards}>
              <div className={Pages.todo_Div_card}>
                <input type='text' ref={ref} className={Pages.inputAddFeild} placeholder='your task here...' onChange={(e) => setAddTODO({id: 1, note: e.target.value})}/>
              </div>
              {
                TODO.map((item) => 
                  <Cards item={item}/>
                )
              }
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
            {
                DOING.map((item) => 
                  <Cards item={item}/>
                )
              }
            </div>
          </div>
          <div className={Pages.done_Div}>
            <div className={Pages.done_Div_title}>
              <span>Done</span>
            </div>
            <div className={Pages.Div_cards}>
            {
                DONE.map((item) => 
                  <Cards item={item}/>
                )
              }
            </div>
          </div>
        </div>
  )
}

export default RequireAuth(KarbanBoard)