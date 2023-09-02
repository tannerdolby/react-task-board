import '../styles/todos-grid.css';
import { GRID_LABELS } from '../utils/constants';
import Column from './Column';

export default function Columns({ tasks, setTaskList }) {
  return (
    <div className="task-board">
      {GRID_LABELS.map((column, i) => {
        return (
          <Column
            key={i}
            column={column}
            tasks={tasks}
            setTaskList={setTaskList}
          />
        );
      })}
    </div>
  );
}
