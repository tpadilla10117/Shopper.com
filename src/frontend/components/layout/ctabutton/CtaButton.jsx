/* This component abstracts away Call-To-Action Buttons: */  
    import React from 'react';

    function CtaButton( {text} ) {
    return (
        <button className='cta-button'>
            {text}
        </button>
    );
    };

    export default CtaButton;