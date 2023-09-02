import { saveIsAddingNewItem, saveItemToColumn } from "../redux/features/task-board-slice";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import AddTaskForm from "./AddTaskForm";
import Modal from "./Modal";
import '../styles/header.css';

export default function Header() {
  const { isAddingNewItem } = useAppSelector(state => state.taskBoard);
  const dispatch = useAppDispatch();

  return (
    <div className="header">
      <div className="header-info">
        <h1>Task Board</h1>
        <ul>
          <li>
            <a
              className="github-icon"
              href="https://github.com/tannerdolby/react-task-board"
              title="Link to react-task-board repository on GitHub"
            ></a>
          </li>
          <li>
            <img
              src="https://tannerdolby.com/images/arc1.png"
              alt="Archimedean spiral icon"
              width="27"
              height="27"
            />
          </li>
        </ul>
      </div>
      <div className="header-inputs">
        <input
          className="search-bar"
          type="text"
          placeholder="Search items"
        />
        <button
          onClick={() => {
            dispatch(saveIsAddingNewItem(!isAddingNewItem));
          }}
          className="add-task-btn"
        >
          <span>+</span> New Item
        </button>
        <Modal
          content={<AddTaskForm />}
          isOpen={isAddingNewItem}
          title="Add Task"
          clickEffect={(isOpen) => dispatch(saveIsAddingNewItem(!isOpen))}
        />
      </div>

      {/* <button
          className="clear-all-btn"
          onClick={() => {
            clearStorage();
            todos = [];
          }}
        >
          Clear
        </button> */}
    </div>
  );
}
