import React from 'react'




const EditTodoCard = (props) => {
  return (
    <div className='CreateCardDiv'>
        <span className='titleCard'>Edit Task</span>
        <input className='createTaskinput' required type='text'placeholder='Task Name...'/>
        <button className='createTaskbutton'>Submit Edit</button>
    </div>
  )
}

export default EditTodoCard