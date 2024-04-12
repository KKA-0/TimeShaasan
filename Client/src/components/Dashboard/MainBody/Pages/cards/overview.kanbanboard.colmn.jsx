import React from 'react'
import components from './../overview/components/components.module.css'
import Cards from './overview.kanbanboard.card'
import { Droppable } from "react-beautiful-dnd";
const Colmn = ({ title, tasks, colmn }) => {

  function todoDiv(){
    if(colmn === "todo"){
        return components.todo_Div
    }else if(colmn === "inProgress"){
        return components.doin_Div
    }else if(colmn === "done"){
        return components.done_Div
    }
  }
  function todo_Div_title(){
    if(colmn === "todo"){
        return components.todo_Div_title
    }else if(colmn === "inProgress"){
        return components.doin_Div_title
    }else if(colmn === "done"){
        return components.done_Div_title
    }
  }


  return (
    <div className={todoDiv()}>
          <div className={todo_Div_title()}>
            <span>{title}</span>
          </div>
          <Droppable droppableId={colmn}>
            {(provided, snapshot) => (
                <div  className={`${components.Div_cards} ${components.scrollContainer}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                >
                    {tasks.map((task, index) => (
                            <Cards key={task.task_id} colm={colmn} task={task} index={index} />
                        ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
  )
}

export default Colmn