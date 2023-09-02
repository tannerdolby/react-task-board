import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {}
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    saveCurrentDraggedTask(state, action) {
      state.current = action.payload;
    },
    updateTaskStatus(state, action) {
      state.current.status = action.payload;
    }
  }
});


export const {
  saveCurrentDraggedTask,
  updateTaskStatus,
} = taskSlice.actions;

export default taskSlice.reducer;
