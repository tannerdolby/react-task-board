import '../styles/task-list.css';
import Task from './Task';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import Modal from './Modal';
import {Labels} from './Task';
import { saveIsExpandingTask } from '../redux/features/task-board-slice';

export default function Tasks({ tasks, columnName }) {
  const dispatch = useAppDispatch();
  const isTaskExpanded = useAppSelector(state => state.taskBoard.isTaskExpanded);
  const columnTasks = useAppSelector(state => state.taskBoard[columnName.toLowerCase()]);
  const currentTask = useAppSelector(state => state.taskBoard.current);

  if (!Array.isArray(tasks)) {
    console.error('Must provide an array of task objects');
    return '';
  }

  return (
    <ul className='task-list'>
      {
        columnTasks.map((task, i) => {
          return (
            <li key={i}>
              <Modal
                content={
                  <DisplayTask
                    task={currentTask}
                  />
                }
                isOpen={isTaskExpanded}
                clickEffect={(isExpanded) => {
                  dispatch(saveIsExpandingTask(!isExpanded));
                }}
                height={'20rem'}
              />
              <Task
                task={task}
              />
            </li>
          );
        })
      }
    </ul>
  )
}

function DisplayTask({ task }) {
  return (
    <div style={{
      padding: '0 1.5rem'
    }}>
      <h3 style={{fontSize: '2rem', margin: '.5rem 0', lineHeight: 'normal'}}>{task?.title}</h3>
      {task?.date && <span style={{fontSize: '.9rem'}}>Date created: {new Date(task?.date).toLocaleString()}</span>}
      <p className="task__desc" style={{margin: '1rem 0'}}>{task?.desc}</p>
      <Labels labels={task?.labels} />
    </div>
  );
}