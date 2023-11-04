import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'api/getImages';
import { Button } from './Button/Button';
import { StyledApp } from './App.styled';

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    isShownBtn: false,
    error: null,
    searchQuery: '',
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

  handleSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
    });
    this.fetchImages(searchQuery, 1);
  };

  handleLoadMore = () => {
    const { searchQuery, page } = this.state;
    const nextPage = page + 1;
    this.fetchImages(searchQuery, nextPage);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleOpenModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  fetchImages = (searchQuery, page) => {
    this.setState({
      loading: true,
    });

    fetchImages(searchQuery, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page,
          isShownBtn: true,
          error: null,
        }));
        if (response.data.hits.length <= 11) {
          this.setState({
            isShownBtn: false,
          });
          if (this.state.images.length === 0) {
            alert('Nothing was found for your request');
            return;
          }
        }
      })
      .catch(error => {
        this.setState({
          error: error.message,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const { images, loading, error, showModal, largeImageURL, isShownBtn } =
      this.state;

    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <p>Oops! Something went wrong: {error}</p>}
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.handleOpenModal} />
        )}
        {loading && <Loader />}
        {images.length > 0 && isShownBtn && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal onCloseModal={this.handleCloseModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </StyledApp>
    );
  }
}
