import { StyledGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, alt, largeImageURL, onOpenModal }) => {
  return (
    <StyledGalleryItem>
      <img src={src} alt={alt} onClick={() => onOpenModal(largeImageURL)} />
    </StyledGalleryItem>
  );
};
