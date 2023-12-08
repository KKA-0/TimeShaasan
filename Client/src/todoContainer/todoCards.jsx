import React,{useState} from 'react';
import axios from 'axios'



const TodoCards = (props) => {
  const [handleSubmit, sethandleSubmit] = useState(Math.random)
  const handleDrag = () => {
    // console.log("Dragging...")
  }
  const handleDragEnd = (e) => {
    console.log("DragEnd...",props.Status)
    if(props.Status === "1"){
      console.warn(props.title._id)
      axios
        .patch(`http://localhost:6969/api/TodoDoing/${props.title._id}`,{})
        .then((res) => {
          console.log(props.title._id)
          sethandleSubmit(Math.random)
          props.onSubmit(handleSubmit)
        } ) 
    }
    else if(props.Status === "0"){
      console.warn(props.title._id)
      axios
        .patch(`http://localhost:6969/api/Todo/${props.title._id}`,{})
        .then((res) => {
          console.log(props.title._id)
          sethandleSubmit(Math.random)
          props.onSubmit(handleSubmit)
        } ) 
    }
    else if(props.Status === "2"){
      console.warn(props.title._id)
      axios
        .patch(`http://localhost:6969/api/TodoDone/${props.title._id}`,{})
        .then((res) => {
          console.log(props.title._id)
          sethandleSubmit(Math.random)
          props.onSubmit(handleSubmit)
        } ) 
    }
  }

  const deleteTask = () => {
    axios
        .delete(`http://localhost:6969/api/${props.title._id}`,{})
        .then((res) => {
          console.log(props.title._id)
          sethandleSubmit(Math.random)
          props.onSubmit(handleSubmit)
        } ) 
  }

  const editTask = () => {
    
  }

  return (
    <div draggable="true" data={props.title._id} onDrag={handleDrag}  onDragEnd={handleDragEnd} className="cardDiv">
      <img width="25" height="25"className='dragIcon' src="https://img.icons8.com/external-outline-berkahicon/64/external-drag-mix-ui-design-outline-berkahicon.png" alt="external-drag-mix-ui-design-outline-berkahicon"/>
      <h5>{props.title.taskname}</h5>
      <img width="25" height="25" onClick={editTask} style={{right: "25px"}} className='editIcon' src="https://img.icons8.com/ios-glyphs/30/edit--v1.png" alt="edit--v1"/>
      <img width="25" height="25" onClick={deleteTask} className='editIcon' src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash"/>
    </div>
  );
};

export default TodoCards;
