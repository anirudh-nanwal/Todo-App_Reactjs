class SortSettings {
    dateSortFlag: boolean = false;
    dateSort: string | undefined;
    prioritySortFlag: boolean = false;
    prioritySort: string | undefined;

    constructor(dateSortFlag: boolean, dateSort: string | undefined, prioritySortFlag: boolean, prioritySort: string | undefined) {
        this.dateSortFlag = dateSortFlag;
        this.prioritySortFlag = prioritySortFlag;
        if (dateSort !== undefined) {
            this.dateSort = dateSort;
        }
        else if (prioritySortFlag !== undefined) {
            this.prioritySort = prioritySort;
        }
    }
}

export default SortSettings;