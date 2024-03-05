import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Pages from './../Pages.module.css'

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

const Cards = ({ task, index }) => {
    return (
        <Draggable draggableId={`${task.task_id}`} key={task.task_id} index={index}>
            {(provided, snapshot) => (
                <Container
                    className={Pages.todo_Div_card}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <div>
                        <div>{task.title}</div>
                    </div>
                </Container>
            )}
        </Draggable>
    );
}

export default Cards;
