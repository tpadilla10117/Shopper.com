import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.scss';
/* import { Badge } from "@material-ui/core"; */
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { userData, logout, testData } from '../../../reduxslices/authSlice'; //my Selector
import { useSelector, useDispatch } from 'react-redux';

const DesktopNav = (props) => {

    const userToken = localStorage.getItem('user');
    console.log('my token: ', userToken)
    const dispatch = useDispatch();

    const testSelector = useSelector(testData)

    function logoutUser() {
        console.log('Clicking username')
        /* console.log('My logout action: ', logout()) */
        console.log('Testing: ', testSelector) 
        dispatch(logout());
    };

    const isUserLoggedIn = useSelector(userData);
    console.log('My user data from selector: ', isUserLoggedIn)

    
    
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
                    
                    activeclassname='active'
                    style={ {textDecoration: 'none'}}
                    onClick={logoutUser}
                >
                    Hi, {isUserLoggedIn.recoveredData.username}
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


