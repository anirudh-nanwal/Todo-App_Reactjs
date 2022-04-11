/* eslint-disable no-extend-native */
import Day from '../pojo/Day';
import { DATE_FULL, DATE_SHORT } from './Constants';

declare global {
    interface Date {
        daysMap: Array<Day>,
        dayNumberVsDayMap: Array<{ dayShort: string, dayFull: string }>,
        monthMap: Array<{ monthShort: string, monthFull: string }>,
        convertDateToDateSkey: (dateLength?: string | undefined) => string,
        convertDateSkeyToDate: (dateSkey: string) => Date,
        setTimeToZero: () => Date,
        getCurrentWeek: () => Array<Day>,
        getNextWeek: () => Array<Day>,
        getPreviousWeek: () => Array<Day>,
        getWeekStartDate: (date?: Date) => Date,
        getWeekEndDate: (date?: Date) => Date,
        getFormattedDate: (date?: Date | undefined) => string
    }
}

Date.prototype.dayNumberVsDayMap = [
    { dayShort: 'Sun', dayFull: 'Sunday' },
    { dayShort: 'Mon', dayFull: 'Monday' },
    { dayShort: 'Tue', dayFull: 'Tuesday' },
    { dayShort: 'Wed', dayFull: 'Wednesday' },
    { dayShort: 'Thr', dayFull: 'Thursday' },
    { dayShort: 'Fri', dayFull: 'Friday' },
    { dayShort: 'Sat', dayFull: 'Saturday' }
]

Date.prototype.daysMap = [
    new Day(0, 'Sun', 'Sunday', new Date(2022, 21, 4).getTime()),
    new Day(1, 'Mon', 'Monday', new Date(2022, 21, 4).getTime()),
    new Day(2, 'Tue', 'Tuesday', new Date(2022, 21, 4).getTime()),
    new Day(3, 'Wed', 'Wednesday', new Date(2022, 21, 4).getTime()),
    new Day(4, 'Thr', 'Thursday', new Date(2022, 21, 4).getTime()),
    new Day(5, 'Fri', 'Friday', new Date(2022, 21, 4).getTime()),
    new Day(6, 'Sat', 'Saturday', new Date(2022, 21, 4).getTime())
];

Date.prototype.monthMap = [
    { monthShort: 'Jan', monthFull: 'January' },
    { monthShort: 'Feb', monthFull: 'February' },
    { monthShort: 'Mar', monthFull: 'March' },
    { monthShort: 'Apr', monthFull: 'April' },
    { monthShort: 'May', monthFull: 'May' },
    { monthShort: 'Jun', monthFull: 'June' },
    { monthShort: 'Jul', monthFull: 'July' },
    { monthShort: 'Aug', monthFull: 'August' },
    { monthShort: 'Sep', monthFull: 'September' },
    { monthShort: 'Oct', monthFull: 'October' },
    { monthShort: 'Nov', monthFull: 'November' },
    { monthShort: 'Dec', monthFull: 'December' }
];

Date.prototype.convertDateToDateSkey = function (dateLength: string | undefined) {
    let dateSkey: string = '';
    if (dateLength === undefined || dateLength === DATE_SHORT)
        dateSkey = this.getDate() + ' ' + this.monthMap[this.getMonth()].monthShort + ', ' + this.getFullYear();
    else if (dateLength === DATE_FULL)
        dateSkey = this.getDate() + ' ' + this.monthMap[this.getMonth()].monthFull + ', ' + this.getFullYear();
    return dateSkey;
};

Date.prototype.convertDateSkeyToDate = function (dateSkey: string) {
    let monthNo: number = 0;
    let dateArr: string[] = dateSkey.split(' ');
    let date: number = Number.parseInt(dateArr[0]);
    let year: number = Number.parseInt(dateArr[2]);
    let monthStr: string = dateArr[1].split(',')[0];
    for (let month = 0; month <= 11; month++) {
        if (this.monthMap[month].monthShort === monthStr || this.monthMap[month].monthFull === monthStr) {
            monthNo = month;
            break;
        }
    }
    const newDate: Date = new Date(year, monthNo, date);
    return newDate;
};

Date.prototype.setTimeToZero = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
};

Date.prototype.getCurrentWeek = function () {
    const weekStartDate: Date = this.getWeekStartDate(new Date());
    this.daysMap = [];
    for (let i = 0; i <= 6; i++) {
        let date: Date = new Date(weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay() + i));
        let day: Day = new Day(i, this.dayNumberVsDayMap[i].dayShort, this.dayNumberVsDayMap[i].dayFull, date.getTime());
        this.daysMap.push(day);
    }

    return this.daysMap;
};

Date.prototype.getNextWeek = function () {
    const weekStartDate: Date = this;
    this.daysMap = [];
    for (let i = 0; i <= 6; i++) {
        let date: Date = new Date(weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay() + i));
        let day: Day = new Day(i, this.dayNumberVsDayMap[i].dayShort, this.dayNumberVsDayMap[i].dayFull, date.getTime());
        this.daysMap.push(day);
    }

    return this.daysMap;
};

Date.prototype.getPreviousWeek = function () {

    return [];
};

Date.prototype.getWeekStartDate = function (date: Date | undefined) {
    let weekStartDate: Date;
    if (date !== undefined) {
        weekStartDate = new Date(date.setDate(date.getDate() - date.getDay()));
        weekStartDate.setTimeToZero();
    } else {
        weekStartDate = new Date(this.setDate(this.getDate() - this.getDay()));
        weekStartDate.setTimeToZero();
    }
    return weekStartDate;
};

Date.prototype.getWeekEndDate = function (date: Date | undefined) {
    let weekEndDate: Date;
    if (date !== undefined) {
        weekEndDate = new Date(date.setDate(date.getDate() - date.getDay()));
        weekEndDate.setTimeToZero();
    } else {
        weekEndDate = new Date(this.setDate(this.getDate() - this.getDay()));
        weekEndDate.setTimeToZero();
    }
    return weekEndDate;
};

Date.prototype.getFormattedDate = function (date: Date | undefined) {
    if (date === undefined) date = this;
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    return date.toISOString().substring(0, 10);
}

export { };