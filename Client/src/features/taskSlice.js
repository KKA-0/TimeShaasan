import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { taskData } from './taskThunk'

const initialState = {
    todo: [],
    inProgress: [],
    done: []
}

const moveTo = (state, sourceId, destinationId, id, tasks, index) => {
    tasks.map((item) => {
        if(item.id === id){
            state[sourceId] = state[sourceId].filter(item => item.id !== id);
            state[destinationId].splice(index, 0, item);
        }
        return item;
    });
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const { user_id, id, title } = action.payload
            state.todo.push({id, title});
            const tasks = state.todo;
            tasks.map((item, index) => {
                if(item.id === id){
                    axios.patch(`${process.env.REACT_APP_DOMAIN}/api/todo/${user_id}`, {
                        index: index,
                        task_id: id,
                        title
                    })
                    .then(function (response) {
                        console.log(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                return item;
            })
        },
        moveTask: (state, action) => {
            const { source, destination, draggableId } = action.payload;
            if(destination === null || source === null) return;
            if(destination.droppableId === "inProgress" && source.droppableId === "todo"){
                const tasks = state.todo;           
                moveTo(state, "todo", "inProgress", draggableId, tasks, destination.index);
            }
            else if(destination.droppableId === "done" && source.droppableId === "todo"){
                // console.log("move from todo to in done")
                const tasks = state.todo;  
                moveTo(state, "todo", "done", draggableId, tasks, destination.index);
            }
            else if(destination.droppableId === "done" && source.droppableId === "inProgress"){
                // console.log("move from inProgress to done")
                const tasks = state.inProgress;  
                moveTo(state, "inProgress", "done", draggableId, tasks, destination.index);
            }
            else if(destination.droppableId === "inProgress" && source.droppableId === "done"){
                // console.log("move from done to inProgress")
                const tasks = state.done;  
                moveTo(state, "done", "inProgress", draggableId, tasks, destination.index);
            }
            else if(destination.droppableId === "todo" && source.droppableId === "done"){
                // console.log("move from done to todo")
                const tasks = state.done;  
                moveTo(state, "done", "todo", draggableId, tasks, destination.index);
            }
            else if(destination.droppableId === "todo" && source.droppableId === "inProgress"){
                // console.log("move from inProgress to todo")
                const tasks = state.inProgress;  
                moveTo(state, "inProgress", "todo", draggableId, tasks, destination.index);
            }
            else if(destination.droppableId === source.droppableId){
                const tasks = state[source.droppableId];
                moveTo(state, source.droppableId, destination.droppableId, draggableId, tasks, destination.index);
            }
        }
    },
        extraReducers: (builder) => {
            builder
                .addCase(taskData.fulfilled, (state, action) => {
                    state.todo = action.payload.todo
                    state.inProgress = action.payload.doing
                    state.done = action.payload.done
                })
        }
        
}) 

export const { addTodo, moveTask } = taskSlice.actions

export default taskSlice.reducer