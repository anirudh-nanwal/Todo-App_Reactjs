import React, { FC } from 'react';
import Todo from '../../pojo/Todo';
import './TodoContainer.css';

interface TodoContainerProps {
  todo: Todo
}

const TodoContainer: FC<TodoContainerProps> = (props) => {
  let todo = props.todo;
  return (
    <div className="TodoContainer" data-testid="TodoContainer">
      TodoContainer Component
    </div>
  );
};

export default TodoContainer;
