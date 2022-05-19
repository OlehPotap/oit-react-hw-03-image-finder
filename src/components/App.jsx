import React from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoadMoreBtn from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { getApi } from '../utils/getApi.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends React.Component {
  state = {
    loading: false,
    imagesArr: [],
    searchQuery: '',
    page: 1,
    modalOpen: false,
    modalImage: null,
  };

  processSearchQuery = ({ inputValue }) => {
    if (inputValue !== this.state.searchQuery) {
      this.setState({ imagesArr: [] });
    }

    this.setState({ searchQuery: inputValue.toLowerCase() });
  };

  loadMoreImages = () => {
    this.setState({ page: this.state.page + 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.setState({ loading: true });

      // Таймаут тут не нужен, оставлю что-бы было видно лоадер.
      // Библиотека react-loader у меня почем-то не захотела устанавливаться, я использовал рандомный лоадер которй нашел сам.
      setTimeout(() => {
        getApi(searchQuery, page)
          .then(data => {
            if (data.hits.length === 0) {
              Notify.warning('No images found');
            } else {
              this.setState(prevState => ({
                imagesArr: [...prevState.imagesArr, ...data.hits],
              }));
            }
          })
          .catch(err => {
            console.error(err);
          })
          .finally(this.setState({ loading: false }));
      }, 1500);
    } else if (!this.state.searchQuery.trim()) {
      Notify.warning('Please type query');
    }
  }

  showModal = image => {
    this.setState({
      modalContent: image,
      modalOpen: true,
    });
  };
  modalClose = () => {
    this.setState({
      modalContent: null,
      modalOpen: false,
    });
  };

  render() {
    const { imagesArr, loading, modalOpen, modalContent } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        <Searchbar onSubmit={this.processSearchQuery} />
        {loading && <Loader />}
        <ImageGallery imageArr={imagesArr} handleClick={this.showModal} />
        {imagesArr.length === 0 ? (
          <></>
        ) : (
          <LoadMoreBtn onClick={this.loadMoreImages} />
        )}
        {modalOpen && (
          <Modal image={modalContent} handleClose={this.modalClose} />
        )}
      </div>
    );
  }
}

export default App;
