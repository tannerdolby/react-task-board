export const TASK_STATUS = {
  todo: 'todo',
  'in-progress': 'in-progress',
  'in-review': 'in-review',
  'completed': 'completed'
};

export const GRID_COLUMNS_LIST = [
  'Todo',
  'In-Progress',
  'In-Review',
  'Completed',
];

export const GRID_LABEL_EMOJIS = {
  todo: '📌',
  'in-progress': '🚧',
  'in-review': '🔎',
  completed: '✅',
};

export const GRID_LABELS = [
  {
    label: GRID_COLUMNS_LIST[0],
    emoji: GRID_LABEL_EMOJIS.todo
  },
  {
    label: GRID_COLUMNS_LIST[1],
    emoji: GRID_LABEL_EMOJIS['in-progress']
  },
  {
    label: GRID_COLUMNS_LIST[2],
    emoji: GRID_LABEL_EMOJIS['in-review']
  },
  {
    label: GRID_COLUMNS_LIST[3],
    emoji: GRID_LABEL_EMOJIS.completed
  },
];

export const ITEM_TYPE = {
  TASK: 'task',
  COLUMN: 'column',
}
