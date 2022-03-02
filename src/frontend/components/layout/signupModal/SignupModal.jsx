import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { handleSignUpModalVisibility } from '../../../reduxslices/modalSlice';


const SignupModal = ( {children} ) => {
    const modalReference = useRef(null);
    const dispatch = useDispatch();

        const signUpModalToggle = () => {
            dispatch(handleSignUpModalVisibility())
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
      
    <section className="signup-modal-parent-container" role="dialog" aria-modal="true">
        <div className='signup-modal-content' ref={modalReference}>
            <div className='signup-modal-header'>
                <button className='signup-modal-close-button' title="Close modal" onClick={signUpModalToggle}>
                    x
                </button>
            </div>
            {children}
        </div>

    </section>
  );
};

export default SignupModal;