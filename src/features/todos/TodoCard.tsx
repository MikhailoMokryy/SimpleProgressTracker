import React, { useState, useEffect } from 'react';
import {
  BsArrowRightCircle,
  BsArrowLeftCircle,
  BsXCircle,
} from 'react-icons/bs';
import { useAppDispatch } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { changeTodo, deleteTodo } from './todosSlice';
import { TodoItem, TodoType } from '../../models/Todo';

export function TodoCard({
  id,
  title,
  description,
  type,
}: TodoItem & { type: TodoType }) {
  const dispatch: AppDispatch = useAppDispatch();
  const [moveLeft, setMoveLeft] = useState<TodoType | undefined>(undefined);
  const [moveRight, setMoveRight] = useState<TodoType | undefined>(undefined);

  useEffect(() => {
    switch (type) {
      case TodoType.TODO:
        setMoveLeft(undefined);
        setMoveRight(TodoType.PROGRESS);
        break;
      case TodoType.PROGRESS:
        setMoveLeft(TodoType.TODO);
        setMoveRight(TodoType.DONE);
        break;
      case TodoType.DONE:
        setMoveLeft(TodoType.PROGRESS);
        setMoveRight(undefined);
        break;
    }
  }, [type]);

  return (
    <div className='card mb-3'>
      <div className='card-header text-end py-0'>
        {moveLeft && (
          <BsArrowLeftCircle
            className='action-icon'
            onClick={() =>
              dispatch(changeTodo({ todoId: id, type, changeType: moveLeft }))
            }
          />
        )}
        {moveRight && (
          <BsArrowRightCircle
            className='action-icon'
            onClick={() =>
              dispatch(changeTodo({ todoId: id, type, changeType: moveRight }))
            }
          />
        )}

        <BsXCircle
          className='action-icon'
          onClick={() => dispatch(deleteTodo({ todoId: id, type }))}
        />
      </div>
      <div className='card-body'>
        <div className='card-title text-start h6'>{title}</div>
        <p className='card-text text-start'>{description}</p>
      </div>
    </div>
  );
}
