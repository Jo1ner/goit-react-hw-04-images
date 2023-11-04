import { StyledGallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <StyledGallery>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt=""
          largeImageURL={largeImageURL}
          onOpenModal={onOpenModal}
        />
      ))}
    </StyledGallery>
  );
};
