import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { handleModalVisibility } from '../../../reduxslices/modalSlice';


const Modal = ( {children} ) => {
    const modalReference = useRef(null);
    const dispatch = useDispatch();

        const modalToggle = () => {
            dispatch(handleModalVisibility())
        };

  return (
      
    <section className="modal-parent-container" role="dialog" aria-modal="true">
        <div className='modal-content' ref={modalReference}>
            <div className='modal-header'>
                <button className='modal-close-button' title="Close modal" onClick={modalToggle}>
                    x
                </button>
            </div>
            {children}
        </div>

    </section>
  );
};

export default Modal