import React from 'react'
import Pages from './../Pages.module.css'
import { useSortable } from '@dnd-kit/sortable'
import {CSS, useNodeRef} from "@dnd-kit/utilities"

const Cards = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
} = useSortable({id: props.id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  
  return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={Pages.todo_Div_card}>
            <span>{props.id}</span>
        </div>
  )
}

export default Cards