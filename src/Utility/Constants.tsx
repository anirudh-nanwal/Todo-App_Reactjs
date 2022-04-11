import FilterSettings from '../pojo/FilterSettings';
import SortSettings from '../pojo/SortSettings';
import './DateUtils';

export const enum PRIORITY {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}
export const WEEK_VIEW: string = 'week-view';
export const LIST_VIEW: string = 'list-view';
export const NO_TODOS_MSG: string = 'No Todos Present!';
export const BASE_URL: string = '';
export const DEFAULT_MIN_DATE: Date = (new Date(0)).setTimeToZero();
export const DEFAULT_CURR_DATE: Date = (new Date()).setTimeToZero();
export const DEFAULT_MAX_DATE: Date = (new Date(2099, 11, 31)).setTimeToZero();
export const DATE_SHORT: string = 'short';
export const DATE_FULL: string = 'full';
export const ASCENDING: string = 'ascending';
export const DESCENDING: string = 'descending';
export const PRIORITY_SORT: string = 'prioritySort';
export const DATE_SORT: string = 'dateSort';
export const LOW_PRIORITY: string = 'low';
export const MEDIUM_PRIORITY: string = 'medium';
export const HIGH_PRIORITY: string = 'high';
export const DEFAULT_FILTER_SETTINGS: FilterSettings = new FilterSettings(DEFAULT_MIN_DATE.getTime(), DEFAULT_MAX_DATE.getTime());
export const DEFAULT_SORT_SETTINGS: SortSettings = new SortSettings(true, ASCENDING, false, ASCENDING);
export const CURR_WEEK_DATE: { startDate: Date, endDate: Date } = { startDate: DEFAULT_CURR_DATE.getWeekStartDate(), endDate: DEFAULT_CURR_DATE.getWeekEndDate() };