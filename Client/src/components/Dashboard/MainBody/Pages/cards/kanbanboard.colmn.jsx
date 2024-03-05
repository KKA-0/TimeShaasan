import React ,{useState}from "react";
import Cards from "./kanbanboard.card";
import { Droppable } from "react-beautiful-dnd";
import Pages from './../Pages.module.css'
import AddWidget from './../../widgets/addWidget'


const Colmn = ({ title, tasks, colmn , onAddTask}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");

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
        <div className={Pages.todo_Div}>
            <div className={Pages.todo_Div_title}>
                <h3>{title}</h3>
            </div>
            <div className={Pages.Div_cards}>
                {colmn === "todo" && 
                    <div className={Pages.todo_Div_card}>
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
                                <Cards key={task.task_id} task={task} index={index} />
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
