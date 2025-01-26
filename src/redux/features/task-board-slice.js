import { createSlice } from '@reduxjs/toolkit';
import {
  saveTaskBoard,
  getStoredTaskBoard,
  resetToIntialState
} from '../../utils/localStorage';
import { isValidArray } from '../../utils/helpers';

function removeItemFromColumn(obj, column, task) {
  if (!obj || !isValidArray(obj[column])) {
    return [];
  }
  return obj[column]?.filter(item => item?.id !== task?.id);
}

const initialState = {
  todo: [],
  'in-progress': [],
  'in-review': [],
  completed: [],
  isAddingNewItem: false,
  isEditingTask: false,
  isTaskExpanded: false,
  current: {},
  search: '',
  sortBy: '',
  theme: 'light',
};

export const taskBoardSlice = createSlice({
  name: 'taskBoard',
  initialState: (getStoredTaskBoard() || initialState),
  reducers: {
    saveCurrentDraggedTask(state, action) {
      state.current = action.payload;
      saveTaskBoard(state);
    },
    saveItemToColumn(state, action) {
      const { task, fromColumn, toColumn } = action.payload;
      if (fromColumn === toColumn) return;
      if (toColumn) state[toColumn].push(task);
      if (fromColumn) {
        state[fromColumn] = removeItemFromColumn(state, fromColumn, task);
      }
      saveTaskBoard(state);
    },
    removeTask(state, action) {
      const { task, fromColumn } = action.payload;
      state[fromColumn] = removeItemFromColumn(state, fromColumn, task);
      saveTaskBoard(state);
    },
    updateTask(state, action) {
      const { task, fromColumn, toColumn } = action.payload;
      if (toColumn) {
        state[fromColumn] = removeItemFromColumn(state, fromColumn, task);
        state[toColumn].push(task);
      } else {
        for (let i = 0; i < state[fromColumn].length; i++) {
          const t = state[fromColumn][i];
          console.log('check', t.id, task.id);
          if (t.id === task.id) {
            console.log('grrr', t, task);
            state[fromColumn][i] = task;
          }
        }
      }
      saveTaskBoard(state);
    },
    saveIsAddingNewItem(state, action) {
      state.isAddingNewItem = Boolean(action.payload);
      saveTaskBoard(state);
    },
    saveIsEditingTask(state, action) {
      state.isEditingTask = Boolean(action.payload);
      saveTaskBoard(state);
    },
    saveIsExpandingTask(state, action) {
      state.isTaskExpanded = Boolean(action.payload);
      saveTaskBoard(state);
    },
    saveBoard(state, action) {
      const payload = action.payload;
      state.todo = payload?.todo;
      state['in-progress'] = payload['in-progress'];
      state['in-review'] = payload['in-review'];
      state.completed = payload?.completed;
    },
    clearBoard(state, action) {
      state.todo = [];
      state['in-progress'] = [];
      state['in-review'] = [];
      state.completed = [];
      saveTaskBoard(state);
    },
    saveSearch(state, action) {
      state.search = action.payload;
      saveTaskBoard(state);
    },
    saveToLocalStorage(state, action) {
      saveTaskBoard(state);
    },
    clearLocalStorage(state, action) {
      resetToIntialState();
    },
    saveSortBy(state, action) {
      state.sortBy = action.payload;
      saveTaskBoard(state);
    },
    saveTheme(state, action) {
      state.theme = action.payload;
      saveTaskBoard(state);
    },
  }
});

export const {
  saveCurrentDraggedTask,
  saveItemToColumn,
  saveIsAddingNewItem,
  saveIsEditingTask,
  saveIsExpandingTask,
  updateTask,
  saveToLocalStorage,
  clearLocalStorage,
  saveBoard,
  removeTask,
  clearBoard,
  saveSearch,
  saveSortBy,
  saveTheme,
} = taskBoardSlice.actions;

export default taskBoardSlice.reducer;
