import s from './button.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={s.Button} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
