import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoadMoreBtn from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { getApi } from '../utils/getApi.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setsearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalImage, setmodalImage] = useState(null);

  const [imagesArr, setimagesArr] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    } else {
      setLoading(true);
      setTimeout(() => {
        getApi(searchQuery, page)
          .then(data => {
            if (data.hits.length === 0) {
              Notify.warning('No images found');
              setLoading(false);
            } else {
              setimagesArr([...imagesArr, ...data.hits]);
              setLoading(false);
            }
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      }, 1500);
    }
  }, [searchQuery, page]);

  const processSearchQuery = ( inputValue ) => {
    if (inputValue === searchQuery) {
      return;
    } else {
      setsearchQuery(inputValue.toLowerCase());
      setPage(1);
      setimagesArr([])
    }
  };

  const loadMoreImages = () => {
    setPage(page + 1);
  };

  const showModal = image => {
    setmodalImage(image);
    setmodalOpen(true);
  };

  const modalClose = () => {
    setmodalImage(null);
    setmodalOpen(false);
  };

  useEffect(() => {}, [loading, imagesArr, searchQuery, page]);
  return (
    <div style={{ textAlign: 'center' }}>
      <Searchbar onSubmit={processSearchQuery} />
      {loading && <Loader />}
      <ImageGallery imageArr={imagesArr} handleClick={showModal} />
      {imagesArr.length === 0 ? (
        <></>
      ) : (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      {modalOpen && <Modal image={modalImage} handleClose={modalClose} />}
    </div>
  );
};

// class App extends React.Component {
//   state = {
//     loading: false,
//     imagesArr: [],
//     searchQuery: '',
//     page: 1,
//     modalOpen: false,
//     modalImage: null,
//   };

//   processSearchQuery = ({ inputValue }) => {
//     if (inputValue === this.state.searchQuery) {
//       return;
//     } else {
//       this.setState({ searchQuery: inputValue.toLowerCase(), imagesArr: [], page: 1 });
//     }

//   };

//   loadMoreImages = () => {
//     this.setState({ page: this.state.page + 1 });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { page, searchQuery } = this.state;

//     if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
//       this.setState({ loading: true });

//       // Таймаут тут не нужен, оставлю что-бы было видно лоадер.
//       // Библиотека react-loader у меня почем-то не захотела устанавливаться, я использовал рандомный лоадер которй нашел сам.
//       setTimeout(() => {
//         getApi(searchQuery, page)
//           .then(data => {
//             if (data.hits.length === 0) {
//               Notify.warning('No images found');
//             } else {
//               this.setState(prevState => ({
//                 imagesArr: [...prevState.imagesArr, ...data.hits],
//               }));
//             }
//           })
//           .catch(err => {
//             console.error(err);
//           })
//           .finally(this.setState({ loading: false }));
//       }, 1500);
//     } else if (!this.state.searchQuery.trim()) {
//       Notify.warning('Please type query');
//     }
//   }

//   showModal = image => {
//     this.setState({
//       modalContent: image,
//       modalOpen: true,
//     });
//   };
//   modalClose = () => {
//     this.setState({
//       modalContent: null,
//       modalOpen: false,
//     });
//   };

//   render() {
//     const { imagesArr, loading, modalOpen, modalContent } = this.state;
//     return (
//       <div style={{ textAlign: 'center' }}>
//         <Searchbar onSubmit={this.processSearchQuery} />
//         {loading && <Loader />}
//         <ImageGallery imageArr={imagesArr} handleClick={this.showModal} />
//         {imagesArr.length === 0 ? (
//           <></>
//         ) : (
//           <LoadMoreBtn onClick={this.loadMoreImages} />
//         )}
//         {modalOpen && (
//           <Modal image={modalContent} handleClose={this.modalClose} />
//         )}
//       </div>
//     );
//   }
// }

export default App;
