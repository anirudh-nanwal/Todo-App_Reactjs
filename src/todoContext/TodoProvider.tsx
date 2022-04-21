import { FC } from "react";
import TodoContext from "./todo-context";

interface TodoProviderProps {
}

const TodoProvider: FC<TodoProviderProps> = (props) => {
    const todoContext = {
        todo: []
    }
    return (<TodoContext.Provider value={todoContext}>
        {props.children}
    </TodoContext.Provider>);
}

export default TodoProvider;