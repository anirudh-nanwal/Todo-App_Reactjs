import React, { useEffect, useState } from 'react';
import './App.css';
import ListView from './components/ListView/ListView';
import QuickLaunch from './components/QuickLaunch/QuickLaunch';
import WeekView from './components/WeekView/WeekView';
import { WEEK_VIEW, LIST_VIEW, DEFAULT_MIN_DATE, DEFAULT_MAX_DATE, ASCENDING, PRIORITY, DEFAULT_SORT_SETTINGS, DEFAULT_FILTER_SETTINGS } from './Utility/Constants';
import Todo from './pojo/Todo';
import FilterSettings from './pojo/FilterSettings';
import SortSettings from './pojo/SortSettings';
import { sortTodosByDate } from './Utility/SortFilterTodos';

function App() {
  let todos: Todo[] = [
    new Todo(1, 'Code java', (new Date(2022, 4, 4)).getTime(), PRIORITY.LOW),
    new Todo(2, 'Code java', (new Date(2022, 4, 3)).getTime(), PRIORITY.MEDIUM),
    new Todo(3, 'Code java', (new Date(2022, 4, 4)).getTime(), PRIORITY.HIGH),
    new Todo(4, 'Code java', (new Date(2022, 4, 5)).getTime(), PRIORITY.HIGH),
    new Todo(5, 'Code java', (new Date(2022, 4, 1)).getTime(), PRIORITY.MEDIUM),
    new Todo(6, 'Code java', (new Date(2022, 4, 7)).getTime(), PRIORITY.LOW),
    new Todo(7, 'Code java', (new Date(2022, 4, 9)).getTime(), PRIORITY.HIGH),
    new Todo(8, 'Code java', (new Date(2022, 4, 8)).getTime(), PRIORITY.HIGH),
    new Todo(9, 'Code java', (new Date(2022, 4, 6)).getTime(), PRIORITY.LOW),
    new Todo(10, 'Code java', (new Date(2022, 4, 24)).getTime(), PRIORITY.LOW),
    new Todo(11, 'Code java', (new Date(2022, 4, 12)).getTime(), PRIORITY.LOW),
    new Todo(12, 'Code java', (new Date(2022, 5, 4)).getTime(), PRIORITY.MEDIUM),
    new Todo(13, 'Code java', (new Date(2022, 5, 4)).getTime(), PRIORITY.LOW),
    new Todo(14, 'Code java', (new Date(2022, 3, 28)).getTime(), PRIORITY.HIGH),
    new Todo(15, 'Code java', (new Date(2022, 3, 30)).getTime(), PRIORITY.LOW),
    new Todo(16, 'Code java', (new Date(2022, 3, 25)).getTime(), PRIORITY.HIGH),
    new Todo(17, 'Code java', (new Date(2022, 3, 21)).getTime(), PRIORITY.HIGH),
    new Todo(18, 'Code java', (new Date(2022, 3, 3)).getTime(), PRIORITY.MEDIUM),
    new Todo(19, 'Code java', (new Date(2022, 5, 1)).getTime(), PRIORITY.HIGH)
  ];


  const [view, setView] = useState(WEEK_VIEW);
  const [showAddEditTmpl, setAddEditFlag] = useState({
    showAddTmpl: false,
    showEditTmpl: false
  })
  const [filterSettings, updateFilterSettings] = useState({ ...DEFAULT_FILTER_SETTINGS });
  const [sortSettings, updateSortSettings] = useState({ ...DEFAULT_SORT_SETTINGS });

  sortTodosByDate(todos, ASCENDING);

  const [todoList, updateTodoList] = useState(todos);

  useEffect(() => {
    onAddClickHandler(false);
  }, [todoList]);

  useEffect(() => {
    if (view === LIST_VIEW) {
      updateFilterSettings(new FilterSettings(DEFAULT_MIN_DATE.getTime(), DEFAULT_MAX_DATE.getTime()));
    } else if (view === WEEK_VIEW) {
      let startDate: number = (new Date().getWeekStartDate().setTimeToZero()).getTime();
      let endDate: number = (new Date().getWeekEndDate().setTimeToZero()).getTime();
      updateFilterSettings(new FilterSettings(startDate, endDate));
    }
    updateSortSettings(new SortSettings(true, ASCENDING, false, ASCENDING));
  }, [view]);

  const udpateViewHandler = (viewName: string): void => {
    setView(viewName);
  };

  const onAddClickHandler = (show: boolean): void => {
    setAddEditFlag((prevState) => {
      return { ...prevState, showAddTmpl: show };
    });
  }

  const addTodoHandler: Function = (newTodo: Todo): void => {
    let noOftodos: number = todoList.length;
    let sumIds: number = noOftodos * (noOftodos + 1) / 2;
    let actualSumIds: number = 0;

    for (let todo of todoList) {
      actualSumIds = actualSumIds + todo.getId();
    }
    let id: number = sumIds - actualSumIds !== 0 ? sumIds - actualSumIds : todoList.length + 1;
    newTodo.setId(id);
    updateTodoList((prevTodosList) => {
      return sortTodosByDate([...prevTodosList, newTodo]);
    })
  }

  const cancelAddTodoHandler: Function = (): void => {
    setAddEditFlag((prevState) => {
      return { ...prevState, showAddTmpl: false };
    })
  }

  const deleteTodoHandler: Function = (todoId: number): void => {
    let updateTodos: Todo[] = todoList.filter(todo => {
      return todo.getId() !== todoId;
    });
    console.log(updateTodos);
    updateTodoList(updateTodos);
  }

  return (
    <div className='ws-d-flex ws-flex-col ws-fb-100 height-100-percent'>
      <QuickLaunch view={view} onViewChange={udpateViewHandler} onAddClick={onAddClickHandler} showAddEditTmpl={showAddEditTmpl} filterSettings={filterSettings} sortSettings={sortSettings} updateFilterSettings={updateFilterSettings} updateSortSettings={updateSortSettings}></QuickLaunch>
      {view === WEEK_VIEW && (<WeekView todos={todoList} cancelAddTodoHandler={cancelAddTodoHandler} deleteTodoHandler={deleteTodoHandler} showAddEditTmpl={showAddEditTmpl} updateTodoList={updateTodoList} addTodoHandler={addTodoHandler} filterSettings={filterSettings} updateFilterSettings={updateFilterSettings} sortSettings={sortSettings}></WeekView>)}
      {view === LIST_VIEW && (<ListView todos={todoList} cancelAddTodoHandler={cancelAddTodoHandler} deleteTodoHandler={deleteTodoHandler} showAddEditTmpl={showAddEditTmpl} updateTodoList={updateTodoList} addTodoHandler={addTodoHandler} filterSettings={filterSettings} sortSettings={sortSettings}></ListView>)}
    </div>
  );
}

export default App;
