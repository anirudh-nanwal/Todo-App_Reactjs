import FilterSettings from "../pojo/FilterSettings";
import Todo from "../pojo/Todo";
import { ASCENDING, PRIORITY } from "./Constants";

export const sortTodosByDate: Function = (listOfTodos: Todo[], sortType: string): Todo[] => {
    listOfTodos.sort((a: Todo, b: Todo) => {
        if (sortType === ASCENDING) return a.getCompleteBy() - b.getCompleteBy();
        return b.getCompleteBy() - a.getCompleteBy();
    });
    return listOfTodos;
}

export const sortTodosByPriority: Function = (listOfTodos: Todo[], sortType: string): Todo[] => {
    listOfTodos.sort((a: Todo, b: Todo) => {
        if (sortType === ASCENDING) return a.getPriority().valueOf() - b.getPriority().valueOf();
        return b.getPriority().valueOf() - a.getPriority().valueOf();
    });
    return listOfTodos;
}

export const filterTodos: Function = (listOfTodos: Todo[], filterSettings: FilterSettings): Todo[] => {
    let startDate: number = filterSettings.startDate;
    let endDate: number = filterSettings.endDate;
    let priority: PRIORITY[] = filterSettings.priority;
    let filteredtodos: Todo[] = listOfTodos.filter((todo) => {
        return (todo.getCompleteBy() <= endDate && todo.getCompleteBy() >= startDate)
            && priority.includes(todo.getPriority());
    });

    return filteredtodos;
}