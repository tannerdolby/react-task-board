import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: [],
  'in-progress': [],
  'in-review': [],
  completed: [],
  isAddingNewItem: false,
  isTaskExpanded: false,
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
      console.log('saveItemToColumn,', task, fromColumn, toColumn);
      if (fromColumn) {
        removeItemFromColumn(state, fromColumn, task);
      }
      state[toColumn] = [...state[toColumn], task];
    },
    saveIsAddingNewItem(state, action) {
      state.isAddingNewItem = Boolean(action.payload);
    },
    saveIsExpandingTask(state, action) {
      state.isTaskExpanded = Boolean(action.payload);
    }
  }
});

function removeItemFromColumn(state, fromColumn, task) {
  state[fromColumn] = state[fromColumn]
    .filter(item => item.title !== task.title);
}

export const {
  saveCurrentDraggedTask,
  saveItemToColumn,
  saveIsAddingNewItem,
  saveIsExpandingTask,
} = taskBoardSlice.actions;

export default taskBoardSlice.reducer;
