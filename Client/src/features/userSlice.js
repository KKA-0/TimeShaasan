import { createSlice, current } from '@reduxjs/toolkit'
import { userData, checklistData } from './userThunk'
import { sessionThunk } from './sessionThunk'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    username: "",
    id: "",
    email: "",
    checklist: [],
    session: {
        startTimestamp: 0,
        sessionsLimit: 0,
        remainingTime: 0,
        ToggleTimer: true,
    }
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.username = action.payload.username
            state.id = action.payload.id
            state.email = action.payload.email
        },
        addchecklist: (state, action) => {
            const task_id = uuidv4()
            axios.post(`${process.env.REACT_APP_DOMAIN}/api/checklist/${state.id}`, {
                task_id: task_id,
                title: action.payload.title,
                status: action.payload.status
            })
            .then(function (response) {
                // console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
            const newChecklist = {...action.payload, task_id: task_id}
            console.log(newChecklist)
            state.checklist.push(newChecklist)
        },
        removeChecklist: (state) => {
            state.checklist = []
        },
        updatechecklist: (state, action) => {
            const { task_id } = action.payload;
            const tasks = current(state.checklist)
            const updatechecklist = tasks.map(item => {
                if(item.task_id === task_id) {
                    axios.patch(`${process.env.REACT_APP_DOMAIN}/api/checklist/${state.id}`, {
                        task_id,
                        status: item.status === 0 ? 1 : 0
                    })
                    .then(function (response) {
                        // console.log(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    return {
                        ...item,
                        status: item.status === 0 ? 1 : 0
                    };
                }
                return item;
            });
            state.checklist = updatechecklist;
        },
        updateFocusSession: (state, action) => {
            // state.session.startTimestamp = action.payload.startTimestamp
            // state.session.sessionsLimit = action.payload.sessionsLimit
            // state.session.remainingTime = action.payload.remainingTime
            // state.session.ToggleTimer = action.payload.ToggleTimer
            axios.patch(`${process.env.REACT_APP_DOMAIN}/api/focus/${action.payload.id}`, {
                sessions_limit: action.payload.sessionsLimit,
                start_Timestamp: action.payload.startTimestamp,
                remaining_Time: action.payload.remainingTime,
                ToggleTimer: action.payload.ToggleTimer
              })
              .then(function (response) {
                // console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

        },
        removeUser: (state, action) => {
            state.userData = state.userData.filter((user) => 
            user.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userData.fulfilled, (state, action) => {
                state.username = action.payload.username
                state.id = action.payload.id
                state.email = action.payload.email
            })
            .addCase(checklistData.fulfilled, (state, action) => {
                state.checklist = action.payload;

            })
            .addCase(sessionThunk.fulfilled, (state, action) => {
                state.session.startTimestamp = action.payload.data.focus.start_Timestamp
                state.session.sessionsLimit = action.payload.data.focus.sessions_limit
                state.session.remainingTime = action.payload.data.focus.remaining_Time
                state.session.ToggleTimer = action.payload.data.focus.ToggleTimer
            });
    }
}) 

export const { addUser, addchecklist, removeUser, removeChecklist, updateFocusSession, updatechecklist } = userSlice.actions

export default userSlice.reducer