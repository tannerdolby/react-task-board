import { createSlice } from '@reduxjs/toolkit';
import { saveTaskBoard, getStoredTaskBoard } from '../../utils/localStorage';
import {isValidArray} from '../../utils/helpers';

const initialState = {
  todo: [],
  'in-progress': [],
  'in-review': [],
  completed: [],
  isAddingNewItem: false,
  isTaskExpanded: false,
  current: {},
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

      state[toColumn] = [...state[toColumn], task];
      
      // maintain a temp "history" for tasks using local storage
      const localState = getStoredTaskBoard();
      localState[fromColumn] = removeItemFromColumn(localState, fromColumn, task);
      localState[toColumn].push(task);

      saveTaskBoard(localState);
    },
    saveIsAddingNewItem(state, action) {
      state.isAddingNewItem = Boolean(action.payload);
    },
    saveIsExpandingTask(state, action) {
      state.isTaskExpanded = Boolean(action.payload);
    },
    clearBoard(state, action) {
      state.todo = [];
      state['in-progress'] = [];
      state['in-review'] = [];
      state.completed = [];
    },
  }
});

function removeItemFromColumn(obj, fromColumn, task) {
  if (!obj || !isValidArray(obj[fromColumn])) {
    return [];
  }
  return obj[fromColumn]
    .filter(item => {
      // =)
      console.log('foo', item, task);
      return (
        item.id !== task.id
        // item.title !== task.title &&
        // new Date(item.date) !== new Date(task.date)
      )
    });
}

export const {
  saveCurrentDraggedTask,
  saveItemToColumn,
  saveIsAddingNewItem,
  saveIsExpandingTask,
  clearBoard,
} = taskBoardSlice.actions;

export default taskBoardSlice.reducer;
