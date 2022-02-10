import React from 'react';
import { NavbarData } from '../../../seed';
import { NavLink } from 'react-router-dom';
import '../../App.scss';

const DesktopNav = (props) => {

    
  return (
    <nav className='desktopNav-parent-container'>
        <div className='desktop-nav-items-container'>
            {NavbarData.map( (item, index) => {
                return (
                    <NavLink 
                        to={item.path}
                        className='desktopNav-nav-item'
                        exact="true"
                        activeclassname='active'
                        style={ {textDecoration: 'none'}}
                        key={index}
                    >
                        <ul>
                            <li
                                key={index}
                                className={item.title}
                                id='navlinks'
                            >
                                <span>{item.title}</span>
                            </li>
                        </ul>
                    </NavLink>
                )
            })}
        </div>


    </nav> 
  );
};

export default DesktopNav;


