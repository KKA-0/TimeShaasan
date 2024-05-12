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

export const userData = createAsyncThunk(
    'userData',
    async (userdata, thunkAPI) => {
       const userDB = axios.post(`${process.env.REACT_APP_DOMAIN}/api/user`, {
            username:userdata.given_name,
            email:userdata.email
        },
        generateHeaders() )
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
        })
        return userDB
    }
)

export const checklistData = createAsyncThunk(
  'checklistData',
  async (checklistData, thunkAPI) => {
    const id = thunkAPI.getState().user.id;
    try {
      const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/checklist/${id}`,
      generateHeaders() );
      return response.data.checklists[0].checklist;
    } catch (error) {
      console.error(error);
      throw error;
    }
  })