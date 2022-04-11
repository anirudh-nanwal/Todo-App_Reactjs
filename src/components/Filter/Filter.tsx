import React, { FC, useEffect } from 'react';
import Card from '../Card/Card';
import './Filter.css';
import { CURR_WEEK_DATE, DEFAULT_FILTER_SETTINGS, DEFAULT_MAX_DATE, DEFAULT_MIN_DATE, LIST_VIEW, PRIORITY, WEEK_VIEW } from '../../Utility/Constants';
import FilterSettings from '../../pojo/FilterSettings';

interface FilterProps {
  className: string,
  view: string,
  filterSettings: FilterSettings,
  updateFilterSettings: Function
}

const Filter: FC<FilterProps> = (props) => {
  const classes: string = 'Filter ' + props.className;
  const view: string = props.view;
  const defaultMinDate: string = DEFAULT_MIN_DATE.getFormattedDate();
  const defaultMaxDate: string = DEFAULT_MAX_DATE.getFormattedDate();
  const filterSettings: FilterSettings = props.filterSettings;
  const updateFilterSettings: Function = props.updateFilterSettings;
  const changeDateHandler: Function = (event: React.ChangeEvent<HTMLInputElement>, field: string): void => {
    let newDate: Date = new Date(event.target.value);
    newDate.setTimeToZero();
    if (field === 'startDate') {
      filterSettings.startDate = newDate.getTime();
    } else if (field === 'endDate') {
      filterSettings.endDate = newDate.getTime();
    }
    applyFilterSettings();
  }
  const changePriorityHandler: Function = (priority: PRIORITY): void => {
    if (filterSettings.priority.indexOf(priority) > -1) {
      let ind = filterSettings.priority.indexOf(priority);
      filterSettings.priority.splice(ind, 1);
    } else {
      filterSettings.priority.push(priority);
    }
    applyFilterSettings();
  }

  const onResetHandler: Function = (): void => {
    let startDate: number;
    let endDate: number;
    if (view === WEEK_VIEW) {
      startDate = CURR_WEEK_DATE.startDate.getTime();
      endDate = CURR_WEEK_DATE.endDate.getTime();
    } else {
      startDate = DEFAULT_FILTER_SETTINGS.startDate;
      endDate = DEFAULT_FILTER_SETTINGS.endDate;
    }
    filterSettings.startDate = startDate;
    filterSettings.endDate = endDate;
    filterSettings.priority = [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH];
    applyFilterSettings();
  }
  const applyFilterSettings: Function = (): void => {
    updateFilterSettings(new FilterSettings(filterSettings.startDate, filterSettings.endDate, filterSettings.priority));
  }

  return (
    <div className={classes}>
      <Card className='filter-card'>
        <div className='label-container ws-fb-20'>
          <label htmlFor='dateRange' className='label'>Date Range</label>
          <div className='date-range' id='dateRange'>
            <input type="date" className='from-date' value={(new Date(filterSettings.startDate)).getFormattedDate()} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { changeDateHandler(event, 'startDate') }} min={defaultMinDate} max={(new Date(filterSettings.endDate)).getFormattedDate()} />
            <span className='ws-p-lr-10 ws-d-flex align-items-center'>-</span>
            <input type="date" className='to-date' value={(new Date(filterSettings.endDate)).getFormattedDate()} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { changeDateHandler(event, 'endDate') }} min={(new Date(filterSettings.startDate)).getFormattedDate()} max={defaultMaxDate} />
          </div>
        </div>
        <div className='label-container ws-fb-20'>
          <label htmlFor="priority" className='label'>Priority</label>
          <div className="priority" id="priority">
            <input type="checkbox" className='priority_1' id='priority_1' checked={filterSettings.priority.indexOf(PRIORITY.HIGH) > -1} onChange={() => { changePriorityHandler(PRIORITY.HIGH) }} />
            <label htmlFor="priority_1" className='label_1'>High</label>
            <input type="checkbox" className='priority_2' id='priority_2' checked={filterSettings.priority.indexOf(PRIORITY.MEDIUM) > -1} onChange={() => { changePriorityHandler(PRIORITY.MEDIUM) }} />
            <label htmlFor="priority_2" className='label_2'>Medium</label>
            <input type="checkbox" className='priority_3' id='priority_3' checked={filterSettings.priority.indexOf(PRIORITY.LOW) > -1} onChange={() => { changePriorityHandler(PRIORITY.LOW) }} />
            <label htmlFor="priority_3" className='label_3'>Low</label>
          </div>
        </div>
        <div className="footer-actions ws-fb-60">
          <button className="btn btn-tertiary" onClick={() => { onResetHandler() }}>Reset</button>
          {/* <button className="btn btn-primary ws-m-r-20" onClick={applyFilterSettings}>Apply</button> */}
        </div>
      </Card>
    </div>
  );
};

export default Filter;
