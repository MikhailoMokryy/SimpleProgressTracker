import React from 'react';
import { TodoCard } from './TodoCard';
import { TodoItem, TodosColumn, TodoType } from '../../models/Todo';
import { useAppSelector } from '../../app/hooks';
import {} from '../todos/todosSlice';

export function TodoColumn({ type, title }: TodosColumn) {
  const todos: TodoItem[] = useAppSelector((state) => state.todos.items[type]);

  const todosList = todos.map((elem: TodoItem) => {
    return <TodoCard key={elem.id} type={type} {...elem} />;
  });

  return (
    <div className='col-4'>
      <div className='h5 text-center'>{title}</div>
      {todosList}
    </div>
  );
}
