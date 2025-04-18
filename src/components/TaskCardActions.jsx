import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import { TASK_STATUS } from "../utils/constants";
import {
  saveItemToColumn,
  saveCurrentDraggedTask,
  saveIsExpandingTask,
  removeTask,
  saveToLocalStorage,
  saveIsEditingTask
} from "../redux/features/task-board-slice";
import AddTaskForm from "./AddTaskForm";
import Modal from "./Modal";

export default function TaskCardActions() {
  const taskBoardState = useAppSelector(state => state.taskBoard);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="task-card-actions">
        <button
          className="light-control-btn"
          onClick={() => {
            dispatch(saveIsEditingTask(true));
          }}
        >
          Edit
        </button>
        <select className="light-control-btn" onChange={(e) => {
          const updatedTask = {
            ...taskBoardState.current,
            status: e.target.value,
          }
          dispatch(saveCurrentDraggedTask(updatedTask));
          dispatch(saveItemToColumn({
            task: updatedTask,
            fromColumn: taskBoardState.current?.status,
            toColumn: e.target.value
          }))
        }}>
          <option value="" key="move-to-label">Move</option>
          {Object.keys(TASK_STATUS).map((key, i) => {
            if (TASK_STATUS[key] === taskBoardState.current?.status) {
              return "";
            }
            return (
              <option key={i} value={key}>{TASK_STATUS[key]}</option>
            )
          })}
        </select>
        <button className="delete-task-btn" title="delete task" onClick={() => {
          dispatch(removeTask({
            fromColumn: taskBoardState.current.status,
            task: taskBoardState.current,
          }));
          dispatch(saveIsExpandingTask(false));
          dispatch(saveCurrentDraggedTask({}));
          dispatch(saveToLocalStorage());
        }}>
          Delete
        </button>
      </div>
      <Modal
        title="Edit Task"
        content={<AddTaskForm task={taskBoardState.current} isEditing={taskBoardState.isEditing} />}
        isOpen={taskBoardState.isEditingTask}
        onClose={() => {
          console.log('onCLose', )
          dispatch(saveIsEditingTask(false));
        }}
      />
    </>
  )
}
