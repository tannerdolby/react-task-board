// TODO: keep redis in mind

export function saveToLocal(data) {
    if (!data || !Array.isArray(data)) {
        throw new Error('Unable to save task list to local storage.');
    }
    const localStorage = window.localStorage;
    localStorage.setItem('taskList', JSON.stringify(data));
}

export function getStoredTaskList() {
    return window.localStorage.getItem('taskList');
}

export function clearStorage() {
    window.localStorage.clear();
}
