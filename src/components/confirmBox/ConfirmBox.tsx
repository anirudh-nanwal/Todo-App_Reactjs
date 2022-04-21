import React, { FC } from 'react';
import * as ReactDOM from 'react-dom';
import Card from '../Card/Card';
import './ConfirmBox.css';

interface BackdropProps { }
interface OverlayProps {
  setConfirmBox: Function,
  showConfirmBox: { show: boolean, todoId: number },
  deleteTodo: Function
}
interface ConfirmBoxProps {
  setConfirmBox: Function,
  showConfirmBox: { show: boolean, todoId: number },
  deleteTodo: Function
}

const Backdrop: FC<BackdropProps> = () => {
  return (<div className='backdrop'></div>);
}

const Overlay: FC<OverlayProps> = (props) => {
  const showConfirmBox: { show: boolean, todoId: number } = props.showConfirmBox;
  const title: string = 'Delete Todo';
  const message: string = 'Are you sure you want to delete this todo?';
  const deleteTodo: Function = props.deleteTodo;
  return (
    <Card className='ConfirmBox'>
      <div className="title">
        {title}
      </div>
      <div className="message">
        {message}
      </div>
      <div className="actions">
        <button className='btn btn-primary' onClick={() => { deleteTodo(showConfirmBox.todoId, true) }}>Yes</button>
        <button className='btn btn-tertiary ws-m-r-20' onClick={() => { deleteTodo(showConfirmBox.todoId, false) }}>No</button>
      </div>
    </Card>
  );
}

const ConfirmBox: FC<ConfirmBoxProps> = (props: React.PropsWithChildren<ConfirmBoxProps>) => {
  const showConfirmBox: { show: boolean, todoId: number } = props.showConfirmBox;
  const setConfirmBox: Function = props.setConfirmBox;
  const deleteTodo: Function = props.deleteTodo;
  const portalElement: HTMLElement = document.getElementById('overlays')!;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<Overlay deleteTodo={deleteTodo} showConfirmBox={showConfirmBox} setConfirmBox={setConfirmBox} />, portalElement)}
    </>
  );
}

export default ConfirmBox;
