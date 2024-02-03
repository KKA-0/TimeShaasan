import React, { useState, useRef } from 'react'
import Pages from './../Pages.module.css'
import Cards from './kanbanboard.card'
import AddWidget from './../../widgets/addWidget'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const Colmn = ({ Colmn, Tasks }) => {
    console.log(Tasks)
    const ref = useRef(null);
    // const [AddTODO, setAddTODO] = useState("")
    // const [TODOs, setTODOs] = useState([
    //     {
    //       id: 1,
    //       title: "Title 1"
    //     },
    //     {
    //       id: 2,
    //       title: "Title 2"
    //     },
    //     {
    //       id: 3,
    //       title: "Title 3"
    //     }
    //   ])
      
    const addTODOfn = () => {
        // if(AddTODO){ // If New TODO AVAILABLE in TODO State
        //   setTODOs(TODOs => [{id: Math.random(0, 1000), title: AddTODO}, ...TODOs]) // Add Note to TODO Array
        //   ref.current.value = ''; // Empty the Input Feild
        //   setAddTODO("") // Emptying The TODO State
        // }
      }
  return (
    <div className={Pages.todo_Div}>
        <div className={Pages.todo_Div_title}>
            <span>{Colmn}</span>
        </div>
        <div className={Pages.Div_cards}>
        { (Colmn === "TODO") ? 
            <div className={Pages.todo_Div_card}>
                <input type='text' ref={ref} className={Pages.inputAddFeild} placeholder='your task here...'/>
            </div> : "" 
        }
            <SortableContext items={Tasks} strategy={verticalListSortingStrategy}>
                {
                    Tasks.map(TODO => 
                        <Cards key={TODO.id} id={TODO.id} title={TODO.title}/>
                    )
                }
            </SortableContext>
            { 
                (Colmn === "TODO") ? 
                <div onClick={addTODOfn} className={Pages.add_Btn_div}>
                    <AddWidget/>
                </div> : "" 
            }
            
        </div>
    </div>
  )
}

export default Colmn