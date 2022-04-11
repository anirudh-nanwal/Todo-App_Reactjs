import React, { FC } from 'react';
import './WeekCalendar.css';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Card from '../Card/Card';
import '../../Utility/DateUtils';
import Day from '../../pojo/Day';

interface WeekCalendarProps {
  className: string,
  weekDate: Day[],
  prevWeekHandler: Function,
  nextWeekHandler: Function
}

const WeekCalendar: FC<WeekCalendarProps> = (props) => {
  const classes: string = 'WeekCalendar ' + props.className;
  const weekDate: Day[] = props.weekDate;
  const prevWeekHandler: Function = props.prevWeekHandler;
  const nextWeekHandler: Function = props.nextWeekHandler;
  const weekDateComponent: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>[] = [];
  for (let day of weekDate) {
    weekDateComponent.push(
      <div className='week-day' key={day.dayNo}>
        <div className="day">{day.dayFull}</div>
        <div className="date">{(new Date(day.date)).convertDateToDateSkey()}</div>
      </div>
    );
  }

  return (
    <div className={classes}>
      <Card className='week-view'>
        <div className="left-container">
          <MdArrowBackIos onClick={() => { prevWeekHandler() }} />
        </div>
        <div className="center-container">
          {weekDateComponent}
        </div>
        <div className="right-container">
          <MdArrowForwardIos onClick={() => { nextWeekHandler() }} />
        </div>
      </Card>
    </div>
  );
}

export default WeekCalendar;
