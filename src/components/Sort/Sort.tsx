import React, { FC } from 'react';
import Card from '../Card/Card';
import './Sort.css';

interface SortProps {
  className: string,
  onMouseOver: Function,
  onMouseLeave: Function
}

const Sort: FC<SortProps> = (props) => {
  const classes = 'Sort ' + props.className;
  const showSort = props.onMouseOver;
  const hideSort = props.onMouseLeave;
  return (
    <div className={classes} data-testid="Sort" onMouseOver={() => { showSort() }} onMouseLeave={() => { hideSort() }}>
      <Card className='sort-card'>
        <div className='label-container ws-fb-20'>
          <label htmlFor='dateRange' className='label'>Date Range</label>
          <div className='sort-radio' id='dateRange'>
            <input type="radio" className='sort' id='date-range_1' name='date-sort' />
            <label htmlFor="date-range" className='label_1'>Ascending</label>
            <input type="radio" className='sort' id='date-range_2' name='date-sort' />
            <label htmlFor="date-range" className='label_2'>Descending</label>
          </div>
        </div>
        <div className='label-container ws-fb-20'>
          <label htmlFor="priority" className='label'>Priority</label>
          <div className="sort-radio" id="priority">
            <input type="radio" className='sort' id='priority_1' name='priority-sort' />
            <label htmlFor="priority_1" className='label_1'>Ascending</label>
            <input type="radio" className='sort' id='priority_2' name='priority-sort' />
            <label htmlFor="priority_2" className='label_2'>Descending</label>
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

export default Sort;
