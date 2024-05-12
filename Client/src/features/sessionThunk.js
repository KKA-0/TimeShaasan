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
export const sessionThunk = createAsyncThunk(
    'sessionData',
    async (sessionData, thunkAPI) => {
        const id = thunkAPI.getState().user.id;
        try{
            const SessionDB =axios.get(`${process.env.REACT_APP_DOMAIN}/api/focus/${id}`,
            generateHeaders() )
            return SessionDB;
        } catch(err) {
            console.error(err);
            throw err;
        }
})