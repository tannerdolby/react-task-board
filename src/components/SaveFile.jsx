import { useAppSelector } from "../redux/app/hooks"

export default function SaveFile() {
  const taskBoardState = useAppSelector(state => state.taskBoard);
  const str = JSON.stringify(taskBoardState, null, 2);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8"
  });

  const saveFile = async (blob) => {
    try {
      const handle = await window.showSaveFilePicker({
        startIn: 'downloads',
        suggestedName: 'tasks-' + new Date().getTime() + '.json',
        types: [{
          accept: {
            "application/json": ['.json']
          },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return handle;
    } catch (err) {
      console.error(err.name, err.message);
    }
  };

  return (
    <button
      title="Save task board to file system"
      className="btn save-board-btn light-control-btn"
      onClick={() => saveFile(blob)}
    >
      Save
    </button>
  )
}