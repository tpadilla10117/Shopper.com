import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Accordion( { buttonClassName } ) {

    const [isAccordionActive, setIsAccordionActive ] = useState(false);

    function handleAccordionActiveStatus() {
        setIsAccordionActive(!isAccordionActive);
    };

    return (
        <button
            type='button'
            className={isAccordionActive ? `${buttonClassName}-accordion-linksitems-parent-container active` : `${buttonClassName}-accordion-linksitems-parent-container`}
            onClick={handleAccordionActiveStatus}
        >
            <div className={`${buttonClassName}-accordion-linksitems-wrapper`}>
                <div className={`${buttonClassName}-accordion-linksitems-titlecontent`}>
                    <p>Title</p>
                    {isAccordionActive ? <RemoveIcon/> : <AddIcon/>}
                </div>
                <div 
                    className={isAccordionActive ? `${buttonClassName}-accordion-linksitems-content active` : `${buttonClassName}-accordion-linksitems-content`}  
                >
                    {isAccordionActive && <p>Big Reveal</p>}
                </div>
            </div>
        </button>
    )
}

export default Accordion;