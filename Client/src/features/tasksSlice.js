// tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: [],
  inProgress: [],
  done: []
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
     addTask(state, action) {
      const { columnId, task } = action.payload;
      state[columnId] = state[columnId] || [];
      state[columnId].push(task);
      },
      removeTask(state, action) {
        const { column, taskId } = action.payload;
        state[column] = state[column].filter(task => task.id !== taskId);
      },
      // moveTask(state, action) {
      //   const { sourceColumn, destinationColumn, taskId } = action.payload;
      //   const task = state[sourceColumn].find(task => task.id === taskId);
      // state[sourceColumn] = state[sourceColumn].filter(task => task.id !== taskId);
      // state[destinationColumn].push(task);
      // },
      moveTask(state, action) {
        const { sourceColumnId, destinationColumnId, taskId, destinationIndex } = action.payload;
        const taskToMove = state[sourceColumnId].find(task => task.id === taskId);
        state[sourceColumnId] = state[sourceColumnId].filter(task => task.id !== taskId);
        state[destinationColumnId].splice(destinationIndex, 0, taskToMove);
      },
  }
});

export const { addTask, removeTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
