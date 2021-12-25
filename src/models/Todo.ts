export const enum TodoType {
  TODO = 'TODO',
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}

export interface TodoItem {
  id: number;
  title: string;
  description?: string;
}

export interface TodosColumn {
  type: TodoType;
  title: String;
}

export type TodosList = {
  items: { [key in TodoType]: TodoItem[] };
};
