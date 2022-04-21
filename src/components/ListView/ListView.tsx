import React, { FC } from 'react';
import './ListView.css';
import Card from '../Card/Card';
import Todo from '../../pojo/Todo';
import TodoContainer from '../TodoContainer/TodoContainer';
import FilterSettings from '../../pojo/FilterSettings';
import SortSettings from '../../pojo/SortSettings';
import { PRIORITY } from '../../Utility/Constants';
import { sortTodosByDate, sortTodosByPriority } from '../../Utility/SortFilterTodos';
import ConfirmBox from '../confirmBox/ConfirmBox';

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
  deleteTodoHandler: Function,
  cancelAddTodoHandler?: Function,
  showConfirmBox: { show: boolean, todoId: number },
  setConfirmBox: Function
}

const ListView: FC<ListViewProps> = (props) => {
  const todos: Todo[] = props.todos;
  const showConfirmBox: { show: boolean, todoId: number } = props.showConfirmBox;
  const setConfirmBox: Function = props.setConfirmBox;
  const updateTodoList: Function = props.updateTodoList;
  const showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean } = props.showAddEditTmpl;
  const addTodoHandler: Function = props.addTodoHandler;
  const filterSettings: FilterSettings = props.filterSettings;
  const sortSettings: SortSettings = props.sortSettings;
  const deleteTodoHandler: Function = props.deleteTodoHandler;
  const cancelAddTodoHandler: Function = props.cancelAddTodoHandler !== undefined ? props.cancelAddTodoHandler : () => { return };
  let todosComponent: any[] = [];

  if (sortSettings.dateSortFlag) {
    sortTodosByDate(todos, sortSettings.dateSort);
  }
  else if (sortSettings.prioritySortFlag) {
    sortTodosByPriority(todos, sortSettings.prioritySort);
  }

  for (let todo of todos) {
    if (filterSettings.startDate > todo.getCompleteBy() || filterSettings.endDate < todo.getCompleteBy() || !filterSettings.priority.includes(todo.getPriority())) continue;
    let classes: string = 'low-priority';
    if (todo.getPriority() === PRIORITY.LOW) classes = "low-priority";
    else if (todo.getPriority() === PRIORITY.MEDIUM) classes = 'medium-priority';
    else if (todo.getPriority() === PRIORITY.HIGH) classes = 'high-priority';
    todosComponent.push(<TodoContainer showConfirmBox={showConfirmBox} setConfirmBox={setConfirmBox} className={classes} todo={todo} showAddEditTmpl={showAddEditTmpl} key={todo.getId()} deleteTodoHandler={deleteTodoHandler}></TodoContainer>);
  }

  const deleteTodo: Function = (todoId: number, confirm: boolean) => {
    if (!confirm) return;
    let updateTodos: Todo[] = todos.filter(todo => {
      return todo.getId() !== todoId;
    });
    updateTodoList(updateTodos);
    setConfirmBox({ show: false, todoId: 0 });
  }

  return (
    <>
      <div className="ListView" data-testid="ListView">
        <Card className='list-todos'>
          {showAddEditTmpl.showAddTmpl && <TodoContainer cancelAddTodoHandler={cancelAddTodoHandler} className='low-priority' showAddEditTmpl={showAddEditTmpl} addTodoHandler={addTodoHandler}></TodoContainer>}
          {todosComponent.length === 0 && (<div className='no-todos-present'>No todos present</div>)}
          {todosComponent.length > 0 && (todosComponent)}
        </Card>
        {showConfirmBox.show && <ConfirmBox deleteTodo={deleteTodo} showConfirmBox={showConfirmBox} setConfirmBox={setConfirmBox}></ConfirmBox>}
      </div>
    </>
  );
}

export default ListView;
