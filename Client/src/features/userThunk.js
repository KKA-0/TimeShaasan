import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import{ toast } from 'react-toastify';

export const userData = createAsyncThunk(
    'userData',
    async (userdata, thunkAPI) => {
       const userDB = axios.post(`${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_ADD_USER}`, {
            username:userdata.given_name,
            email:userdata.email
        })
        .then(function(res) {
            const userDB =  {
                id: res.data.user._id,
                username: res.data.user.username,
                email: res.data.user.email
            }
            document.cookie = `token=${res.data.Token}`; 
            return userDB
        })
        .catch(function (err) {
            console.log(err)
            toast.error('Error in adding user');
        })
        return userDB
    }
)

export const checklistData = createAsyncThunk(
  'checklistData',
  async (checklistData, thunkAPI) => {
    const id = thunkAPI.getState().user.id;
    try {
      const response = await axios.get(`${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_GET_Checklist}${id}`);
      return response.data.checklists[0].checklist;
    } catch (error) {
      console.error(error);
      toast.error('Error in fetching checklist data');
      throw error;
    }
  })