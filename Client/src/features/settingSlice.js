import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bg: "default",
    font: "",
    accent: ""
}

export const settingsReducer = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        editSettings: (state, action) => {
           state.bg =  action.payload.Background
        },
    },  
}) 

export const { editSettings } = settingsReducer.actions

export default settingsReducer.reducer