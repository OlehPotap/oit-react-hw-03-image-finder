import React from 'react';
import s from '../Modal/modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.close);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.close);
  }

  close = e => {
    if (e.code === 'Escape') {
      return this.props.handleClose();
    }
    if (e.target === e.currentTarget) {
      this.props.handleClose();
    }
  };

  render() {
    return (
      <div className={s.overlay} onClick={this.close}>
        <div className={s.content}>
          <img src={this.props.image} alt="" className={s.img} />
        </div>
      </div>
    );
  }
}

export default Modal;
