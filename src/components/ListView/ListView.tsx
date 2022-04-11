import React, { FC } from 'react';
import './ListView.css';
import Card from '../Card/Card';
import Todo from '../../pojo/Todo';
import TodoContainer from '../TodoContainer/TodoContainer';
import FilterSettings from '../../pojo/FilterSettings';
import SortSettings from '../../pojo/SortSettings';
import { PRIORITY } from '../../Utility/Constants';
import { sortTodosByDate, sortTodosByPriority } from '../../Utility/SortFilterTodos';

interface ListViewProps {
  todos: Todo[],
  showAddEditTmpl: {
    showAddTmpl: boolean,
    showEditTmpl: boolean
  },
  addTodoHandler: Function,
  updateTodoList: Function,
  filterSettings: FilterSettings,
  sortSettings: SortSettings,
  deleteTodoHandler?: Function,
  cancelAddTodoHandler?: Function
}

const ListView: FC<ListViewProps> = (props) => {
  const todos: Todo[] = props.todos;
  const showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean } = props.showAddEditTmpl;
  const addTodoHandler: Function = props.addTodoHandler;
  const filterSettings: FilterSettings = props.filterSettings;
  const sortSettings: SortSettings = props.sortSettings;
  const deleteTodoHandler: Function = props.deleteTodoHandler !== undefined ? props.deleteTodoHandler : () => { return };
  const cancelAddTodoHandler: Function = props.cancelAddTodoHandler !== undefined ? props.cancelAddTodoHandler : () => { return };
  let todosComponent: any[] = [];
  if (sortSettings.dateSortFlag) sortTodosByDate(todos, sortSettings.dateSort);
  else if (sortSettings.prioritySortFlag) sortTodosByPriority(todos, sortSettings.prioritySort);
  for (let todo of todos) {
    if (filterSettings.startDate > todo.getCompleteBy() || filterSettings.endDate < todo.getCompleteBy() || !filterSettings.priority.includes(todo.getPriority())) continue;
    let classes: string = 'low-priority';
    if (todo.getPriority() === PRIORITY.LOW) classes = "low-priority";
    else if (todo.getPriority() === PRIORITY.MEDIUM) classes = 'medium-priority';
    else if (todo.getPriority() === PRIORITY.HIGH) classes = 'high-priority';
    todosComponent.push(<TodoContainer className={classes} todo={todo} showAddEditTmpl={showAddEditTmpl} key={todo.getId()} deleteTodoHandler={deleteTodoHandler}></TodoContainer>);
  }
  return (
    <>
      <div className="ListView" data-testid="ListView">
        <Card className='list-todos'>
          {showAddEditTmpl.showAddTmpl && <TodoContainer cancelAddTodoHandler={cancelAddTodoHandler} className='low-priority' showAddEditTmpl={showAddEditTmpl} addTodoHandler={addTodoHandler}></TodoContainer>}
          {todosComponent.length === 0 && (<div className='no-todos-present'>No todos present</div>)}
          {todosComponent.length > 0 && (todosComponent)}
        </Card>
      </div>
    </>
  );
}

export default ListView;
