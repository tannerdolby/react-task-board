import '../styles/task-list.css';
import Task from './Task';
import Modal from './Modal';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { Labels } from './Task';
import { saveIsExpandingTask } from '../redux/features/task-board-slice';
import TaskCardActions from './TaskCardActions';

export default function Tasks({ tasks }) {
  const dispatch = useAppDispatch();
  const isTaskExpanded = useAppSelector(state => state.taskBoard.isTaskExpanded);
  const currentTask = useAppSelector(state => state.taskBoard.current);

  if (!Array.isArray(tasks)) {
    return '';
  }

  return (
    <ul className='task-list'>
      {
        tasks?.map((task, i) => {
          return (
            <li key={i}>
              <Modal
                maxHeight='450px'
                styles={{gridRow: '1 / 18', padding: '1rem 0'}}
                hideHeader={true}
                content={<DisplayTask task={currentTask} />}
                footer={<TaskCardActions />}
                isOpen={isTaskExpanded}
                clickEffect={(isExpanded) => {
                  dispatch(saveIsExpandingTask(!isExpanded));
                }}
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
    <div className="display-task" style={{
      padding: '0 2rem',
      fontSize: "1rem",
      // height: '100%'
    }}>
      <h3
        style={{
          fontSize: '2rem',
          margin: '1rem 0',
          lineHeight: 'normal'
        }}
      >
        {task.title}
      </h3>
      {task.date && 
        <div style={{fontSize: '1rem'}}>
          Created on {new Date(task.date).toLocaleString()}
          <br />
          Status: {task.status}
        </div>
      }
      <p className="task__desc" style={{margin: '1rem 0'}}>
        {task.desc}
      </p>
      <Labels labels={task.labels} />
    </div>
  );
}