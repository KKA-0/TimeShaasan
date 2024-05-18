import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    bg: "default",
    font: "",
    accent: ""
}

export const SettingsData = createAsyncThunk(
    'SettingsData',
    async (SettingsData, thunkAPI) => {
      const id = thunkAPI.getState().user.id;
      try {
          const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/settings/${id}`);
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }) 

export const settingsReducer = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        editSettings: (state, action) => {
           state.bg =  action.payload.Background

           axios.post(`${process.env.REACT_APP_DOMAIN}/api/settings/${action.payload.user_id}`,
            {
                Background: action.payload.Background
            }
           )
           .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },  
    extraReducers: (builder) => {
        builder
            .addCase(SettingsData.fulfilled, (state, action) => {
                state.bg = action.payload.Background
            })
    }
}) 

export const { editSettings } = settingsReducer.actions

export default settingsReducer.reducer