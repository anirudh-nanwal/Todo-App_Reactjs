import React, { FC } from 'react';
import SortSettings from '../../pojo/SortSettings';
import { ASCENDING, DATE_SORT, DEFAULT_SORT_SETTINGS, DESCENDING, PRIORITY_SORT } from '../../Utility/Constants';
import Card from '../Card/Card';
import './Sort.css';

interface SortProps {
  className: string,
  sortSettings: SortSettings,
  updateSortSettings: Function
}

const Sort: FC<SortProps> = (props) => {
  const classes = 'Sort ' + props.className;
  const sortSettings: SortSettings = props.sortSettings;
  const updateSortSettings: Function = props.updateSortSettings;
  const changeSortSettings: Function = (field: string, sortType: string): void => {
    if (field === DATE_SORT) {
      sortSettings.dateSortFlag = true;
      sortSettings.prioritySortFlag = false;
      sortSettings.dateSort = sortType;
    } else if (field === PRIORITY_SORT) {
      sortSettings.dateSortFlag = false
      sortSettings.prioritySortFlag = true;
      sortSettings.prioritySort = sortType;
    }
    applySortSettings();
  }
  const onResetHandler: Function = (): void => {
    sortSettings.dateSort = DEFAULT_SORT_SETTINGS.dateSort;
    sortSettings.dateSortFlag = DEFAULT_SORT_SETTINGS.dateSortFlag;
    sortSettings.prioritySort = DEFAULT_SORT_SETTINGS.prioritySort;
    sortSettings.prioritySortFlag = DEFAULT_SORT_SETTINGS.prioritySortFlag;
    applySortSettings();
  }
  const applySortSettings: Function = (): void => {
    updateSortSettings(new SortSettings(sortSettings.dateSortFlag, sortSettings.dateSort, sortSettings.prioritySortFlag, sortSettings.prioritySort));
  }
  return (
    <div className={classes} data-testid="Sort">
      <Card className='sort-card'>
        <div className='label-container ws-fb-20'>
          <label htmlFor='dateRange' className='label'>Date Range</label>
          <div className='sort-radio' id='dateRange'>
            <input type="radio" className='sort' id='date-range_1' name='date-sort' checked={sortSettings.dateSortFlag && sortSettings.dateSort === ASCENDING} onChange={() => { changeSortSettings(DATE_SORT, ASCENDING) }} />
            <label htmlFor="date-range" className='label_1' onClick={() => { changeSortSettings(DATE_SORT, ASCENDING) }}>Ascending</label>
            <input type="radio" className='sort' id='date-range_2' name='date-sort' checked={sortSettings.dateSortFlag && sortSettings.dateSort === DESCENDING} onChange={() => { changeSortSettings(DATE_SORT, DESCENDING) }} />
            <label htmlFor="date-range" className='label_2' onClick={() => { changeSortSettings(DATE_SORT, DESCENDING) }}>Descending</label>
          </div>
        </div>
        <div className='label-container ws-fb-20'>
          <label htmlFor="priority" className='label'>Priority</label>
          <div className="sort-radio" id="priority">
            <input type="radio" className='sort' id='priority_1' name='priority-sort' checked={sortSettings.prioritySortFlag && sortSettings.prioritySort === ASCENDING} onChange={() => { changeSortSettings(PRIORITY_SORT, ASCENDING) }} />
            <label htmlFor="priority_1" className='label_1' onClick={() => { changeSortSettings(PRIORITY_SORT, ASCENDING) }}>Ascending</label>
            <input type="radio" className='sort' id='priority_2' name='priority-sort' checked={sortSettings.prioritySortFlag && sortSettings.prioritySort === DESCENDING} onChange={() => { changeSortSettings(PRIORITY_SORT, DESCENDING) }} />
            <label htmlFor="priority_2" className='label_2' onClick={() => { changeSortSettings(PRIORITY_SORT, DESCENDING) }}>Descending</label>
          </div>
        </div>
        <div className="footer-actions ws-fb-60">
          <button className="btn btn-tertiary" onClick={() => { onResetHandler() }}>Reset</button>
          {/* <button className="btn btn-primary ws-m-r-20" onClick={applySortSettings}>Apply</button> */}
        </div>
      </Card>
    </div>
  );
};

export default Sort;
