import React from 'react'
import Pages from './../Pages.module.css'
import { useDrag } from 'react-dnd'

const Cards = ({item}) => {
 
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TODO",
        item: { id: item.id, note: item.note, status: item.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })) 

  return (
        <div ref={drag} className={Pages.todo_Div_card} style={(isDragging) ? {opacity: ".25"} : {opacity: "1"} }>
            <span >{item.note}</span>
        </div>
  )
}

export default Cards