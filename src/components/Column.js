import { useDrop } from 'react-dnd';
import { ITEM_TYPE } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { saveItemToColumn, saveBoard } from '../redux/features/task-board-slice';
import { useEffect, useState } from 'react';
import { getStoredTaskBoard } from '../utils/localStorage';
import Tasks from './Tasks';

export default function Column({ column }) {
  const columnName = column.label.toLowerCase();
  const taskBoardState = useAppSelector(state => state.taskBoard);
  const [storedTasks, setStoredTasks] = useState(getStoredTaskBoard());
  const [columnTasks, setColumnTasks] = useState([]);
  const currentTask = useAppSelector(state => state.taskBoard.current);
  const dispatch = useAppDispatch();

  let tasks = (storedTasks ? storedTasks[columnName] : columnTasks);

  if (taskBoardState.search.length > 0) {
    tasks = tasks.filter(task => task.title.includes(taskBoardState.search));
  }

  useEffect(() => {
    setColumnTasks([...new Set(taskBoardState[columnName])]);
    setStoredTasks(getStoredTaskBoard());
  }, [taskBoardState, columnName]);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ITEM_TYPE.TASK,
    drop: () => {
      const columnKey = column.label.toLowerCase();
      const updatedStatusTask = { ...currentTask, status: columnKey };
      dispatch(saveItemToColumn({
        task: updatedStatusTask,
        fromColumn: currentTask.status,
        toColumn: columnKey,
      }));
    },
    collect: monitor => ({
      isOver: Boolean(monitor.isOver()),
    }),
  }), [currentTask]);

  return (
    <div className="board-column" ref={dropRef} style={{
      background: isOver && '#eee'
    }}>
      <div className="column-header">
        <div className="column-identifier">{column.label} <span>{column.emoji}</span></div>
        <span className="column-count">
          {tasks.length}
        </span>
      </div>
      <Tasks
        tasks={tasks}
        columnName={column.label}
      />
    </div>
  );
}
