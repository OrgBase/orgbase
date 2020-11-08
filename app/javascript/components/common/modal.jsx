import React from 'react';

const Modal = ({ children, closeModal, modalState, modalTitle }) => {
  if(!modalState) {
    return null;
  }

  return(
    <div className="modal is-active jally-modal">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section className="modal-card-body has-text-centered">
          <div className='jally-modal-title'>{modalTitle}</div>
          {children}
        </section>
      </div>
    </div>
  );
}

export default Modal;