import PropType from 'prop-types';
import React from 'react';
import AppModal from 'react-modal';

const Modal = ({
  isOpen,
  onRequestClose,
  afterOpenModal,
  overrideStyle,
  children
}) => {
  const defaultStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      position: 'relative',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      maxWidth: '500px',
      width: '90%',
      padding: 0,
      border: 'none',
      background: 'transparent',
      overflow: 'visible',
      borderRadius: '10px',
      ...overrideStyle
    }
  };

  // Try to find an existing app element or use document.body as fallback
  try {
    const appElement = document.getElementById('app') || document.body;
    AppModal.setAppElement(appElement);
  } catch (error) {
    console.warn('Could not set app element for Modal:', error);
  }

  return (
    <AppModal
      closeTimeoutMS={300}
      contentLabel="Modal Content"
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      style={defaultStyle}
    >
      {children}
    </AppModal>
  );
};

Modal.defaultProps = {
  overrideStyle: {},
  afterOpenModal: () => { }
};

Modal.propTypes = {
  isOpen: PropType.bool.isRequired,
  onRequestClose: PropType.func.isRequired,
  afterOpenModal: PropType.func,
  // eslint-disable-next-line react/forbid-prop-types
  overrideStyle: PropType.object,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default Modal;
