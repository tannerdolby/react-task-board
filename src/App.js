import './styles/App.css';
import TaskBoard from './components/TaskBoard';
import { clearStorage } from './utils/localStorage';
import Modal from './components/Modal';
import Header from './components/Header';

// use local storage or db/redis
// for any previously saved task boards
let tasks = [
  { title: 'eat dinner', desc: '', status: 'todo', labels: ['foo', 'bar', 'buzz', 'bazz', 'boo', 'foo', 'bar'] },
  { title: 'do laundry', desc: 'wash towels first', status: 'in-progress', labels: ['wow', 'so', 'cool'] },
  { title: 'buy coffee', status: 'in-review' },
  { title: 'go to verizon', status: 'completed' },
  { title: 'get checks', status: 'todo' }
];

function App() {
  return (
    <div className="task-board-app">
      <Header />
      <TaskBoard tasks={tasks} />
    </div>
  );
}

export default App;
