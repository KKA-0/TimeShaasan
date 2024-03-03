import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Pages from './Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import Colmn from './cards/kanbanboard.colmn';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, moveTask } from "../../../../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import useTask from "./../../../../hooks/useTask.redux"

const KanbanBoard = () => {
    const dispatch = useDispatch()
    const user_id = useSelector((state) => state.user.id)
    const taskData = useTask()

    const handleDragEnd = (result) => {
        // const data = {
        //     user_id: user_id,
        //     source: result.source.droppableId,
        //     destination: result.destination.droppableId,
        //     index: result.source.index,
        //     task_id: result.draggableId
        // }
        dispatch(moveTask(result))
    };
    
    const handleAddTask = (title) => {
        const newTask = {
          user_id,
          id: uuidv4(),
          title: title,
        };
        dispatch(addTodo(newTask))
      };
    return (
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className={Pages.kanbanBoarddiv}>
                    <Colmn title={"TO DO"} tasks={taskData.todo} id={"todo"} onAddTask={handleAddTask}/>
                    <Colmn title={"IN PROGRESS"} tasks={taskData.inProgress} id={"inProgress"} />
                    <Colmn title={"DONE"} tasks={taskData.done} id={"done"} />
                </div>
            </DragDropContext>
    );
}

export default RequireAuth(KanbanBoard);
