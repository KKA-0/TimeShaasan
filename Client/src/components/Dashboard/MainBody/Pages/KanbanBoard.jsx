import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Pages from './Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import Colmn from './cards/kanbanboard.colmn';
import { useDispatch , useSelector } from "react-redux";
import { addTask , moveTask} from "../../../../features/tasksSlice";

const KarbanBoard = () => {
    const dispatch = useDispatch();
    // const [todo, setTodo] = useState([]);
    // const [inProgress, setInProgress] = useState([]);
    // const [done, setDone] = useState([]);
   const todo = useSelector(state => state.tasks.todo);
   const inProgress = useSelector(state => state.tasks.inProgress);
   const done = useSelector(state => state.tasks.done);

     const tasks = useSelector(state => state.tasks);


    const handleDragEnd = (result) => {
        // const { destination, source, draggableId } = result;

        // if (!destination || source.droppableId === destination.droppableId) return;

        // const task = findItemById(draggableId, [...todo, ...inProgress, ...done]);

        // deletePreviousState(source.droppableId, draggableId);

        // setNewState(destination.droppableId, task, destination.index);
        // console.log("handle drag end",todo ,inProgress,done );

        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        const task = findItemById(draggableId, tasks[source.droppableId]);

        dispatch(moveTask({
            sourceColumnId: source.droppableId,
            destinationColumnId: destination.droppableId,
            taskId: draggableId,
            destinationIndex: destination.index
        }));
    };

    // const deletePreviousState = (sourceDroppableId, taskId) => {
    //     switch (sourceDroppableId) {
    //         case "todo":
    //             setTodo(removeItemById(taskId, todo));
    //             break;
    //         case "inProgress":
    //             setInProgress(removeItemById(taskId, inProgress));
    //             break;
    //         case "done":
    //             setDone(removeItemById(taskId, done));
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // const setNewState = (destinationDroppableId, task, destinationIndex) => {
    //     switch (destinationDroppableId) {
    //         case "todo":
    //             setTodo((prevTasks) => {
    //                 const newTasks = [...prevTasks];
    //                 newTasks.splice(destinationIndex, 0, task);
    //                 return newTasks;
    //             });
    //             break;
    //         case "inProgress":
    //             setInProgress((prevTasks) => {
    //                 const newTasks = [...prevTasks];
    //                 newTasks.splice(destinationIndex, 0, task);
    //                 return newTasks;
    //             });
    //             break;
    //         case "done":
    //             setDone((prevTasks) => {
    //                 const newTasks = [...prevTasks];
    //                 newTasks.splice(destinationIndex, 0, task);
    //                 return newTasks;
    //             });
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const findItemById = (id, array) => {
        return array.find((item) => item.id === id);
    }

    const removeItemById = (id, array) => {
        return array.filter((item) => item.id !== id);
    }
    const handleAddTask = (title,columnId) => {
        const newTask = {
          id: `task${todo.length + 1}`,
          title: title,
          completed: false
        };
        // setTodo((prevTasks) => [...prevTasks, newTask]);
        dispatch(addTask({ columnId, task: newTask }));
      };
    return (
        <div className={Pages.mainBody}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>
                <div className={Pages.kanbanBoarddiv}>
                    <Colmn title={"TO DO"} tasks={todo} id={"todo"}  onAddTask={(title) => handleAddTask(title, "todo")}/>
                    <Colmn title={"IN PROGRESS"} tasks={inProgress} id={"inProgress"} />
                    <Colmn title={"DONE"} tasks={done} id={"done"} />
                </div>
            </DragDropContext>
        </div>
    );
}

export default RequireAuth(KarbanBoard);
