import React, { useEffect, useState } from 'react';
import './App.css';
import ListView from './components/ListView/ListView';
import QuickLaunch from './components/QuickLaunch/QuickLaunch';
import WeekView from './components/WeekView/WeekView';
import { WEEK_VIEW, LIST_VIEW } from './Utility/Constants';
import Todo from './pojo/Todo';

function App() {
  let todos: Todo[] = [
    new Todo(1, 'Code java', (new Date(2022, 4, 4)).getTime()),
    new Todo(2, 'Code java', (new Date(2022, 4, 3)).getTime()),
    new Todo(3, 'Code java', (new Date(2022, 4, 4)).getTime()),
    new Todo(4, 'Code java', (new Date(2022, 4, 5)).getTime()),
    new Todo(5, 'Code java', (new Date(2022, 4, 1)).getTime()),
    new Todo(6, 'Code java', (new Date(2022, 4, 7)).getTime()),
    new Todo(7, 'Code java', (new Date(2022, 4, 9)).getTime()),
    new Todo(8, 'Code java', (new Date(2022, 4, 8)).getTime()),
    new Todo(9, 'Code java', (new Date(2022, 4, 6)).getTime()),
    new Todo(10, 'Code java', (new Date(2022, 4, 24)).getTime()),
    new Todo(11, 'Code java', (new Date(2022, 4, 12)).getTime()),
    new Todo(12, 'Code java', (new Date(2022, 5, 4)).getTime()),
    new Todo(13, 'Code java', (new Date(2022, 5, 4)).getTime()),
    new Todo(14, 'Code java', (new Date(2022, 3, 28)).getTime()),
    new Todo(15, 'Code java', (new Date(2022, 3, 30)).getTime()),
    new Todo(16, 'Code java', (new Date(2022, 3, 25)).getTime()),
    new Todo(17, 'Code java', (new Date(2022, 3, 21)).getTime()),
    new Todo(18, 'Code java', (new Date(2022, 3, 3)).getTime()),
    new Todo(19, 'Code java', (new Date(2022, 5, 1)).getTime())
  ];


  const [view, setView] = useState(WEEK_VIEW);
  const [showAddEditTmpl, setAddEditFlag] = useState({
    showAddTmpl: false,
    showEditTmpl: false
  })
  todos.sort((a: Todo, b: Todo) => {
    return a.getCompleteBy() - b.getCompleteBy();
  })
  const [todoList, updateTodoList] = useState(todos);

  useEffect(() => {
    onAddClickHandler(false);
  }, [todoList]);

  const udpateViewHandler = (viewName: string): void => {
    setView(viewName);
  };

  const onAddClickHandler = (show: boolean): void => {
    setAddEditFlag((prevState) => {
      return { ...prevState, showAddTmpl: show };
    });
  }


  const addTodoHandler = (todo: Todo): void => {
    let id: number = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].getId() !== i) {
        id = i;
        break;
      }
    }
    todo.setId(id);
    todos.push(todo);
  }

  return (
    <div className='ws-d-flex ws-flex-col ws-fb-100 height-100-percent'>
      <QuickLaunch onViewChange={udpateViewHandler} onAddClick={onAddClickHandler} showAddEditTmpl={showAddEditTmpl}></QuickLaunch>
      {view === WEEK_VIEW && (<WeekView todos={todoList} showAddEditTmpl={showAddEditTmpl} updateTodoList={updateTodoList} addTodoHandler={addTodoHandler}></WeekView>)}
      {view === LIST_VIEW && (<ListView todos={todoList} showAddEditTmpl={showAddEditTmpl} updateTodoList={updateTodoList} addTodoHandler={addTodoHandler}></ListView>)}
    </div>
  );
}

export default App;
