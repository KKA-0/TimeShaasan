import components from './components.module.css'
import dashboard from './../../../../Dashboard.module.css'

const KarbanBoard = () => {
  return (
      <div className={dashboard.kanbanBoarddiv}>
        <div className={components.todo_Div}>
          <div className={components.todo_Div_title}>
            <span>ToDo</span>
          </div>
          <div className={components.Div_cards}>
            <div draggable="true" className={components.todo_Div_card}>
                <div className={components.card_title_div}>
                    <span>asdf</span>
                </div>
                <div className={components.card_DateTime_div}>
                </div>
            </div>
          </div>
        </div>
        <div className={components.doin_Div}>
          <div className={components.doin_Div_title}>
            <span>In-Progress</span>
          </div>
          <div className={components.Div_cards}>
            <div className={components.todo_Div_card}>

            </div>
          </div>
        </div>
        <div className={components.done_Div}>
          <div className={components.done_Div_title}>
            <span>Done</span>
          </div>
          <div className={components.Div_cards}>
            <div className={components.todo_Div_card}>

            </div>
          </div>
        </div>
      </div>
  )
}

export default KarbanBoard