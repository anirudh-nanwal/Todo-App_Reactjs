import React, { FC, useState } from 'react';
import Card from '../Card/Card';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import './QuickLaunch.css';
import { FaFilter } from 'react-icons/fa';
import { BiSortAlt2 } from 'react-icons/bi';
import { MdAdd, MdCalendarViewWeek, MdOutlineViewStream } from 'react-icons/md';
import { LIST_VIEW, WEEK_VIEW } from '../../Utility/Constants';
import SortSettings from '../../pojo/SortSettings';
import FilterSettings from '../../pojo/FilterSettings';

interface QuickLaunchProps {
  view: string,
  onViewChange: (viewName: string) => void,
  onAddClick: (show: boolean) => void,
  showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean },
  sortSettings: SortSettings,
  filterSettings: FilterSettings,
  updateSortSettings: Function,
  updateFilterSettings: Function
}

const QuickLaunch: FC<QuickLaunchProps> = (props) => {
  const view: string = props.view;
  const [filter, showFilter] = useState({ show: false, class: 'ws-d-none' });
  const [sort, showSort] = useState({ show: false, class: 'ws-d-none' });
  const onViewChange: Function = props.onViewChange;
  const onAddClick: Function = props.onAddClick;
  const showAddEditTmpl: { showAddTmpl: boolean, showEditTmpl: boolean } = props.showAddEditTmpl;
  const filterSettings: FilterSettings = props.filterSettings;
  const sortSettings: SortSettings = props.sortSettings;
  const updateFilterSettings: Function = props.updateFilterSettings;
  const updateSortSettings: Function = props.updateSortSettings;
  const showFilterHandler: Function = (show: boolean): void => {
    setTimeout(() => {
      if (show) {
        showFilter({ show: true, class: 'ws-d-flex' });
        showSort({ show: false, class: 'ws-d-none' });
      }
      else {
        showFilter({ show: false, class: 'ws-d-none' });
      }
    }, 200);

  }
  const showSortHandler: Function = (show: boolean): void => {
    setTimeout(() => {
      if (show) {
        showSort({ show: true, class: 'ws-d-flex' });
        showFilter({ show: false, class: 'ws-d-none' });
      }
      else showSort({ show: false, class: 'ws-d-none' });
    }, 200);
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
          <div className="filter" onClick={() => { showFilterHandler(!filter.show) }} >
            <FaFilter />
          </div>
          <div className="sort" onClick={() => { showSortHandler(!sort.show) }} >
            <BiSortAlt2 />
          </div>
          <div className="add" onClick={() => { onAddClick(!showAddEditTmpl.showAddTmpl) }}>
            <MdAdd />
          </div>
        </Card>
      </div>
      {filter.show && <Filter className={filter.class} view={view} filterSettings={filterSettings} updateFilterSettings={updateFilterSettings}></Filter>}
      {sort.show && <Sort className={sort.class} sortSettings={sortSettings} updateSortSettings={updateSortSettings}></Sort>}
    </>
  );
};

export default QuickLaunch;
