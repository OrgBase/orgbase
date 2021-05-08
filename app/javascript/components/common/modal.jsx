import React from 'react';

const Modal = ({ children, closeModal, modalState, modalTitle, modalClass, hideCloseOption }) => {
  if(!modalState) {
    return null;
  }

  return(
    <div className={`modal is-active jally-modal ${modalClass || ''}`}>
      <div className="modal-background" onClick={!hideCloseOption ? closeModal : () => {}} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
          {!hideCloseOption && <button className="delete" aria-label="close" onClick={closeModal}></button>}
        </header>
        <section className="modal-card-body">
          <div className='jally-modal-title mb-3 has-text-centered'>{modalTitle}</div>
          {children}
        </section>
      </div>
    </div>
  );
}

export default Modal;