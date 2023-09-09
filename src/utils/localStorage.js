export function saveTaskBoard(data) {
    if (!data || Object.keys(data) === 0) {
        throw new Error('Unable to save task list to local storage.');
    }
    const localStorage = window.localStorage;
    localStorage.setItem('taskBoard', JSON.stringify(data));
}

export function getStoredTaskBoard() {
    return JSON.parse(window.localStorage.getItem('taskBoard'));
}

export function clearStoredTasks() {
    window.localStorage.setItem('taskBoard', JSON.stringify({
        todo: [],
        'in-progress': [],
        'in-review': [],
        completed: []
    }));
}
