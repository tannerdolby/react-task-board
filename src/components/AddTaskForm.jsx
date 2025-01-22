import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/add-task-form.css';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import {
  saveItemToColumn,
  saveIsAddingNewItem,
  saveCurrentDraggedTask,
  updateTask,
  saveIsEditingTask,
  saveIsExpandingTask,
} from '../redux/features/task-board-slice';
import { v4 as uuidv4 } from 'uuid';
import { GRID_COLUMNS_LIST } from '../utils/constants';

import Alert from './Alert';

function checkForExistingTask(taskTitle, tasks) {
  const checkTitle = (v) => v.title === taskTitle;
  for (const column of GRID_COLUMNS_LIST) {
    if (tasks[column.toLowerCase()].find(checkTitle)) {
      return true;
    }
  }
  return false;
}

function formatAndSaveLabels(formJson) {
  if (!formJson || typeof formJson.labels !== 'string') return;
  const labels = formJson.labels.trim();
  if (labels) {
    formJson.labels = labels.split(',').map(l => l.trim());
  }
}

export default function AddTaskForm({ task = {} }) {
  const dispatch = useAppDispatch();
  const taskBoardState = useAppSelector((state) => state.taskBoard);
  const [hasError, setHasError] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [labels, setLabels] = useState('');
  const [status, setStatus] = useState('todo');

  useEffect(() => {
    setTitle(task.title || '');
    setDesc(task.desc || '');
    setLabels(task.labels || '');
    setStatus(task.status || 'todo');
  }, [task.title, task.desc, task.labels, task.status]);

  function resetFormState() {
    setTitle('');
    setDesc('');
    setLabels('');
    setStatus('todo');
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isEditing = taskBoardState.isEditingTask;
    const form = e.target;
    const formData = new FormData(form);
    let formJson = Object.fromEntries(formData.entries());

    if (!isEditing && checkForExistingTask(formJson.title, taskBoardState)) {
      setHasError(true);
    }

    formatAndSaveLabels(formJson);

    if (isEditing && task) {
      const obj = { ...task, ...formJson, updatedAt: new Date().getTime() };
      dispatch(updateTask({
        task: obj,
        fromColumn: task.status,
        toColumn: formJson.status
      }));
      dispatch(saveCurrentDraggedTask(obj));
      dispatch(saveIsExpandingTask(false));
      dispatch(saveIsEditingTask(false));
    } else {
      formJson.updatedAt = null;
      formJson.date = new Date().getTime();
      formJson.id = uuidv4();
      dispatch(saveCurrentDraggedTask(formJson));
      dispatch(saveItemToColumn({
        task: formJson,
        toColumn: formJson.status
      }));
      dispatch(saveIsAddingNewItem(false));
    }
    setHasError(false);
    form.reset();
    resetFormState();
  }

  return (
    <>
      <Alert
        show={hasError}
        text='Error! A task with that title already exists'
        onClick={() => setHasError(!hasError)}
      />
      <form
        className='add-task-form'
        method="get"
        onSubmit={handleSubmit}
        name="add-task"
      >
        <label>
          Title <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description <br /><textarea name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>
        <label>
          Labels <br /><input type="text" name="labels" title="Provide a list of comma separated labels" value={labels} onChange={(e) => setLabels(e.target.value)} />
        </label>
        <label>Status</label>
        <div>
          <input type="radio" value="todo" checked={status === 'todo'} name="status" id="todo-status-radio-btn" onChange={(e) => setStatus(e.target.value)} />
          <label htmlFor="todo-status-radio-btn">Todo</label>
        </div>
        <div>
          <input type="radio" value="in-progress" checked={status === 'in-progress'} name="status" id="in-progress-status-radio-btn" onChange={(e) => setStatus(e.target.value)} />
          <label htmlFor="in-progress-status-radio-btn">In-Progress</label>
        </div>
        <div>
          <input type="radio" value="in-review" checked={status === 'in-review'} name="status" id="in-review-status-radio-btn" onChange={(e) => setStatus(e.target.value)} />
          <label htmlFor="in-review-status-radio-btn">In-Review</label>
        </div>
        <div>
          <input type="radio" value="completed" checked={status === 'completed'} name="status" id="completed-status-radio-btn" onChange={(e) => setStatus(e.target.value)} />
          <label htmlFor="completed-status-radio-btn">Completed</label>
        </div>
        <div className="add-task-form-btns">
          <button
            className="submit-btn"
            type="submit"
          >
            {taskBoardState.isEditingTask ? 'Save' : 'Create'} Task
          </button>
          {!taskBoardState.isEditingTask ? <button className="reset-btn" type="reset" onClick={resetFormState}>Reset</button> : <button onClick={() => dispatch(saveIsEditingTask(false))}>Cancel</button>}
        </div>
      </form>
    </>
  )
}

AddTaskForm.propTypes = {
  task: PropTypes.object,
  isEditing: PropTypes.bool
}
