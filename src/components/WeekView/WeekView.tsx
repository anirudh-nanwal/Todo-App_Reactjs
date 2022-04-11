import React, { FC, useState, useEffect } from 'react';
import Card from '../Card/Card';
import WeekCalendar from '../WeekCalendar/WeekCalendar';
import './WeekView.css';
import Todo from '../../pojo/Todo';
import TodoContainer from '../TodoContainer/TodoContainer';
import Day from '../../pojo/Day';
import FilterSettings from '../../pojo/FilterSettings';
import SortSettings from '../../pojo/SortSettings';
import { CURR_WEEK_DATE, PRIORITY } from '../../Utility/Constants';
import { sortTodosByDate, sortTodosByPriority } from '../../Utility/SortFilterTodos';
import { filterTodos } from '../../Utility/SortFilterTodos';

interface WeekViewProps {
  todos: Todo[],
  showAddEditTmpl: {
    showAddTmpl: boolean,
    showEditTmpl: boolean
  },
  addTodoHandler: Function,
  updateTodoList: Function,
  filterSettings: FilterSettings,
  sortSettings: SortSettings,
  updateFilterSettings: Function,
  deleteTodoHandler: Function,
  cancelAddTodoHandler: Function
}

const WeekView: FC<WeekViewProps> = (props) => {
  let todos: Todo[] = props.todos;
  const addTodoHandler: Function = props.addTodoHandler;
  const date: Date = new Date();
  let currWeek: Day[] = date.getCurrentWeek();
  const [weekDate, setWeekDate] = useState(currWeek);
  const [currWeekTodos, updateCurrWeekTodos] = useState(new Array<Todo>());
  const sortSettings: SortSettings = props.sortSettings;
  const filterSettings: FilterSettings = props.filterSettings;
  const updateFilterSettings: Function = props.updateFilterSettings;
  const deleteTodoHandler: Function = props.deleteTodoHandler;
  const cancelAddTodoHandler: Function = props.cancelAddTodoHandler !== undefined ? props.cancelAddTodoHandler : () => { return };

  useEffect(() => {
    updateFilterSettings(new FilterSettings(weekDate[0].date, weekDate[6].date, filterSettings.priority));
    updateSelectedWeekTodos();
  }, [todos, weekDate]);

  useEffect(() => { updateSelectedWeekTodos() }, [sortSettings, filterSettings]);

  const nextWeekHandler: Function = (): void => {
    const lastWeekEndDate: Date = new Date(weekDate[6].date);
    let nextWeekStartDate: Date = new Date(lastWeekEndDate.setDate(lastWeekEndDate.getDate() + 1));
    currWeek = nextWeekStartDate.getNextWeek();
    CURR_WEEK_DATE.startDate = new Date(currWeek[0].date);
    CURR_WEEK_DATE.endDate = new Date(currWeek[6].date);
    setWeekDate(currWeek);
    updateSelectedWeekTodos(currWeek);
  }

  const prevWeekHandler: Function = (): void => {
    const currWeekStartDate: Date = new Date(weekDate[0].date);
    let lastWeekStartDate: Date = new Date(currWeekStartDate.setDate(currWeekStartDate.getDate() - 7));
    currWeek = lastWeekStartDate.getNextWeek();
    CURR_WEEK_DATE.startDate = new Date(currWeek[0].date);
    CURR_WEEK_DATE.endDate = new Date(currWeek[6].date);
    setWeekDate(currWeek);
    updateSelectedWeekTodos(currWeek);
  }

  let todosComponent = [];
  const showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean } = props.showAddEditTmpl;

  const updateSelectedWeekTodos: Function = (): void => {
    let newListOfTodo: Todo[] = todos.filter((todo) => {
      return todo.getCompleteBy() <= weekDate[6].date && todo.getCompleteBy() >= weekDate[0].date;
    });
    newListOfTodo = filterTodos(newListOfTodo, filterSettings);
    if (sortSettings.dateSortFlag) {
      newListOfTodo = sortTodosByDate(newListOfTodo, sortSettings.dateSort);
    } else if (sortSettings.prioritySortFlag) {
      newListOfTodo = sortTodosByPriority(newListOfTodo, sortSettings.prioritySort);
    }
    updateCurrWeekTodos(newListOfTodo);
  }
  for (let todo of currWeekTodos) {
    let classes: string = 'low-priority';
    if (todo.getPriority() === PRIORITY.LOW) classes = "low-priority";
    else if (todo.getPriority() === PRIORITY.MEDIUM) classes = 'medium-priority';
    else if (todo.getPriority() === PRIORITY.HIGH) classes = 'high-priority';
    todosComponent.push(<TodoContainer className={classes} todo={todo} key={todo.getId()} showAddEditTmpl={showAddEditTmpl} deleteTodoHandler={deleteTodoHandler}></TodoContainer>);
  }
  return (
    <>
      <div className="WeekView" data-testid="WeekView">
        <WeekCalendar className='' prevWeekHandler={prevWeekHandler} nextWeekHandler={nextWeekHandler} weekDate={weekDate}></WeekCalendar>
        <Card className='list-todos'>
          {showAddEditTmpl.showAddTmpl && <TodoContainer cancelAddTodoHandler={cancelAddTodoHandler} className='low-priority' showAddEditTmpl={showAddEditTmpl} addTodoHandler={addTodoHandler}></TodoContainer>}
          {todosComponent.length === 0 && (<div className='no-todos-present'>No todos present</div>)}
          {todosComponent.length > 0 && (todosComponent)}
        </Card>
      </div>
    </>
  );
}

export default WeekView;
