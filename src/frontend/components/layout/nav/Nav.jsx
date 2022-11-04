import React, {useState, useEffect} from 'react';
/* import "./Nav.scss"; */
import {NavbarData} from '../../../seed.js';
import {NavLink} from 'react-router-dom';
import {scrollTop} from '../../utils.js';
import { useDispatch } from 'react-redux';
import { navToggler } from '../../../reduxslices/navSlice.js';
import { useSelector } from 'react-redux';
import { selectItems } from '../../../reduxslices/basketslice.js';

const Nav = (props) => {

/* useDispatch lets me dispatch / shoot actions into the Global Store: */
    const dispatch = useDispatch();
    const items = useSelector( selectItems );

    const [ scrollNav, setScrollNav ] = useState(false);

    const navToggle = () => {
        dispatch(navToggler())
    }

/* Box and transparent are referencing inline style properties: */
   const box = {
    background: '#fff',
    boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(5px)'
    };

    const transparent =  {
        background: 'transparent'
    };

/* Changes the ScrollNav styles based on a user's scroll: */
   const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', changeNav);

        return () => window.removeEventListener('scroll', changeNav);
    }, [] );


  return (
    <nav className='nav-parent-container' style={Object.assign({}, scrollNav ? box : transparent)}>
        <div className='nav-items-container'>
        
            {NavbarData.map( (item, index) => {
                return (
                    <NavLink to={item.path} 
                        exact='true'
                        activeclassname='active'
                        className='main-nav-item'
                        style={ {textDecoration: "none"} } 
                        key={index}
                    >
                        <li key={index}
                            className={item.title}
                            onClick={scrollTop}
                            id="navlinks"
                        >
                            <span>{item.title}</span>

                        </li>
                    </NavLink>
                )
            })}

        </div>


    {/* For the mobile Icon */}
        <div className='nav-mobile-icon-container'>
            <NavLink to={'/'}
                exact='true'
                activeclassname='active'
                className='main-nav-logo'
            >
                <h1 className='nav-mobile-header'>Shopper</h1>
            </NavLink>

            <NavLink to={'/checkout'}
                exact='true'
                activeclassname='active'
                className='nav-mobile-shoppingcart-parent-container'
                style={{ textDecoration: 'none' }}
            >
                <div className='nav-mobile-shoppingcart-wrapper'>
                    <span className='nav-mobile-shoppingcart-counter'>{items.length}</span>

                    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" height="34" width="24"className='nav-mobile-shoppingcart-icon'>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
            </NavLink>

            <svg xmlns="http://www.w3.org/2000/svg" className="nav-mobile-icon" fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor" onClick={navToggle} alt="A three-lined horizontal icon to toggle a navigation menu">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>

        </div>


    </nav>
  ) ;
}

export default Nav;

