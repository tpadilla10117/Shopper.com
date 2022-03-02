import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { handleModalVisibility } from '../../../reduxslices/modalSlice';


const Modal = ( {children} ) => {
    const modalReference = useRef(null);
    const dispatch = useDispatch();

        const modalToggle = () => {
            dispatch(handleModalVisibility())
            console.log('clicked');
        };

/* Allows me to click anywhere outside the Modal to close it: */

   /*  useEffect( () => {

        function handleClick(event) {
            if(!modalReference.current?.contains(event.target)) {
                modalToggle();
            }
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, ); */

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