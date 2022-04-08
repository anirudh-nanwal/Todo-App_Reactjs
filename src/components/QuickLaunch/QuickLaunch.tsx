import React, { FC, useState } from 'react';
import Card from '../Card/Card';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import './QuickLaunch.css';
import { FaFilter } from 'react-icons/fa';
import { BiSortAlt2 } from 'react-icons/bi';
import { MdCalendarViewWeek, MdOutlineViewStream } from 'react-icons/md';
import { LIST_VIEW, WEEK_VIEW } from '../../pojo/Constants';

interface QuickLaunchProps {
  onViewChange: Function
}

const QuickLaunch: FC<QuickLaunchProps> = (props) => {
  const [filter, showFilter] = useState({ show: false, class: 'ws-d-none' });
  const [sort, showSort] = useState({ show: false, class: 'ws-d-none' });
  const onViewChange: Function = props.onViewChange;
  const showFilterHandler = (show: boolean): void => {
    if (!show) {
      showFilter({ show: true, class: 'ws-d-flex' });
      showSort({ show: false, class: 'ws-d-none' });
    }
    else showFilter({ show: false, class: 'ws-d-none' });
  }
  const showSortHandler = (show: boolean): void => {
    if (!show) {
      showSort({ show: true, class: 'ws-d-flex' });
      showFilter({ show: false, class: 'ws-d-none' });
    }
    else showSort({ show: false, class: 'ws-d-none' });
  }
  return (
    <>
      <div className="QuickLaunch" data-testid="QuickLaunch">
        <Card className='quick-launch-card'>
          <div className="list-view">
            <MdOutlineViewStream onClick={() => { onViewChange(LIST_VIEW) }} />
          </div>
          <div className="week-view">
            <MdCalendarViewWeek onClick={() => { onViewChange(WEEK_VIEW) }} />
          </div>
          <div className="filter">
            <FaFilter onClick={() => { showFilterHandler(filter.show) }} />
          </div>
          <div className="sort">
            <BiSortAlt2 onClick={() => { showSortHandler(sort.show) }} />
          </div>
        </Card>
      </div>
      <Filter className={filter.class}></Filter>
      <Sort className={sort.class}></Sort>
    </>
  );
};

export default QuickLaunch;
