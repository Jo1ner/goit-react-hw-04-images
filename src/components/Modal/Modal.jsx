import { useEffect } from 'react';
import { StyledModal } from './Modal.styled';

export const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  return (
    <StyledModal onClick={handleBackdropClick}>
      <div className="modal">{children}</div>
    </StyledModal>
  );
};
