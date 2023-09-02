import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/task-slice';
import taskBoardReducer from '../features/task-board-slice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    taskBoard: taskBoardReducer,
  }
});
