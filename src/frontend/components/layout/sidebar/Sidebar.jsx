import React, {useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavbarData } from '../../../seed.js';
import { useDispatch, useSelector } from 'react-redux';
import { navToggler } from '../../../reduxslices/navSlice.js';
import { userData, logout } from '../../../reduxslices/authSlice.js';
import { emptyUsersOrderItems } from '../../../reduxslices/ordersSlice.js';
import { emptyUsersSavedItems } from '../../../reduxslices/savedItemsSlice.js';
import "../../App.scss";

const Sidebar = () => {

    const isToggled = useSelector(state => state.nav.isOpen);
    const nodeRef = useRef(null);
    const navigateRoutes = useNavigate();

    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(userData);

/* Toggles the sidebar component: */
    const navToggle = () => {
        dispatch(navToggler())
    }

/* Logout function chain: */
    function logOutUser() {
        dispatch(logout());
        dispatch(emptyUsersSavedItems());
        dispatch(emptyUsersOrderItems());
        navigateRoutes('/', { replace: true});
    };

    function userAuthToggler() {
        if(isUserLoggedIn) {
            logOutUser();
        } else {
           return;
        }
    };


    return (
        <CSSTransition 
            in={isToggled} 
            timeout={300} 
            unmountOnExit onEnter={ () => navToggle} 
            onExited={ () => navToggle} classNames="sidebar-transition"
            nodeRef={nodeRef}
        >
            <nav className='sidebar-parent-container' 
                ref={nodeRef}
            >
                <div 
                    className='sidebar-icon-container'
                    onClick={navToggle}
                >
                    {/* TODO: svg className='close-icon' */}

                </div>

                <div className='sidebar-wrapper'>
                    <ul className='sidebar-menu'>
                        <div className='sidebar-link'>
                            {NavbarData.map( (item, index) => {
                                return (
                                    <NavLink to={item.path} activeclassname='active' className='nav-item'
                                    style={ {textDecoration: 'none'} }
                                    key={index} onClick={navToggle}
                                    >
                                        <li key={index} className={item.title}>
                                            <span>{item.title}</span>
                                        </li>
                                    </NavLink>
                                )
                            })}

                            <NavLink
                                to={isUserLoggedIn ? '/' : '/signin'}
                                className='nav-item'
                                activeclassname='active'
                                style={ {textDecoration: 'none'} }
                                onClick={navToggle}
                            >
                                <span
                                    onClick={userAuthToggler}
                                >{isUserLoggedIn ? 'Sign Out' : 'Sign In'}</span>
                            </NavLink>

                        </div>

                    </ul>

                </div>

            </nav>
        </CSSTransition>
    );
};

export default Sidebar;
