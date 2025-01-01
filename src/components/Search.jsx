import { saveSearch } from "../redux/features/task-board-slice";
import { useAppDispatch } from "../redux/app/hooks";

export default function Search() {
  const dispatch = useAppDispatch();
  // TODO: Add filter options, clear search button
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search items"
      onChange={(e) => {
        dispatch(saveSearch(e.target.value));
      }}
    />
  )
}
