import { useState, useEffect } from 'react';
import * as API from 'fetch/fetch';
import { ToastContainer } from 'react-toastify';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import MyLoader from './Loader/Loader';

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
    API.getImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length) {
          setImages(images => [...images, ...hits]);
          setTotalImages(totalHits);
        }
      })
      .catch(error => setError({ error }))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const onSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const openModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const toggleModal = () => {
    setIsShowModal(isShowModal => !isShowModal);
  };

  const ifLoadMore = () => {
    return totalImages - images.length > 12;
  };

  return (
    <div className={css.App}>
      <>
        <Searchbar onSubmit={onSearch} />
        {images.length !== 0 && (
          <>
            <ImageGallery openModal={openModal} images={images} />
            {ifLoadMore() && !isLoading && (
              <Button response={() => setPage(page => page + 1)} />
            )}
          </>
        )}
        {isLoading && <MyLoader />}

        {error && (
          <h1>Sorry, there are no images matching your search {tags}.</h1>
        )}
        {isShowModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </>
    </div>
  );
}

export default App;
