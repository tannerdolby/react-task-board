import { configureStore } from '@reduxjs/toolkit';
import taskBoardReducer from '../features/task-board-slice';

export const store = configureStore({
  reducer: {
    taskBoard: taskBoardReducer,
  }
});
