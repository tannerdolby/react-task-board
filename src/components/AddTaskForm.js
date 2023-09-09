import '../styles/add-task-form.css';
import { useAppDispatch } from '../redux/app/hooks';
import {
  saveItemToColumn,
  saveIsAddingNewItem,
  saveCurrentDraggedTask
} from '../redux/features/task-board-slice';
import { v4 as uuidv4 } from 'uuid';

export default function AddTaskForm() {
  const dispatch = useAppDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    formatAndSaveLabels(formJson);
    formJson.date = new Date().getTime();
    formJson.id = uuidv4();

    dispatch(saveCurrentDraggedTask(formJson));
    dispatch(saveItemToColumn({
      task: formJson,
      toColumn: formJson.status
    }));
    dispatch(saveIsAddingNewItem(false));
  }

  return (
    <form
      className='add-task-form'
      method="get"
      onSubmit={handleSubmit}
      name="add-task"
    >
      <label>
        Title <input type="text" name="title" required />
      </label>
      <label>
        Description <br /><textarea name="desc" />
      </label>
      <label>
        Labels <br /><textarea name="labels" title="Provide a list of comma separated labels" />
      </label>
      <label>Status</label>
      <div>
        <input type="radio" value="todo" name="status" id="todo-status-radio-btn" defaultChecked />
        <label htmlFor="todo-status-radio-btn">Todo</label>
      </div>
      <div>
        <input type="radio" value="in-progress" name="status" id="in-progress-status-radio-btn" />
        <label htmlFor="in-progress-status-radio-btn">In-Progress</label>
      </div>
      <div>
        <input type="radio" value="in-review" name="status" id="in-review-status-radio-btn" />
        <label htmlFor="in-review-status-radio-btn">In-Review</label>
      </div>
      <div>
        <input type="radio" value="completed" name="status" id="completed-status-radio-btn" />
        <label htmlFor="completed-status-radio-btn">Completed</label>
      </div>
      <div className="add-task-form-btns">
        <button
          className="submit-btn"
          type="submit"
        >
          Create Task
        </button>
        <button className="reset-btn" type="reset">Reset</button>
      </div>
    </form>
  )
}

function formatAndSaveLabels(formJson) {
  const labelStr = formJson.labels.trim();
  if (!labelStr || labelStr === '') return;
  formJson.labels = labelStr.split(',').map(l => l.trim());
}
