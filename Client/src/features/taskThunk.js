import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const taskData = createAsyncThunk(
  'taskData',
  async (taskData, thunkAPI) => {
    const id = thunkAPI.getState().user.id;
    try {
        const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/todo/${id}`);
        return response.data.todos;
      } catch (error) {
        console.error(error);
        throw error;
      }
  })