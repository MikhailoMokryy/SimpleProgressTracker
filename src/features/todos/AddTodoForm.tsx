import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useAppDispatch } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { addTodo } from './todosSlice';
import { BsPlus, BsXLg } from 'react-icons/bs';
import { useForm } from 'react-hook-form';

interface UseFormInputs {
  title: string;
  description?: string;
}

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '5px',
    minWidth: '450px',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export function AddTodoForm() {
  const dispatch: AppDispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UseFormInputs>();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    !modalIsOpen && reset();
  }, [modalIsOpen, reset]);

  const onSubmit = (data: UseFormInputs) => {
    dispatch(
      addTodo({
        title: data.title,
        description: data?.description,
      })
    );
    setIsOpen(false);
  };

  return (
    <div className='row justify-content-end mt-3'>
      <span className='todo-button' onClick={() => setIsOpen(true)}>
        <BsPlus />
        Add New Item
      </span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='modal-header'>
          <h5 className='modal-title'>New Item</h5>
          <BsXLg className='action-icon' onClick={() => setIsOpen(false)} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='modal-body'>
            <div className='h6'>Title</div>
            <input
              type='text'
              className='form-control'
              aria-invalid={errors.title ? 'true' : 'false'}
              {...register('title', { required: true, maxLength: 50 })}
            />
            {errors.title && errors.title.type === 'required' && (
              <span role='alert' className='text-danger'>
                Required field
              </span>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <span role='alert' className='text-danger'>
                Max length 50 symbols
              </span>
            )}
            <div className='h6 mt-4'>Description</div>
            <textarea
              className='form-control'
              {...register('description', { maxLength: 500 })}
              rows={6}
            />
            {errors.description && errors.description.type === 'maxLength' && (
              <span role='alert' className='text-danger'>
                Max length 500 symbols
              </span>
            )}
          </div>
          <div className='modal-footer'>
            <button className='todo-button' onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className='todo-button' type='submit'>
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
