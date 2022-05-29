import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.scss';
/* import { Badge } from "@material-ui/core"; */
import { Search, ShoppingCartOutlined } from "@material-ui/icons";

const DesktopNav = (props) => {

    
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

            <div className='desktop-nav-items-center'>
                <h1 className='desktop-nav-items-center-h1'>SHOPPER</h1>
            </div>

            <div className='desktop-nav-items-right'>
                <NavLink
                    to='/signin'
                    className='desktopNav-nav-item'
                    exact="true"
                    activeclassname='active'
                    style={ {textDecoration: 'none'}}
                >
                    REGISTER
                </NavLink>
                <NavLink
                    to='/signin'
                    className='desktopNav-nav-item'
                    exact="true"
                    activeclassname='active'
                    style={ {textDecoration: 'none'}}
                >
                    LOGIN
                </NavLink>
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


