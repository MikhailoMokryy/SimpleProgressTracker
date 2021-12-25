import { TodoItem, TodoType } from './Todo';

export type TodoAdd = Omit<TodoItem, 'id'>;

export interface TodoChange {
  todoId: number;
  type: TodoType;
  changeType: TodoType;
}

export type TodoDelete = Pick<TodoChange, 'todoId' | 'type'>;
