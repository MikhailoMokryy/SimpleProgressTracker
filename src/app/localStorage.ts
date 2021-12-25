import { TodoType, TodosList, TodoItem } from '../models/Todo';

export function saveState({ items }: TodosList) {
  for (const type of Object.keys(items)) {
    localStorage.setItem(type, JSON.stringify(items[type as TodoType]));
  }
}

export function loadState(): TodosList {
  const initialState: TodosList = {
    items: {
      TODO: [],
      PROGRESS: [],
      DONE: [],
    },
  };

  for (const type of Object.keys(initialState.items)) {
    const localState: string | null = localStorage.getItem(type);

    if (localState) {
      initialState.items[type as TodoType] = JSON.parse(
        localState
      ) as TodoItem[];
    }
  }

  return initialState;
}
