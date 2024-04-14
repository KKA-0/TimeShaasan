import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./../features/userSlice"
import tasksReducer from "./../features/taskSlice"
import settingsReducer from "./../features/settingSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: tasksReducer,
        settings: settingsReducer
    }
})