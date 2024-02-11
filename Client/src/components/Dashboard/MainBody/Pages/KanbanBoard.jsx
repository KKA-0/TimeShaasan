import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Pages from './Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import Colmn from './cards/kanbanboard.colmn';

const KarbanBoard = () => {
    const [todo, setTodo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(() => {
        const initialTasks = [
            { id: "task01", title: "aaa", completed: false },
            { id: "task02", title: "bbbb", completed: false },
            { id: "task03", title: "cccc", completed: false }
        ];

        setTodo(initialTasks);
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        const task = findItemById(draggableId, [...todo, ...inProgress, ...done]);

        deletePreviousState(source.droppableId, draggableId);

        setNewState(destination.droppableId, task, destination.index);
    };

    const deletePreviousState = (sourceDroppableId, taskId) => {
        switch (sourceDroppableId) {
            case "todo":
                setTodo(removeItemById(taskId, todo));
                break;
            case "inProgress":
                setInProgress(removeItemById(taskId, inProgress));
                break;
            case "done":
                setDone(removeItemById(taskId, done));
                break;
            default:
                break;
        }
    }

    const setNewState = (destinationDroppableId, task, destinationIndex) => {
        switch (destinationDroppableId) {
            case "todo":
                setTodo((prevTasks) => {
                    const newTasks = [...prevTasks];
                    newTasks.splice(destinationIndex, 0, task);
                    return newTasks;
                });
                break;
            case "inProgress":
                setInProgress((prevTasks) => {
                    const newTasks = [...prevTasks];
                    newTasks.splice(destinationIndex, 0, task);
                    return newTasks;
                });
                break;
            case "done":
                setDone((prevTasks) => {
                    const newTasks = [...prevTasks];
                    newTasks.splice(destinationIndex, 0, task);
                    return newTasks;
                });
                break;
            default:
                break;
        }
    }

    const findItemById = (id, array) => {
        return array.find((item) => item.id === id);
    }

    const removeItemById = (id, array) => {
        return array.filter((item) => item.id !== id);
    }
    const handleAddTask = (title) => {
        const newTask = {
          id: `task${todo.length + 1}`,
          title: title,
          completed: false
        };
        setTodo((prevTasks) => [...prevTasks, newTask]);
      };
    return (
        <div className={Pages.mainBody}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>
                <div className={Pages.kanbanBoarddiv}>
                    <Colmn title={"TO DO"} tasks={todo} id={"todo"}   onAddTask={handleAddTask}/>
                    <Colmn title={"IN PROGRESS"} tasks={inProgress} id={"inProgress"} />
                    <Colmn title={"DONE"} tasks={done} id={"done"} />
                </div>
            </DragDropContext>
        </div>
    );
}

export default RequireAuth(KarbanBoard);
