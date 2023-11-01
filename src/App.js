import TaskBoard from './components/TaskBoard';
import Header from './components/Header';
import './styles/App.css';
import { useAppDispatch } from './redux/app/hooks';
import { getStoredTaskBoard, saveTaskBoard } from './utils/localStorage';
import { saveBoard } from './redux/features/task-board-slice';

function App() {
  const dispatch = useAppDispatch();
  const existingTasks = getStoredTaskBoard();

  if (existingTasks) {
    dispatch(saveBoard(existingTasks));
  }
  
  return (
    <div className="task-board-app">
      <Header />
      <TaskBoard />
    </div>
  );
}

export default App;
