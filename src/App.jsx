import TaskBoard from './components/TaskBoard';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import { getStoredTaskBoard } from './utils/localStorage';
import { saveBoard } from './redux/features/task-board-slice';
import { createContext, useState } from 'react';

// const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('dark');
  // const taskboardState = useAppSelector((state) => state.taskBoard);
  const dispatch = useAppDispatch();
  const existingTasks = getStoredTaskBoard();

  if (existingTasks) {
    dispatch(saveBoard(existingTasks));
  }
  
  return (
    // <ThemeContext.Provider value={theme}>
      <div className="task-board-app">
        <Header />
        <TaskBoard />
        <Footer />
      </div>
    // </ThemeContext.Provider>
  );
}

export default App;
