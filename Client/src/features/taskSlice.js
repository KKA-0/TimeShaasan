import { createSlice } from '@reduxjs/toolkit'

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
            state.todo.push(action.payload);
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
        },
        
    }
}) 

export const { addTodo, moveTask } = taskSlice.actions

export default taskSlice.reducer