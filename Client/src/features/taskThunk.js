import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie';

const generateHeaders = () => {
  const token = Cookies.get('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const taskData = createAsyncThunk(
  'taskData',
  async (taskData, thunkAPI) => {
    const id = thunkAPI.getState().user.id;
    try {
        const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/todo/${id}`,
        generateHeaders() );
        return response.data.todos;
      } catch (error) {
        console.error(error);
        throw error;
      }
  })