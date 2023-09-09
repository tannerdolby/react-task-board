import TaskBoard from './components/TaskBoard';
import Header from './components/Header';
import './styles/App.css';

function App() {
  return (
    <div className="task-board-app">
      <Header />
      <TaskBoard />
    </div>
  );
}

export default App;
