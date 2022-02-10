import React, {useState, useEffect} from 'react';
import "./Nav.scss";
import {NavbarData} from '../../../seed';
import {NavLink} from 'react-router-dom';
import {scrollTop} from '../../utils';

const Nav = (props) => {

    const {navToggle} = props;
    const [ scrollNav, setScrollNav ] = useState(false);


    /* Box and transparent are referencing inline style properties: */
   const box = {
    background: /* 'hsla(0,0%,42.7%,.12)' */'#24496A',
    boxShadow: '0 3px 30px rgb(0 0 0 / 10%)',
    backdropFilter: 'blur(5px)'
    };

    const transparent =  {
        background: 'transparent'
    };


    /* TODO: Event listener not firing regardless of logic: */
   const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    console.log(window.scrollY);


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

        {/* TODO: For the mobile Icon */}
        <div className='nav-mobile-icon-container'>
           
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-mobile-icon" fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor" onClick={navToggle} alt="A three-lined horizontal icon to toggle a navigation menu">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>

        </div>


    </nav>
  ) ;
}

export default Nav;

