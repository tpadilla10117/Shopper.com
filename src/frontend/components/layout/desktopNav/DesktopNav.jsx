import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.scss';
/* import { Badge } from "@material-ui/core"; */
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { userData, logout } from '../../../reduxslices/authSlice'; //my Selector
import { useSelector, useDispatch } from 'react-redux';


const DesktopNav = (props) => {

/* Actions & Selectors for authentication:  */
    const userToken = localStorage.getItem('user');
    
    const dispatch = useDispatch();

    const isUserLoggedIn = useSelector(userData);

    function logoutUser() {
        dispatch(logout());
    };


    let authDropdownItems = [
        {
            id: 1,
            name: 'Orders & Returns'
        },
        {
            id: 2,
            name: 'Saved Items'
        },
        {
            id: 3,
            name: 'About'
        },
        {
            id: 4,
            name: 'FAQ'
        },
        {
            id: 5,
            name: 'Contact Us'
        },
        {
            id: 6,
            name: 'Sign Out',
            clickHandler: () => logoutUser(),
        },
    ];

    
    
  return (
    <nav className='desktopNav-parent-container'>
        <div className='desktop-nav-items-container'>
            

            <div className='desktop-nav-items-left'>
                <span className='desktop-nav-items-languages' >EN</span>
                <div className='desktop-nav-items-search-container'>
                    <input placeholder='Search' />
                    <Search style={{ color: "gray", fontSize: 16 }} />
                </div>
            </div>

            <NavLink 
                className='desktop-nav-items-center'
                to={'/'}
                exact='true'
                activeclassname='active'
            >
        
                <h1 className='desktop-nav-items-center-h1'>SHOPPER</h1>
            </NavLink>

            <div className='desktop-nav-items-right'>
                <NavLink
                    to='/products'
                    className='desktopNav-nav-item'
                    exact="true"
                    activeclassname='active'
                    style={ {textDecoration: 'none'}}
                >
                    PRODUCTS
                </NavLink>
            {/* TODO: MAKE SIGN IN CONDITIONAL */}

            {
                userToken ? 

                <div
                    className='desktop-nav-items-authdropdown-container'
                    activeclassname='active'
                    style={ {textDecoration: 'none'}}
                    /* onClick={logoutUser} */
                >
                    <span>Hi, {isUserLoggedIn.recoveredData.username}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='desktop-nav-items-authdropdown-btnicon' height='14' width='14' fill="#777582" ><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg>
                    
                    </span>
                    <ul className='desktop-nav-items-authdropdown'>
                        {authDropdownItems.map( (items, index) => {
                            return <li key={items.id} className='desktop-nav-items-authdropdown-li' onClick={items.clickHandler}>
                                {items.name}
                            </li>
                        })}
                    </ul>
            
                </div>

                :

               <NavLink
                    to='/signin'
                    className='desktopNav-nav-item'
                    exact="true"
                    activeclassname='active'
                    style={ {textDecoration: 'none'}}
                >
                    SIGN IN
                </NavLink>

            }
                {/* <NavLink
                    to='/signin'
                    className='desktopNav-nav-item'
                    exact="true"
                    activeclassname='active'
                    style={ {textDecoration: 'none'}}
                >
                    SIGN IN
                </NavLink> */}
                <NavLink
                    to='/checkout'
                    className='desktopNav-nav-item'
                    exact="true"
                    activeclassname='active'
                    style={ {textDecoration: 'none'}}
                >
                    {/* <Badge badgeContent={4} color='primary'> */}
                        <ShoppingCartOutlined />
                    {/* </Badge> */}
                </NavLink>
            </div>



        </div>


    </nav> 
  );
};

export default DesktopNav;


