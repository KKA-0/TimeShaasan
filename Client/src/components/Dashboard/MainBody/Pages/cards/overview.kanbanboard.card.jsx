import React, { useState } from 'react'
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import components from './../overview/components/components.module.css'
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

const Cards = ({ task, index }) => {
  const [Title, setTitle] = useState(task.title)

  return (
    <Draggable draggableId={`${task.task_id}`} key={task.task_id} index={index}>
            {(provided, snapshot) => (
                <Container
                className={components.todo_Div_card}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <div className={components.card_title_div}>
                      <span>{ Title }</span>
                    </div>
                </Container>
      )}
    </Draggable>
  )
}

export default Cards