import { useModal } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import Filters from './Filters';
import Modal from './Modal';

const FiltersToggle = ({ children }) => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      <div
        className={`filters-toggle ${isOpenModal ? 'filters-toggle--active' : ''}`}
        onClick={onOpenModal}
        role="presentation"
        aria-label="Toggle filters"
      >
        {children || (
          <div className="filters-wrapper">
            <i className="fa fa-filter" />
            <span>Filters</span>
            <i className="fa fa-chevron-down filters-toggle-caret" />
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={onCloseModal}
      >
        <div className="filters-toggle-sub">
          <Filters closeModal={onCloseModal} />
        </div>
        <button
          className="modal-close-button"
          onClick={onCloseModal}
          type="button"
          aria-label="Close filters"
        >
          <i className="fa fa-times" />
        </button>
      </Modal>
    </>
  );
};

FiltersToggle.propTypes = {
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ])
};

FiltersToggle.defaultProps = {
  children: null
};

export default FiltersToggle;
