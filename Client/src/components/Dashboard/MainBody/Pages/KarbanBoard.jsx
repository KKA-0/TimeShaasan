import React from 'react'
import Pages from './Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import AddWidget from '../widgets/addWidget'

const KarbanBoard = () => {

  return (
      <div className={Pages.mainBody}>
        <div className={Pages.kanbanBoarddiv}>
          <div className={Pages.todo_Div}>
            <div className={Pages.todo_Div_title}>
              <span>ToDo</span>
            </div>
            <div className={Pages.Div_cards}>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <AddWidget/>
            </div>
          </div>
          <div className={Pages.doin_Div}>
            <div className={Pages.doin_Div_title}>
              <span>In-Progress</span>
            </div>
            <div className={Pages.Div_cards}>
            <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
              <div className={Pages.todo_Div_card}>
              </div>
            </div>
          </div>
          <div className={Pages.done_Div}>
            <div className={Pages.done_Div_title}>
              <span>Done</span>
            </div>
            <div className={Pages.Div_cards}>
              <div className={Pages.todo_Div_card}>

              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default RequireAuth(KarbanBoard)