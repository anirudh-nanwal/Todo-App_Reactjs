import React, { FC, useState } from 'react';
import './WeekCalendar.css';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Card from '../Card/Card';
import '../../Utility/DateUtils';
import Day from '../../pojo/Day';

interface WeekCalendarProps {
  className: string
}

const WeekCalendar: FC<WeekCalendarProps> = (props) => {
  const classes: string = 'WeekCalendar ' + props.className;
  const date: Date = new Date();
  let currWeek: Day[] = date.getCurrentWeek();
  const [weekDate, setWeekDate] = useState(currWeek);
  const weekDateComponent: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>[] = [];
  for (let day of weekDate) {
    weekDateComponent.push(
      <div className='week-day' key={day.dayNo}>
        <div className="day">{day.dayFull}</div>
        <div className="date">{(new Date(day.date)).convertDateToDateSkey()}</div>
      </div>
    );
  }

  const nextWeekHandler: Function = (): void => {
    const lastWeekEndDate: Date = new Date(weekDate[6].date);
    let nextWeekStartDate: Date = new Date(lastWeekEndDate.setDate(lastWeekEndDate.getDate() + 1));
    currWeek = nextWeekStartDate.getNextWeek();
    setWeekDate(currWeek);
  }

  const prevWeekHandler: Function = (): void => {
    const currWeekStartDate: Date = new Date(weekDate[0].date);
    let lastWeekStartDate: Date = new Date(currWeekStartDate.setDate(currWeekStartDate.getDate() - 7));
    currWeek = lastWeekStartDate.getNextWeek();
    setWeekDate(currWeek);
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