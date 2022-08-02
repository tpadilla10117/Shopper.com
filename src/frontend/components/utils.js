/* This components handles exports in the main App: */

    /* "layout" components: */
        export { default as Nav } from '../components/layout/nav/Nav.jsx';

        export { default as HeroBanner } from '../components/layout/heroBanner/Herobanner.jsx';

        export { default as HeroBanner2 } from '../components/layout/herobanner2/Herobanner2.jsx';

        export { default as DesktopNav } from '../components/layout/desktopNav/DesktopNav.jsx';

        export { default as Sidebar } from '../components/layout/sidebar/Sidebar.jsx';

        export { default as CtaButton } from '../components/layout/ctabutton/CtaButton.jsx';

        export { default as Modal } from '../components/layout/modal/Modal.jsx';

        export { default as SignupModal } from '../components/layout/signupModal/SignupModal.jsx';

        export { default as Header } from '../components/layout/header/Header.jsx';

        export { default as ProductsLandingFeed } from '../components/layout/productsLandingFeed/ProductsLandingFeed.jsx';

        export { default as ProductCards } from '../components/layout/productCards/ProductCards.jsx';

        export { default as CheckoutProductCard } from '../components/layout/checkoutProductCard/CheckoutProductCard.jsx';

        export { default as ProductFeed } from '../components/layout/productFeed/ProductFeed.jsx';

        export { default as MenuItem } from '../components/layout/menuItem/menuItem.js';

        export { default as Directory } from '../components/layout/directory/Directory.jsx';

        export { default as LandingLogin } from '../components/layout/landingLogin/LandingLogin.jsx';

        export { default as Logout } from '../components/layout/logout/Logout.jsx';

        export { default as Login } from '../components/layout/login/Login.jsx';

        export { default as Signup } from '../components/layout/signup/Signup.jsx';

        export { default as Loading } from '../components/layout/loading/Loading.jsx';

        export { default as OrderCards } from '../components/layout/orderCards/OrderCards.js';

        export { default as Footer } from '../components/layout/footer/Footer.jsx';

        export { default as Newsletter } from '../components/layout/newsletter/Newsletter.jsx';

        export { default as IndividualProductCards } from '../components/layout/individualProductCards/IndividualProductCards.jsx';

        export { default as ProductNavSlider } from '../components/layout/productNavSlider/ProductNavSlider.jsx';


/* -------------------------------------------------------------------------- */


    /* "pages" components: */

        export { default as Landing } from '../components/pages/landing/Landing.jsx';

        export { default as About } from '../components/pages/about/About.js';

        export { default as Cart } from '../components/pages/cart/Cart.js';

        export { default as Signin } from '../components/pages/signin/Signin.js';

        export { default as OrderPg } from '../components/pages/orderpg/OrderPg.js';

        export { default as ProductsPg } from '../components/pages/productspg/ProductsPg.js';

        export { default as CheckoutPg } from '../components/pages/checkoutpg/CheckoutPg.js';

        export { default as SuccessPg } from '../components/pages/successpg/SuccessPg.js';

        export { default as IndividualProductPg } from '../components/pages/individualproductpg/IndividualProductPg.jsx';


/* -------------------------------------------------------------------------- */
/* Functions: */

/* Scroll to top of the page after a user clicks a link: */
export const scrollTop = () => {
    window.scrollTo({ behavior: "smooth", top: "0px"});
};