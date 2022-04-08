import React, { FC } from 'react';
import Card from '../Card/Card';
import WeekCalendar from '../WeekCalendar/WeekCalendar';
import './WeekView.css';
import Todo from '../../pojo/Todo';
import TodoContainer from '../TodoContainer/TodoContainer';

interface WeekViewProps {
  todos: Todo[]
}

const WeekView: FC<WeekViewProps> = (props) => {
  let todos: Todo[] = props.todos;
  console.log(todos);
  let todosComponent = todos.map((todo, index) => {
    <TodoContainer todo={todo}></TodoContainer>
  });
  console.log(todosComponent);
  return (
    <>
      <div className="WeekView" data-testid="WeekView">
        <WeekCalendar className=''></WeekCalendar>
        <Card className='list-todos'>
          {todosComponent.length == 0 && (<div className='no-todos-present'>No todos present</div>)}
          {todosComponent.length > 0 && (todosComponent)}
        </Card>
      </div>
    </>
  );
}

export default WeekView;
