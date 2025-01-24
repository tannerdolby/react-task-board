import { saveIsAddingNewItem, clearBoard, clearLocalStorage } from "../redux/features/task-board-slice";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import AddTaskForm from "./AddTaskForm";
import Modal from "./Modal";
import Search from "./Search";
import SaveFile from "./SaveFile";
import GitHubIcon from "./icons/GithubIcon";
import SortActions from "./SortActions";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const taskBoardState = useAppSelector(state => state.taskBoard);
  const dispatch = useAppDispatch();

  return (
    <div className="header">
      <div className="header-info">
        <h1>Task Board</h1>
        <ul>
          <li>
            <ThemeSwitcher />
          </li>
          <li>
            <a
              className="github-icon"
              href="https://github.com/tannerdolby/react-task-board"
              title="Link to repository on GitHub"
              target="_blank"
            >
              <GitHubIcon theme={taskBoardState.theme} />
            </a>
          </li>
        </ul>
      </div>
      <div className="header-inputs">
        <div className="controls">
          <Search />
          <SortActions />
        </div>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <button
            title="Add Task"
            onClick={() => {
              dispatch(saveIsAddingNewItem(true));
            }}
            className="add-task-btn btn"
          >
            New Task <span className="plus-sign">+</span>
          </button>
          <button
            title="Clear task board"
            className="clear-board-btn light-control-btn"
            onClick={() => {
              dispatch(clearBoard());
              dispatch(clearLocalStorage());
            }}
          >
            Clear
          </button>
          <SaveFile />
        </div>
        <Modal
          content={<AddTaskForm />}
          isOpen={taskBoardState.isAddingNewItem}
          title="Add Task"
          onClose={() => dispatch(saveIsAddingNewItem(false))}
        />
      </div>
    </div>
  );
}
