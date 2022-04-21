import { PRIORITY } from "../Utility/Constants";

class Todo {
    private id: number;
    private title: string;
    private completeBy: number;
    private priority: PRIORITY = PRIORITY.LOW;

    constructor(id: number, title: string, completeBy: number, priority?: PRIORITY) {
        this.id = id;
        this.title = title;
        this.completeBy = completeBy;
        if (priority !== undefined) this.priority = priority;
    }

    public getId = (): number => {
        return this.id;
    }
    public getTitle = (): string => {
        return this.title;
    }
    public getCompleteBy = (): number => {
        return this.completeBy;
    }

    public setId = (id: number): void => {
        this.id = id;
    }
    public setTitle = (title: string): void => {
        this.title = title;
    }
    public setCompleteBy = (completeBy: number): void => {
        this.completeBy = completeBy;
    }
    public getPriority = (): PRIORITY => {
        return this.priority;
    }
    public setPriority = (priority: PRIORITY): void => {
        this.priority = priority;
    }
}

export default Todo;