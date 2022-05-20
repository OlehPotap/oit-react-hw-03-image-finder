import { useEffect } from 'react';
import s from '../Modal/modal.module.css';

const Modal = ({ image, handleClose }) => {
  useEffect(() => {
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  const close = e => {
    if (e.code === 'Escape') {
      return handleClose();
    }
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={s.overlay} onClick={close}>
      <div className={s.content}>
        <img src={image} alt="" className={s.img} />
      </div>
    </div>
  );
};

// class Modal extends React.Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.close);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.close);
//   }

//   close = e => {
//     if (e.code === 'Escape') {
//       return this.props.handleClose();
//     }
//     if (e.target === e.currentTarget) {
//       this.props.handleClose();
//     }
//   };

export default Modal;
