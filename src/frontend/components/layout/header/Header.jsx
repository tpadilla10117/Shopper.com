/* Header Component is to contain the navigation components: */

    import React, {useState, useEffect} from 'react';
    import {
        Nav, 
        DesktopNav, 
        Sidebar,
    } from '../../utils';
    import './Header.scss';

    const Header = () => {
/* TODO: Rewrite in Redux code: */

    /* State for normal React code: */
        /* const [isOpen, setIsOpen] = useState(false); */
        const [ isDesktop, setIsDesktop ] = useState(window.innerWidth > 1000);

    /* If using normal React code: */
       /*  const navToggle = () => {
            setIsOpen(!isOpen);
        }; */

        const updateComponentView = () => {
            setIsDesktop(window.innerWidth > 1000);
        };

        useEffect ( () => {
            window.addEventListener("resize", updateComponentView);
            return () => window.removeEventListener("resize", updateComponentView);
        }, []);

    return (

        <header className="header-parent-wrapper">
            {isDesktop ?
                (<DesktopNav /* isOpen={isOpen} */ /* navToggle={navToggle} *//>
                )
        
                :

                (<Nav /* isOpen={isOpen} */ /* navToggle={navToggle} */ />)

            }

            <Sidebar /* isOpen={isOpen} */ /* navToggle={navToggle} */ />

        </header> 
    );
    }

    export default Header;
