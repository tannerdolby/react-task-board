import { createSlice } from '@reduxjs/toolkit';
import { saveTaskBoard, getStoredTaskBoard } from '../../utils/localStorage';
import { isValidArray } from '../../utils/helpers';

const initialState = {
  todo: [],
  'in-progress': [],
  'in-review': [],
  completed: [],
  isAddingNewItem: false,
  isTaskExpanded: false,
  current: {},
  search: '',
  sortBy: '',
};

export const taskBoardSlice = createSlice({
  name: 'taskBoard',
  initialState,
  reducers: {
    saveCurrentDraggedTask(state, action) {
      state.current = action.payload;
    },
    saveItemToColumn(state, action) {
      const { task, fromColumn, toColumn } = action.payload;

      if (fromColumn === toColumn) return;

      if (fromColumn) {
        state[fromColumn] = removeItemFromColumn(state, fromColumn, task);
      }

      if (toColumn) {
        state[toColumn].push(task);
      }

      // maintain a temp "history" for tasks using local storage
      const localState = getStoredTaskBoard() || state;

      localState[fromColumn] = removeItemFromColumn(localState, fromColumn, task);
      localState[toColumn]?.push(task);

      window.localStorage.setItem('redux:store', JSON.stringify(state))
      saveTaskBoard(state);
    },
    removeTask(state, action) {
      const payload = action.payload;
      state[payload.fromColumn] = removeItemFromColumn(state, payload.fromColumn, payload.task);
    },
    saveIsAddingNewItem(state, action) {
      state.isAddingNewItem = Boolean(action.payload);
    },
    saveIsExpandingTask(state, action) {
      state.isTaskExpanded = Boolean(action.payload);
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
    },
    saveSearch(state, action) {
      state.search = action.payload;
    },
    saveToLocalStorage(state, action) {
      window.localStorage.setItem('redux:store', JSON.stringify(state));
    },
    clearLocalStorage(state, action) {
      window.localStorage.setItem('redux:store', JSON.stringify({
        todo: [],
        'in-progress': [],
        'in-review': [],
        completed: []
      }));
    },
    saveSortBy(state, action) {
      state.sortBy = action.payload;
    }
  }
});

function removeItemFromColumn(obj, fromColumn, task) {
  if (!obj || !isValidArray(obj[fromColumn])) {
    return [];
  }
  return obj[fromColumn]
    .filter(item => item?.id !== task?.id);
}

export const {
  saveCurrentDraggedTask,
  saveItemToColumn,
  saveIsAddingNewItem,
  saveIsExpandingTask,
  saveToLocalStorage,
  clearLocalStorage,
  saveBoard,
  removeTask,
  clearBoard,
  saveSearch,
  saveSortBy
} = taskBoardSlice.actions;

export default taskBoardSlice.reducer;
