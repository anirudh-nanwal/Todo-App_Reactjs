import { DEFAULT_MAX_DATE, DEFAULT_MIN_DATE, PRIORITY } from "../Utility/Constants";

class FilterSettings {
    startDate: number = DEFAULT_MIN_DATE.getTime();
    endDate: number = DEFAULT_MAX_DATE.getTime();
    priority: PRIORITY[] = [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH];

    constructor(startDate: number | undefined, endDate: number | undefined, priority?: PRIORITY[]) {
        if (startDate != undefined) this.startDate = startDate;
        if (endDate != undefined) this.endDate = endDate;
        if (priority != undefined) this.priority = priority;
    }
}

export default FilterSettings;