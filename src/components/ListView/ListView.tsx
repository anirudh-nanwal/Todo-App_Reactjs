import React, { FC } from 'react';
import './ListView.css';
import Card from '../Card/Card';
import Todo from '../../pojo/Todo';

interface ListViewProps {
  todos: Todo[]
}

const ListView: FC<ListViewProps> = (props) => {
  return (
    <>
      <div className="ListView" data-testid="ListView">
        <Card className='list-todos'>
          <div className='no-todos-present'>No todos present</div>
        </Card>
      </div>
    </>
  );
}

export default ListView;
