export function saveTaskBoard(data) {
    if (!data || Object.keys(data) === 0) {
        throw new Error('Unable to save task list to local storage.');
    }
    const localStorage = window.localStorage;
    localStorage.setItem('redux:store', JSON.stringify(data));
}

export function getStoredTaskBoard() {
    return JSON.parse(window.localStorage.getItem('redux:store'));
}
