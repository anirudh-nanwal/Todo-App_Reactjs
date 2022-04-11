class SortSettings {
    dateSortFlag: boolean = true;
    dateSort: string;
    prioritySortFlag: boolean = false;
    prioritySort: string;

    constructor(dateSortFlag: boolean, dateSort: string, prioritySortFlag: boolean, prioritySort: string) {
        this.dateSortFlag = dateSortFlag;
        this.prioritySortFlag = prioritySortFlag;
        this.dateSort = dateSort;
        this.prioritySort = prioritySort;
    }
}

export default SortSettings;