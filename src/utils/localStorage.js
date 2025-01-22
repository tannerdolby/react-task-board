export function saveTaskBoard(data) {
  if (!data || Object.keys(data) === 0) {
    throw new Error('Unable to save task list to local storage.');
  }
  window.localStorage.setItem('redux:store', JSON.stringify(data));
}

export function resetToIntialState() {
  window.localStorage.setItem('redux:store', JSON.stringify({
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
  }));
}

export function getStoredTaskBoard() {
  return JSON.parse(window.localStorage.getItem('redux:store'));
}
