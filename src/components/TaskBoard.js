import { GRID_LABELS } from '../utils/constants';
import Column from './Column';
import '../styles/task-list.css';
import '../styles/task-grid.css';

export default function TaskBoard() {
  return (
    <>
      <div className="task-board">
        {GRID_LABELS.map((column, i) => {
          return (
            <Column
              key={i}
              column={column}
            />
          );
        })}
      </div>
    </>
  );
}
