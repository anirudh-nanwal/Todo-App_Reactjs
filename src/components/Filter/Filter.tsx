import React, { FC } from 'react';
import Card from '../Card/Card';
import './Filter.css';
import { DEFAULT_MAX_DATE, DEFAULT_MIN_DATE } from '../../Utility/Constants';

interface FilterProps {
  className: string,
  onMouseOver: Function,
  onMouseLeave: Function
}

const Filter: FC<FilterProps> = (props) => {
  const classes: string = 'Filter ' + props.className;
  const defaultMinDate: string = DEFAULT_MIN_DATE.getFormattedDate();
  const defaultMaxDate: string = DEFAULT_MAX_DATE.getFormattedDate();
  const showFilter = props.onMouseOver;
  const hideFilter = props.onMouseLeave;

  return (
    <div className={classes} onMouseOver={() => { showFilter() }} onMouseLeave={() => { hideFilter() }}>
      <Card className='filter-card'>
        <div className='label-container ws-fb-20'>
          <label htmlFor='dateRange' className='label'>Date Range</label>
          <div className='date-range' id='dateRange'>
            <input type="date" className='from-date' defaultValue={defaultMinDate} /><span className='ws-p-lr-10 ws-d-flex align-items-center'>-</span><input type="date" className='to-date' defaultValue={defaultMaxDate} />
          </div>
        </div>
        <div className='label-container ws-fb-20'>
          <label htmlFor="priority" className='label'>Priority</label>
          <div className="priority" id="priority">
            <input type="checkbox" className='priority_1' id='priority_1' />
            <label htmlFor="priority_1" className='label_1'>High</label>
            <input type="checkbox" className='priority_2' id='priority_2' />
            <label htmlFor="priority_2" className='label_2'>Medium</label>
            <input type="checkbox" className='priority_3' id='priority_3' />
            <label htmlFor="priority_3" className='label_3'>Low</label>
          </div>
        </div>
        <div className="footer-actions ws-fb-60">
          <button className="btn btn-tertiary">Reset</button>
          <button className="btn btn-primary ws-m-r-20">Apply</button>
        </div>
      </Card>
    </div>
  );
};

export default Filter;
