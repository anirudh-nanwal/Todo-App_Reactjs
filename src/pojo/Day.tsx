class Day {
    dayNo: number;
    dayShort: string;
    dayFull: string;
    date: number;

    constructor(dayNo: number, dayShort: string, dayFull: string, date: number) {
        this.dayNo = dayNo;
        this.dayShort = dayShort;
        this.dayFull = dayFull;
        this.date = date;
    }

}

export default Day;