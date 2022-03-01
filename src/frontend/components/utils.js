/* This components handles exports in the main App: */

    /* "layout" components: */
        export { default as Nav } from '../components/layout/nav/Nav.jsx';

        export { default as DesktopNav } from '../components/layout/desktopNav/DesktopNav.jsx';

        export { default as Sidebar } from '../components/layout/sidebar/Sidebar.jsx';

        export { default as CtaButton } from '../components/layout/ctabutton/CtaButton.jsx';

        export { default as Modal } from '../components/layout/modal/Modal.jsx';

        export { default as Header } from '../components/layout/header/Header.jsx';

        export { default as Products } from '../components/layout/products/Products.jsx';

        export { default as ProductFeed } from '../components/layout/productFeed/ProductFeed.jsx';

        export { default as LandingLogin } from '../components/layout/landingLogin/LandingLogin.jsx';

        export { default as Logout } from '../components/layout/logout/Logout.jsx';

        export { default as Login } from '../components/layout/login/Login.jsx';



/* -------------------------------------------------------------------------- */


    /* "pages" components: */

        export { default as Landing } from '../components/pages/Landing';

        export { default as About } from '../components/pages/about/About.js';

        export { default as Cart } from '../components/pages/cart/Cart.js';

        export { default as Signin } from '../components/pages/signin/Signin.js';




/* -------------------------------------------------------------------------- */
/* Functions: */

/* Scroll to top of the page after a user clicks a link: */
export const scrollTop = () => {
    window.scrollTo({ behavior: "smooth", top: "0px"});
};