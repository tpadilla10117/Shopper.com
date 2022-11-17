import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Accordion( ) {

    const [isAccordionActive, setIsAccordionActive ] = useState(false);

    function handleAccordionActiveStatus() {
        setIsAccordionActive(!isAccordionActive);
    };

    return (
        <button
            type='button'
            className={isAccordionActive ? `accordion-parent-container active` : `accordion-parent-container`}
            onClick={handleAccordionActiveStatus}
        >
            <div className={`accordion-wrapper`}>
                <div className={`accordion-titlecontent`}>
                    <p>Title</p>
                    {isAccordionActive ? <RemoveIcon/> : <AddIcon/>}
                </div>
                <div 
                    className={isAccordionActive ? `accordion--content active` : `accordion-content`}  
                >
                    {isAccordionActive && <p>Big Reveal</p>}
                    {isAccordionActive && <p>Big Reveal</p>}
                    {isAccordionActive && <p>Big Reveal</p>}
                </div>
            </div>
        </button>
    )
}

export default Accordion;