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
  const [totalImages, setTotalImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShownBtn, setIsShownBtn] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchImagesData = (searchQuery, page) => {
      setLoading(true);

      fetchImages(searchQuery, page)
        .then(response => {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setPage(page);
          setIsShownBtn(true);
          setTotalImages(response.data.totalHits);
          if (response.data.total === 0) {
            alert('Nothing was found for your request');
            return;
          }
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchImagesData(searchQuery, page);
  }, [searchQuery, page]);

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>Oops! Something went wrong: {error}</p>}
      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={handleOpenModal} />
      )}
      {loading && <Loader />}
      {page < totalImages / 12 && isShownBtn && (
        <Button onClick={handleLoadMore} />
      )}
      {showModal && (
        <Modal onCloseModal={handleCloseModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </StyledApp>
  );
};
