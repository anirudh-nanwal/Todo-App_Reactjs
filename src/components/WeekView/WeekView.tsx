import React, { FC } from 'react';
import Card from '../Card/Card';
import WeekCalendar from '../WeekCalendar/WeekCalendar';
import './WeekView.css';
import Todo from '../../pojo/Todo';
import TodoContainer from '../TodoContainer/TodoContainer';

interface WeekViewProps {
  todos: Todo[],
  showAddEditTmpl: {
    showAddTmpl: boolean,
    showEditTmpl: boolean
  },
  addTodoHandler: Function,
  updateTodoList: Function
}

const WeekView: FC<WeekViewProps> = (props) => {
  let todos: Todo[] = props.todos;
  const addTodoHandler: Function = props.addTodoHandler;

  let todosComponent = [];
  const showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean } = props.showAddEditTmpl;

  for (let todo of todos) {
    todosComponent.push(<TodoContainer todo={todo} key={todo.getId()} showAddEditTmpl={showAddEditTmpl}></TodoContainer>);
  }
  return (
    <>
      <div className="WeekView" data-testid="WeekView">
        <WeekCalendar className=''></WeekCalendar>
        <Card className='list-todos'>
          {showAddEditTmpl.showAddTmpl && <TodoContainer showAddEditTmpl={showAddEditTmpl} addTodoHandler={addTodoHandler}></TodoContainer>}
          {todosComponent.length === 0 && (<div className='no-todos-present'>No todos present</div>)}
          {todosComponent.length > 0 && (todosComponent)}
        </Card>
      </div>
    </>
  );
}

export default WeekView;
