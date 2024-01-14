import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const sessionThunk = createAsyncThunk(
    'sessionData',
    async (sessionData, thunkAPI) => {
        const id = thunkAPI.getState().user.id;
        try{
            const SessionDB =axios.get(`http://localhost:4000/api/focus/${id}`)
            return SessionDB;
        } catch(err) {
            console.error(err);
            throw err;
        }
})