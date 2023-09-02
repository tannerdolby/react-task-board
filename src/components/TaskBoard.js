import { useState, useEffect } from 'react';
import { saveToLocal, getStoredTaskList } from '../utils/localStorage';
import { GRID_LABELS } from '../utils/constants';
import '../styles/task-list.css';
import '../styles/task-grid.css';
import Column from './Column';

export default function TaskBoard({ tasks }) {
  const [storedTasks, setStoredTasks] = useState(JSON.parse(getStoredTaskList()));
  const [taskList, setTaskList] = useState(storedTasks || tasks || []);

  useEffect(() => {
    saveToLocal([...taskList]);
    setStoredTasks([...taskList]);
  }, [taskList]);

  return (
    <>
      <div className="task-board">
        {GRID_LABELS.map((column, i) => {
          return (
            <Column
              key={i}
              column={column}
              tasks={taskList}
              setTaskList={setTaskList}
            />
          );
        })}
      </div>
    </>
  );
}

function AddTodoInput({ task, taskList, setTask, setTaskList }) {
  return (
    <div className="add-todo-inputs">
      <label htmlFor="todo-input">Modify Todo List</label>
      <div className="add-todo-inputs-wrapper">
        <textarea
          id="todo-input"
          type="text"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div className="add-todo-submit-btns">
          <button
            onClick={() => {
              if (!task) return;
              setTaskList([
                ...taskList,
                {
                  title: task,
                  status: 'todo',
                }
              ]);
              setTask('');
            }}
          >
            Add
          </button>
          <button onClick={() => setTask('')}>Clear</button>
        </div>
      </div>
    </div>
  );
}
