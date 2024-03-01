import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Pages from './Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import Colmn from './cards/kanbanboard.colmn';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, moveTask } from "../../../../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const KarbanBoard = () => {
    const dispatch = useDispatch()
    const Todo = useSelector((state) => state.tasks.todo)
    const inProg = useSelector((state) => state.tasks.inProgress)
    const Done = useSelector((state) => state.tasks.done)

    const handleDragEnd = (result) => {
        dispatch(moveTask(result))
    };
    
    const handleAddTask = (title) => {
        const newTask = {
          id: uuidv4(),
          title: title,
          completed: false
        };
        dispatch(addTodo(newTask))
      };
    return (
        <div className={Pages.mainBody}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className={Pages.kanbanBoarddiv}>
                    <Colmn title={"TO DO"} tasks={Todo} id={"todo"} onAddTask={handleAddTask}/>
                    <Colmn title={"IN PROGRESS"} tasks={inProg} id={"inProgress"} />
                    <Colmn title={"DONE"} tasks={Done} id={"done"} />
                </div>
            </DragDropContext>
        </div>
    );
}

export default RequireAuth(KarbanBoard);
