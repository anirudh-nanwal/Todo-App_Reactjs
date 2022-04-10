import React, { FC } from 'react';
import './ListView.css';
import Card from '../Card/Card';
import Todo from '../../pojo/Todo';
import TodoContainer from '../TodoContainer/TodoContainer';

interface ListViewProps {
  todos: Todo[],
  showAddEditTmpl: {
    showAddTmpl: boolean,
    showEditTmpl: boolean
  },
  addTodoHandler: Function,
  updateTodoList: Function
}

const ListView: FC<ListViewProps> = (props) => {
  const todos: Todo[] = props.todos;
  const showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean } = props.showAddEditTmpl;
  const addTodoHandler: Function = props.addTodoHandler;
  let todosComponent: any[] = [];
  for (let todo of todos) {
    todosComponent.push(<TodoContainer todo={todo} showAddEditTmpl={showAddEditTmpl} key={todo.getId()}></TodoContainer>);
  }
  return (
    <>
      <div className="ListView" data-testid="ListView">
        <Card className='list-todos'>
          {showAddEditTmpl.showAddTmpl && <TodoContainer showAddEditTmpl={showAddEditTmpl} addTodoHandler={addTodoHandler}></TodoContainer>}
          {todosComponent.length === 0 && (<div className='no-todos-present'>No todos present</div>)}
          {todosComponent.length > 0 && (todosComponent)}
        </Card>
      </div>
    </>
  );
}

export default ListView;
