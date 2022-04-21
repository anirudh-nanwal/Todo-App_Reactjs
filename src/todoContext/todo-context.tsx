import React from 'react';
import Todo from '../pojo/Todo';

interface AppContextInterface {
    todo: Todo[]
}

const TodoContext: React.Context<AppContextInterface> = React.createContext<AppContextInterface>({
    todo: []
});

export default TodoContext;