import { useDrop } from 'react-dnd';
import { ITEM_TYPE } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { saveItemToColumn } from '../redux/features/task-board-slice';
import { useEffect, useState } from 'react';
import Tasks from './Tasks';

export default function Column({ column }) {
  const columnName = column.label.toLowerCase();
  const taskBoardState = useAppSelector(state => state.taskBoard);
  const [columnTasks, setColumnTasks] = useState(taskBoardState[column]);
  const currentTask = useAppSelector(state => state.taskBoard.current);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const uniqueTasks = [...new Set(taskBoardState[columnName])];
    const filtered = uniqueTasks.filter(task => task.title.toLowerCase().includes(taskBoardState.search.toLowerCase()));

    function sort(a, b) {
        switch (taskBoardState.sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'created-at':
          return b.date - a.date;
        case 'last-updated':
          // TODO
          break;
        default:
          break;
      }
    }
    const sorted = filtered.sort(sort);
    setColumnTasks(sorted);
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
          {columnTasks?.length}
        </span>
      </div>
      <Tasks
        tasks={columnTasks}
        columnName={column.label}
      />
    </div>
  );
}
