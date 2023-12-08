import React, { useState, useEffect } from 'react';
import './App.css';
import TodoCards from './todoContainer/todoCards';
import CreatetodoCard from './todoContainer/createtodoCard';
import axios from 'axios';
import 'animate.css';
import Navbar from "./navbar/navbar"

function App() {
  const [collection, setCollection] = useState([]);
  const [idget, setidget] = useState("")
  const [CardMovedStatus, setCardMovedStatus] = useState(0)
  const [Loading, setLoading] = useState({display: "initial"})


  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:6969/api/all');
      setCollection(response.data.data.tasks);
      setLoading({display: "none"})
      // console.log("fetchData ", response.data.data.tasks);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [idget]);

  const handleSubmit = (data) => {
    setidget(data)
    console.log(data)
  }


  const displayToDo = collection.map((item, pos) => {
    if(item.taskStatus === "todo"){
      return <TodoCards key={pos} onSubmit={handleSubmit} Status={CardMovedStatus} title={item} />;
    }
    return null;
  })
  const displaydoing = collection.map((item, pos) => {
    if(item.taskStatus === "doing"){
      return <TodoCards key={pos} onSubmit={handleSubmit} Status={CardMovedStatus} title={item} />;
    }
    return null;
  })
  const displaydone = collection.map((item, pos) => {
    if(item.taskStatus === "done"){
      return <TodoCards key={pos} onSubmit={handleSubmit} Status={CardMovedStatus} title={item} />;
    }
    return null;
  });


  const [showCreateCard, setShowCreateCard] = useState(false);

  const createCard = () => {
    if(!showCreateCard){
      return setShowCreateCard(!showCreateCard)
    }else{
      return setShowCreateCard(false)
    }
  }

  const asdf = () => {
    if(showCreateCard){
      return <CreatetodoCard onSubmit={handleSubmit}/>;
    }else{
    }
  }

  useEffect(() => {
    asdf();
  })



  const DragOver = (e) => {
    e.preventDefault();
  };
  const DragEnter = (e) => {
    console.warn("Dragged to Doing");
    if(e.target.className === "cards"){
      e.target.style.border = "3px dotted red";
    }
  }
  const onDragLeave = (e) => {
    if ( e.target.className === "cards" ) {
      e.target.style.border = "";
    }
  }
  const onDragEnd = (e) => {
  }


  const onDropTodo = (e) => {
    console.log("dropped in Doing");
    if (e.target.className === "cards") {
      e.target.style.border = "";
    }
    setCardMovedStatus("0")
  };
  const onDropDoing = (e) => {
    console.log("dropped in Doing");
    if (e.target.className === "cards") {
      e.target.style.border = "";
    }
    setCardMovedStatus("1")
  };
  const onDropDone = (e) => {
    console.log("Dropped in done");
    if (e.target.className === "cards") {
      e.target.style.border = "";
    }
    setCardMovedStatus("2")
  };
  
  //According to Tutorial


  return (
    <>
    <Navbar />
    <div className="App">
      <img className='Loading' style={Loading} src='https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif' alt='loading' />
      <div className="todoContainer">
        <div onDragOver={DragOver} onDrop={onDropTodo} onDragLeave={onDragLeave} onDragEnter={DragEnter} onDragEnd={onDragEnd} className='cards'>
        <div style={{ backgroundColor: "red" }} className="titleContainer">
          <span className="title">To Do</span>
        </div>
            {displayToDo}
        </div>
        <div onDragOver={DragOver} onDrop={onDropDoing} onDragEnter={DragEnter} onDragLeave={onDragLeave} onDragEnd={onDragEnd} className='cards'>
          <div style={{ backgroundColor: "orange" }} className="titleContainer">
              <span className="title">Doing</span>
          </div>
              {displaydoing}
        </div>
        <div onDragOver={DragOver} onDrop={onDropDone}  onDragEnter={DragEnter} onDragLeave={onDragLeave} onDragEnd={onDragEnd} className='cards'>
          <div style={{ backgroundColor: "grey" }} className="titleContainer">
            <span className="title">Done</span>
          </div>
            
              {displaydone}
           
        </div>
      
        <div className='addIcon' onClick={createCard}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" fill="#4caf50">
            <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
            <path fill="#fff" d="M21,14h6v20h-6V14z"/>
            <path fill="#fff" d="M14,21h20v6H14V21z"/>
          </svg>
        </div>
        
      {asdf()}
      {/* <CreatetodoCard /> */}
      </div>
    </div>
    </>
  );
}

export default App;
