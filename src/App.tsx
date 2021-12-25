import React from 'react';
import './App.css';
import { TodoColumn } from './features/todos/TodosColumn';
import { AddTodoForm } from './features/todos/AddTodoForm';
import { TodoType } from './models/Todo';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <AddTodoForm />
        <div className='row mt-5'>
          <TodoColumn type={TodoType.TODO} title='To do' />
          <TodoColumn type={TodoType.PROGRESS} title='In Progress' />
          <TodoColumn type={TodoType.DONE} title='Done' />
        </div>
      </div>
    </div>
  );
}

export default App;
