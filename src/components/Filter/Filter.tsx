import React, { FC } from 'react';
import Card from '../Card/Card';
import './Filter.css';

interface FilterProps {
  className: string
}

const Filter: FC<FilterProps> = (props) => {
  const classes = 'Filter ' + props.className;
  return (
    <div className={classes}>
      <Card className='filter-card'>
        <div className='label-container ws-fb-20'>
          <label htmlFor='dateRange' className='label'>Date Range</label>
          <div className='date-range' id='dateRange'>
            <input type="date" className='from-date' /><span className='ws-p-lr-10 ws-d-flex align-items-center'>-</span><input type="date" className='to-date' />
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
