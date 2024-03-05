import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
import { taskData } from './taskThunk'

const initialState = {
    todo: [],
    inProgress: [],
    done: []
}

const moveTo = (state, source, destination, task_id, tasks, index, user_id) => {
    // console.log(source, destination, task_id, index, user_id)
    tasks.map((item) => {
        if(item.task_id === task_id){
            state[source] = state[source].filter(item => item.task_id !== task_id);
            state[destination].splice(index, 0, item);
            axios.patch(`${process.env.REACT_APP_DOMAIN}/api/todo/move/${user_id}`,
            {
                sourceId: task_id,
                source,
                destination
            })
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        return item;
    });
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const { user_id, task_id, title } = action.payload
            state.todo.push({task_id, title});
            const tasks = state.todo;
            tasks.map((item, index) => {
                if(item.task_id === task_id){
                    axios.patch(`${process.env.REACT_APP_DOMAIN}/api/todo/${user_id}`, {
                        index: index,
                        task_id: task_id,
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
            const { source, destination, task_id, index, user_id } = action.payload;
            if(destination === null || source === null) return;
            if(destination === "inProgress" && source === "todo"){
                const tasks = current(state.todo);           
                moveTo(state, "todo", "inProgress", task_id, tasks, index, user_id);
            }
            else if(destination === "done" && source === "todo"){
                // console.log("move from todo to in done")
                const tasks = state.todo;  
                moveTo(state, "todo", "done", task_id, tasks, index, user_id);
            }
            else if(destination === "done" && source === "inProgress"){
                // console.log("move from inProgress to done")
                const tasks = state.inProgress;  
                moveTo(state, "inProgress", "done", task_id, tasks, index, user_id);
            }
            else if(destination === "inProgress" && source === "done"){
                // console.log("move from done to inProgress")
                const tasks = state.done;  
                moveTo(state, "done", "inProgress", task_id, tasks, index, user_id);
            }
            else if(destination === "todo" && source === "done"){
                // console.log("move from done to todo")
                const tasks = state.done;  
                moveTo(state, "done", "todo", task_id, tasks, index, user_id);
            }
            else if(destination === "todo" && source === "inProgress"){
                // console.log("move from inProgress to todo")
                const tasks = state.inProgress;  
                moveTo(state, "inProgress", "todo", task_id, tasks, index, user_id);
            }
            else if(destination === source){
                const tasks = state[source];
                moveTo(state, source, destination, task_id, tasks, index, user_id);
            }
        }
    },
        extraReducers: (builder) => {
            builder
                .addCase(taskData.fulfilled, (state, action) => {
                    state.todo = action.payload.todo
                    state.inProgress = action.payload.inProgress
                    state.done = action.payload.done
                })
        }
        
}) 

export const { addTodo, moveTask } = taskSlice.actions

export default taskSlice.reducer