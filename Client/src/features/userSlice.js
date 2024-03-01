import { createSlice } from '@reduxjs/toolkit'
import { userData, checklistData } from './userThunk'

const initialState = {
    username: "",
    id: "",
    email: "",
    checklist: [],
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.username = action.payload.username
            state.id = action.payload.id
            state.email = action.payload.email
        },
        removeChecklist: (state) => {
            state.checklist = []
        },
        removeUser: (state, action) => {
            state.userData = state.userData.filter((user) => 
            user.id !== action.payload)
        },
        addTodo: (state, action) => {
            state.todo.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userData.fulfilled, (state, action) => {
                state.username = action.payload.username
                state.id = action.payload.id
                state.email = action.payload.email
            })
            .addCase(checklistData.fulfilled, (state, action) => {
                state.checklist = action.payload;
              });
    }
}) 

export const { addUser, removeUser, removeChecklist, addTodo } = userSlice.actions

export default userSlice.reducer