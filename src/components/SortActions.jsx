import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { saveSortBy } from "../redux/features/task-board-slice";

export default function SortActions() {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.taskBoard);
  return (
    <select id="column-sort-actions" value={sortBy} onChange={(e) => {
      dispatch(saveSortBy(e.target.value));
    }}>
      <option value="">Sort By</option>
      <option value="name">Name</option>
      <option value="created-at">Created At</option>
      <option value="last-updated">Last Updated</option>
    </select>
  );
}
