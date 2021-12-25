import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { TodoItem, TodosList, TodoType } from '../../models/Todo';
import { TodoAdd, TodoChange, TodoDelete } from '../../models/Actions';
import { RootState } from '../../app/store';
import { loadState } from '../../app/localStorage';

type NullabeTodoItem = TodoItem | null;

const initialState: TodosList = loadState();

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoAdd>) {
      let idArr: number[] = [];

      for (const type of Object.keys(state.items)) {
        idArr = [
          ...idArr,
          ...state.items[type as TodoType].map((elem) => elem.id),
        ];
      }

      const nextId: number = idArr.length ? Math.max(...idArr) + 1 : 0;

      const todo: TodoItem = {
        id: nextId,
        ...action.payload,
      };
      state.items[TodoType.TODO].push(todo);
    },
    changeTodo(state, action: PayloadAction<TodoChange>) {
      const { todoId, type, changeType } = action.payload;

      const todo: NullabeTodoItem =
        state.items[type].find((elem) => elem.id === todoId) ?? null;

      if (todo) {
        const filterdItems: TodoItem[] = state.items[type].filter(
          (elem) => elem.id !== todo.id
        );
        state.items[type] = filterdItems;
        state.items[changeType].push(todo);
      }
    },
    deleteTodo(state, action: PayloadAction<TodoDelete>) {
      const { todoId, type } = action.payload;

      const todo: NullabeTodoItem =
        state.items[type].find((elem) => elem.id === todoId) ?? null;

      if (todo) {
        const filterdItems: TodoItem[] = state.items[type].filter(
          (elem) => elem.id !== todo.id
        );
        state.items[type] = filterdItems;
      }
    },
  },
});

export const { changeTodo, deleteTodo, addTodo } = todosSlice.actions;
export default todosSlice.reducer;

export const getTodos = createSelector(
  (state: RootState) => state.todos.items,
  (items) => items
);
