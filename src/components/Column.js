import { useDrop } from 'react-dnd';
import { ITEM_TYPE } from '../utils/constants';
import ColumnCount from './ColumnCount';
import Tasks from './Tasks';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { saveItemToColumn } from '../redux/features/task-board-slice';

export default function Column({ column, tasks, setTaskList }) {
  const columnTasks = [...new Set(useAppSelector(state => state.taskBoard[column.label.toLowerCase()]))];
  const currentTask = useAppSelector(state => state.taskBoard.current);
  const dispatch = useAppDispatch();

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
        <ColumnCount
          value={columnTasks?.length}
        />
      </div>
      <Tasks
        tasks={columnTasks}
        columnName={column.label}
        setTaskList={setTaskList}
      />
    </div>
  );
}
