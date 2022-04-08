import React, { FC } from 'react';
import './WeekCalendar.css';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Card from '../Card/Card';

interface WeekCalendarProps {
  className: string
}

const WeekCalendar: FC<WeekCalendarProps> = (props) => (
  <div className={`WeekCalendar ${props.className}`} data-testid="WeekCalendar">
    <Card className='week-view'>
      <div className="left-container">
        <MdArrowBackIos />
      </div>
      <div className="center-container">
        <div className="week-day">Sunday</div>
        <div className="week-day">Monday</div>
        <div className="week-day">Tuesday</div>
        <div className="week-day">Wednesday</div>
        <div className="week-day">Thursday</div>
        <div className="week-day">Friday</div>
        <div className="week-day">Saturday</div>
      </div>
      <div className="right-container">
        <MdArrowForwardIos />
      </div>
    </Card>
  </div>
);

export default WeekCalendar;
