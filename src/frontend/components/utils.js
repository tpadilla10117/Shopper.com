/* This components handles exports in the main App: */

    /* "layout" components: */
        export { default as Nav } from '../components/layout/nav/Nav.jsx';

        export { default as DesktopNav } from '../components/layout/desktopNav/DesktopNav.jsx';

        export { default as Sidebar } from '../components/layout/sidebar/Sidebar.jsx';

        export { default as Header } from '../components/layout/header/Header.jsx';



/* -------------------------------------------------------------------------- */


    /* "pages" components: */




/* -------------------------------------------------------------------------- */
/* Functions: */

/* Scroll to top of the page after a user clicks a link: */
export const scrollTop = () => {
    window.scrollTo({ behavior: "smooth", top: "0px"});
};