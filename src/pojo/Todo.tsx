class Todo {
    private id: number;
    private title: string;
    private completeBy: number;

    constructor(id: number, title: string, completeBy: number) {
        this.id = id;
        this.title = title;
        this.completeBy = completeBy;
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
}

export default Todo;