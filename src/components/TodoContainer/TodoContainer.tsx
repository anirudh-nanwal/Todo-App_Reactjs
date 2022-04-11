import React, { FC, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import Todo from '../../pojo/Todo';
import { DATE_FULL, DEFAULT_CURR_DATE } from '../../Utility/Constants';
import Card from '../Card/Card';
import './TodoContainer.css';

interface TodoContainerProps {
  className: string,
  todo?: Todo,
  showAddEditTmpl: {
    showAddTmpl: boolean,
    showEditTmpl: boolean
  },
  addTodoHandler?: Function,
  deleteTodoHandler?: Function,
  cancelAddTodoHandler?: Function
}

const TodoContainer: FC<TodoContainerProps> = (props) => {
  const classes = 'TodoContainer ' + props.className;
  const todo = props.todo;
  const showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean } = props.showAddEditTmpl;
  const addTodoHandler: Function = props.addTodoHandler !== undefined ? props.addTodoHandler : () => { return };
  const [newTodo, updateNewTodo] = useState(new Todo(0, '', DEFAULT_CURR_DATE.getTime()));
  const deleteTodoHandler: Function = props.deleteTodoHandler !== undefined ? props.deleteTodoHandler : () => { return };
  const cancelAddTodoHandler: Function = props.cancelAddTodoHandler !== undefined ? props.cancelAddTodoHandler : () => { return };
  const onTitleChangeHandler: Function = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let title: string = event.target.value;
    updateNewTodo(new Todo(newTodo.getId(), title, newTodo.getCompleteBy()));
  }
  const onDateChangeHandler: Function = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let date: Date = new Date(event.target.value);
    updateNewTodo(new Todo(newTodo.getId(), newTodo.getTitle(), date.getTime()));
  }
  if (todo !== undefined) {
    return (
      <Card className={classes} key={todo.getId()}>
        <div className="todo-title">
          {todo.getTitle()}
        </div>
        <div className="todo-complete-by">{(new Date(todo.getCompleteBy())).convertDateToDateSkey(DATE_FULL)}</div>
        <div className="actions">
          <div className="delete-todo" onClick={() => { deleteTodoHandler(todo.getId()) }}>
            <MdDelete></MdDelete>
          </div>
          <div className="edit-todo">
            <MdEdit></MdEdit>
          </div>
        </div>
      </Card>
    );
  } else if (showAddEditTmpl.showAddTmpl) {
    return (
      <Card className='TodoContainer'>
        <div className="todo-title">
          <input type="text" className="title" id='todoTitle' onChange={(event) => { onTitleChangeHandler(event) }} />
        </div>
        <div className="todo-complete-by">
          <input type="date" className="complete-by" id="todoCompleteBy" onChange={(event) => { onDateChangeHandler(event) }} />
        </div>
        <div className="actions">
          <div className="cancel">
            <button className="btn btn-primary" onClick={() => { cancelAddTodoHandler() }}>Cancel</button>
          </div>
          <div className="add-todo">
            <button className="btn btn-primary" onClick={() => { addTodoHandler(newTodo) }}>Add</button>
          </div>
        </div>
      </Card>
    );
  } else {
    return (<Card className='TodoContainer'></Card>);
  }

};

export default TodoContainer;
