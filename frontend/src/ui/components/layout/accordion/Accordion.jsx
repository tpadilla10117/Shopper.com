import React, { useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Accordion( {titleContent, itemContent, index} ) {

    const [isAccordionActive, setIsAccordionActive ] = useState(false);
    const [currentHeight, setCurrentHeight] = useState('0px');

    const accordionInstance = useRef(null);

/* This handles the accordion state and checks the scrollHeight property on an element to adjust it's height: */
    function handleAccordionActiveStatus() {
        setIsAccordionActive(!isAccordionActive);
        setCurrentHeight(
            isAccordionActive === true ? '0px' : `${accordionInstance.current.scrollHeight}px`
        )
    };

    return (
        <button
            key={index}
            type='button'
            className='accordion-parent-container'
            onClick={handleAccordionActiveStatus}
        >
            <div className={`accordion-wrapper`}>
            {/*Below will be the dynamic content  */}
                <div className='accordion-item'>
                    <div className={`accordion-item-titlecontent`}>
                        <p>{titleContent}</p>
                        {isAccordionActive ? <RemoveIcon/> : <AddIcon/>}
                    </div>
                    <div 
                        className={isAccordionActive ? `accordion-item-content active` : `accordion-item-content`}  
                        ref={accordionInstance}
                        style={{ maxHeight: `${currentHeight}` }}
                    >
                        <p>{itemContent}</p>    
                    </div>
                </div>
            </div>
        </button>
    )
}

export default Accordion;