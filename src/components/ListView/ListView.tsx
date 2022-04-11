import React, { FC } from 'react';
import './ListView.css';
import Card from '../Card/Card';
import Todo from '../../pojo/Todo';
import TodoContainer from '../TodoContainer/TodoContainer';
import FilterSettings from '../../pojo/FilterSettings';
import SortSettings from '../../pojo/SortSettings';
import { PRIORITY } from '../../Utility/Constants';

interface ListViewProps {
  todos: Todo[],
  showAddEditTmpl: {
    showAddTmpl: boolean,
    showEditTmpl: boolean
  },
  addTodoHandler: Function,
  updateTodoList: Function,
  filterSettings: FilterSettings,
  sortSettings: SortSettings
}

const ListView: FC<ListViewProps> = (props) => {
  const todos: Todo[] = props.todos;
  const showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean } = props.showAddEditTmpl;
  const addTodoHandler: Function = props.addTodoHandler;
  let todosComponent: any[] = [];
  for (let todo of todos) {
    let classes: string = 'low-priority';
    if (todo.getPriority() === PRIORITY.LOW) classes = "low-priority";
    else if (todo.getPriority() === PRIORITY.MEDIUM) classes = 'medium-priority';
    else if (todo.getPriority() === PRIORITY.HIGH) classes = 'high-priority';
    todosComponent.push(<TodoContainer className={classes} todo={todo} showAddEditTmpl={showAddEditTmpl} key={todo.getId()}></TodoContainer>);
  }
  return (
    <>
      <div className="ListView" data-testid="ListView">
        <Card className='list-todos'>
          {showAddEditTmpl.showAddTmpl && <TodoContainer className='low-priority' showAddEditTmpl={showAddEditTmpl} addTodoHandler={addTodoHandler}></TodoContainer>}
          {todosComponent.length === 0 && (<div className='no-todos-present'>No todos present</div>)}
          {todosComponent.length > 0 && (todosComponent)}
        </Card>
      </div>
    </>
  );
}

export default ListView;
