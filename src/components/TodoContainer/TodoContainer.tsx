import React, { FC } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import Todo from '../../pojo/Todo';
import { DATE_FULL, DEFAULT_MIN_DATE } from '../../Utility/Constants';
import Card from '../Card/Card';
import './TodoContainer.css';

interface TodoContainerProps {
  todo?: Todo,
  showAddEditTmpl: {
    showAddTmpl: boolean,
    showEditTmpl: boolean
  },
  addTodoHandler?: Function
}

const TodoContainer: FC<TodoContainerProps> = (props) => {
  const todo = props.todo;
  const showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean } = props.showAddEditTmpl;
  const addTodoHandler: Function = props.addTodoHandler !== undefined ? props.addTodoHandler : () => { return };
  let newTodo: Todo = new Todo(0, '', DEFAULT_MIN_DATE.getTime());
  const onTitleChangeHandler: Function = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let title: string = event.target.value;
    newTodo.setTitle(title);
  }
  const onDateChangeHandler: Function = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let date: Date = new Date(event.target.value);
    newTodo.setCompleteBy(date.getTime());
  }
  if (todo !== undefined) {
    return (
      <Card className='TodoContainer' key={todo.getId()}>
        <div className="todo-title">
          {todo.getTitle()}
        </div>
        <div className="todo-complete-by">{(new Date(todo.getCompleteBy())).convertDateToDateSkey(DATE_FULL)}</div>
        <div className="actions">
          <div className="delete-todo">
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
          <input type="date" className="complete-by" id="todoCompleteBy" value={new Date(newTodo.getCompleteBy()).getFormattedDate()} onChange={(event) => { onDateChangeHandler(event) }} />
        </div>
        <div className="actions">
          <div className="add-todo">
            <button className="btn btn-primary" onClick={() => { addTodoHandler(newTodo) }}>Add</button>
          </div>
          <div className="cancel"></div>
        </div>
      </Card>
    );
  } else {
    return (<Card className='TodoContainer'></Card>);
  }

};

export default TodoContainer;
