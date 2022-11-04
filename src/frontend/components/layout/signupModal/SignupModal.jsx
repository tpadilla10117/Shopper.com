import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { handleSignUpModalVisibility } from '../../../reduxslices/modalSlice.js';


const SignupModal = ( {children} ) => {
    const modalReference = useRef(null);
    const dispatch = useDispatch();

        const signUpModalToggle = () => {
            dispatch(handleSignUpModalVisibility())
        };

/* TODO: Need functionality to make modal close when user clicks outside */

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