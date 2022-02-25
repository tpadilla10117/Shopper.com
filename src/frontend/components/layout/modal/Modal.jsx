import React, { useEffect, useRef } from 'react';
import './Modal.scss';

const Modal = ( {children} ) => {
    const modalReference = null;



  return (
      
    <section className="modal-parent-container" role="dialog" aria-modal="true">
        <div className='modal-content'>
            <div className='modal-header'>
                <button className='modal-close-button'>
                    x
                </button>
            </div>
            {children}
        </div>

    </section>
  );
};

export default Modal