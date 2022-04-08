import React, { useState } from 'react';
import './App.css';
import ListView from './components/ListView/ListView';
import QuickLaunch from './components/QuickLaunch/QuickLaunch';
import WeekView from './components/WeekView/WeekView';
import { WEEK_VIEW, LIST_VIEW } from './pojo/Constants';
import Todo from './pojo/Todo';

function App() {
  let todos: Todo[] = [
    new Todo(1, 'Code java', (new Date()).getTime()),
    new Todo(2, 'Code java', (new Date()).getTime()),
    new Todo(3, 'Code java', (new Date()).getTime()),
    new Todo(4, 'Code java', (new Date()).getTime()),
    new Todo(5, 'Code java', (new Date()).getTime()),
    new Todo(6, 'Code java', (new Date()).getTime()),
    new Todo(7, 'Code java', (new Date()).getTime()),
    new Todo(8, 'Code java', (new Date()).getTime())
  ];

  const [view, setView] = useState(WEEK_VIEW);

  const udpateViewHandler = (viewName: string): void => {
    setView(viewName);
    console.log(viewName);
  };
  return (
    <div className='ws-d-flex ws-flex-col ws-fb-100'>
      <QuickLaunch onViewChange={udpateViewHandler}></QuickLaunch>
      {view === WEEK_VIEW && (<WeekView todos={todos}></WeekView>)}
      {view === LIST_VIEW && (<ListView todos={todos}></ListView>)}
    </div>
  );
}

export default App;
