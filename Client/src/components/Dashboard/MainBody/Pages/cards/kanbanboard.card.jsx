import React, { useState, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Pages from './../Pages.module.css'
import { SlOptions } from "react-icons/sl";
import TaskOption from "../../widgets/taskOption.widget";
import { FaCheck } from "react-icons/fa";
import { editTodo } from "./../../../../../features/taskSlice"
import { useDispatch, useSelector } from "react-redux"

const Container = styled.div`
    background-color: ${(props) => bgcolorChange(props)};
`;

const bgcolorChange = (props) => {
    return props.isDragging
        ? "rgb(34, 34, 34)"
        : props.isDraggable
            ? props.isBacklog
                ? "#F2D7D5"
                : "#DCDCDC"
            : props.isBacklog
                ? "#F2D7D5"
                : "";
}


const Cards = ({ task, index, colm }) => {
    const user_id = useSelector((state) => state.user.id)
    const [ToggleTask, setToggleTask] = useState(false)
    const [ToggleEdit, setToggleEdit] = useState(false)
    const [Title, setTitle] = useState(task.title)
    const title = useRef("")
    const dispatch = useDispatch()
    const handleToggleEditData = (data) => {
        setToggleEdit(data)
        setToggleTask(!ToggleTask)
    }

    const taskEdit = () => {
        dispatch(editTodo({colm, title: title.current.value, task_id: task.task_id, user_id}))
        setToggleEdit(!ToggleEdit)
    }

    return (
        <>
        <Draggable draggableId={`${task.task_id}`} key={task.task_id} index={index}>
            {(provided, snapshot) => (
                <Container
                    className={Pages.todo_Div_card}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {
                        (ToggleEdit)
                        ? <><input ref={title} className={Pages.task_edit} value={Title} onChange={() => setTitle(title.current.value)}/> <FaCheck className={Pages.task_edit_done} onClick={taskEdit}/></>
                        : <div className={Pages.task_Title}> <div>{Title}</div> </div>
                    }
                    <div className={Pages.task_Option}>
                        <SlOptions  onClick={() => setToggleTask(!ToggleTask)}/>
                    </div>
                    {
                        (ToggleTask) 
                        ? <TaskOption task_id={task.task_id} ToggleEditData={handleToggleEditData} colm={colm} style={(ToggleTask) ? { display: "none" } : { display: "initial" }}/>
                        : null
                    }
                </Container>
            )}
        </Draggable>
        </>
    );
}

export default Cards;
