import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'api/getImages';
import { Button } from './Button/Button';
import { StyledApp } from './App.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShownBtn, setIsShownBtn] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);

    // fetchImages(searchQuery, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    // fetchImages(searchQuery, nextPage);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleOpenModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  useEffect(() => {
    fetchImages = (searchQuery, page) => {
      setLoading(true);

      fetchImages(searchQuery, page)
        .then(response => {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setPage(page);
          setIsShownBtn(true);
          setError(null);
          if (response.data.hits.length <= 11) {
            setIsShownBtn(false);
            if (images.length === 0) {
              alert('Nothing was found for your request');
            }
          }
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchImages(searchQuery, page);
  }, [searchQuery, page]);
  return (
    <StyledApp>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>Oops! Something went wrong: {error}</p>}
      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={handleOpenModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && isShownBtn && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal onCloseModal={handleCloseModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </StyledApp>
  );
};
