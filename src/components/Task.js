import { useDrag } from 'react-dnd';
import { ITEM_TYPE } from '../utils/constants';
import { useAppDispatch } from '../redux/app/hooks';
import { saveCurrentDraggedTask, saveIsExpandingTask } from '../redux/features/task-board-slice';
import '../styles/task.css';
import { isValidArray } from '../utils/helper';

export default function Task({ task, children }) {
  const dispatch = useAppDispatch();
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ITEM_TYPE.TASK,
      item: { task },
      collect: (monitor) => ({
        isDragging: Boolean(monitor.isDragging()),
      }),
    }),
    []
  );
  
  if (!task) return '';

  const { title, desc, labels} = task;

  return (
    <div
      ref={dragRef}
      className='task'
      tabIndex={0}
      style={{
        cursor: isDragging && 'move',
        visibility: isDragging && 'hidden'
      }}
      onClick={() => {
        dispatch(saveIsExpandingTask(true));
        dispatch(saveCurrentDraggedTask(task));
      }}
      onDrag={() => {
        dispatch(saveCurrentDraggedTask(task));
      }}
    >
      <Title title={title} controls={children} />
      <Description desc={desc} />
      <Labels labels={labels} />
    </div>
  );
}

function Title({ title, controls }) {
  return (
    <div className="task__header">
      <span className="task__title">
        {title}
      </span>
      {controls}
    </div>
  );
}

function Description({ desc }) {
  if (!desc) return '';
  return (
    <p className="task__desc">
      {desc}
    </p>
  );
}

export function Labels({ labels }) {
  if (!isValidArray(labels)) return '';
  console.log('sajj', labels, isValidArray(labels));
  return (
    <ul className="task__labels">
      {labels?.map((label, i) => {
        return (
          <li key={i}>{label}</li>
        )
      })}
    </ul>
  )
}
