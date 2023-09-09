import '../styles/task-list.css';
import Task from './Task';
import Modal from './Modal';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { Labels } from './Task';
import { saveIsExpandingTask } from '../redux/features/task-board-slice';

export default function Tasks({ tasks }) {
  const dispatch = useAppDispatch();
  const isTaskExpanded = useAppSelector(state => state.taskBoard.isTaskExpanded);
  const currentTask = useAppSelector(state => state.taskBoard.current);

  return (
    <ul className='task-list'>
      {
        tasks?.map((task, i) => {
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
                height='20rem'
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
  if (!task) return '';

  return (
    <div style={{
      padding: '0 1.5rem'
    }}>
      <h3
        style={{
          fontSize: '2rem',
          margin: '.5rem 0',
          lineHeight: 'normal'
        }}
      >
        {task.title}
      </h3>
      {task.date && 
        <span style={{fontSize: '.9rem'}}>
          Date created: {new Date(task.date).toLocaleString()}
          <br />
          Status: {task.status}
        </span>
      }
      
      <p className="task__desc" style={{margin: '1rem 0'}}>
        {task.desc}
      </p>
      <Labels labels={task.labels} />
    </div>
  );
}