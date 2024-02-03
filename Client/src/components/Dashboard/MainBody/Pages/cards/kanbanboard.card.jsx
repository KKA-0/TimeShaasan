import React from 'react'
import Pages from './../Pages.module.css'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities"

const Cards = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
} = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  
  return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={Pages.todo_Div_card}>
            <span>{title}</span>
        </div>
  )
}

export default Cards