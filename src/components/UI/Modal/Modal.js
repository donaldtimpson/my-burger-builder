import { CSSTransition } from 'react-transition-group'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

function Modal(props) {
  return <>
    <CSSTransition in={props.show} timeout={400} mountOnEnter unmountOnExit classNames={{ enterActive: classes.ModalOpen, exitActive: classes.ModalClose }}>
      <div className={classes.Modal}>
        { props.children }
      </div>
    </CSSTransition>
    <Backdrop show={props.show} onClick={props.onClick}/>
  </>
}

export default Modal