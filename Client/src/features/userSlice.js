import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
        
            const user = {
                id: action.payload.id,
                email: action.payload.email,
                username: action.payload.username
            };
            state.userData.push(user);
        },
        removeUser: (state, action) => {
            state.userData = state.userData.filter((user) => 
            user.id !== action.payload)
        }
    }
}) 

export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer