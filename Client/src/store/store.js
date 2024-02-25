import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./../features/userSlice"
import tasksReducer from "../features/tasksSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: tasksReducer
    }
})