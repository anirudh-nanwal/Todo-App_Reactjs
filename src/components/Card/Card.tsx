import React, { FC } from 'react';
import './Card.css';

interface CardProps {
  className: string
}

const Card: FC<CardProps> = (props) => {
  const classes: string = 'Card ' + props.className;
  return (
    <div className={classes} data-testid="Card">
      {props.children}
    </div>
  );
};

export default Card;
