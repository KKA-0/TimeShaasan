import React ,{useState}from "react";
import Cards from "./kanbanboard.card";
import { Droppable } from "react-beautiful-dnd";
import Pages from './../Pages.module.css'
import AddWidget from './../../widgets/addWidget'


const Colmn = ({ title, tasks, colmn , onAddTask}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    function todoDiv(){
        if(colmn === "todo"){
            return Pages.todo_Div
        }else if(colmn === "inProgress"){
            return Pages.doin_Div
        }else if(colmn === "done"){
            return Pages.done_Div
        }
      }
      function todo_Div_title(){
        if(colmn === "todo"){
            return Pages.todo_Div_title
        }else if(colmn === "inProgress"){
            return Pages.doin_Div_title
        }else if(colmn === "done"){
            return Pages.done_Div_title
        }
      }

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      onAddTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleAddTask()
    }
  }
    return (
        <div className={todoDiv()}>
            <div className={todo_Div_title()}>
                <h3>{title}</h3>
            </div>
            <div className={Pages.Div_cards}>
                {colmn === "todo" && 
                    <div className={Pages.todo_input}>
                        <input type='text' className={Pages.inputAddFeild} onKeyDown={handleKeyDown} maxLength={40} placeholder='your task here...' value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}/>
                    </div>
                }
                <Droppable droppableId={colmn}>
                    {(provided, snapshot) => (
                        <div className={Pages.TaskList}
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
                {
                    (colmn === "todo") ?
                    <div className={Pages.add_Btn_div} onClick={handleAddTask}>
                        <AddWidget />
                    </div>  : ""
                }
            </div>
        </div>
    );
}

export default Colmn;
