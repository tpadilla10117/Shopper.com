import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import { NavbarData } from '../../../seed';
import { useSelector } from 'react-redux';
import "../../App.scss";

const Sidebar = (/* props */) => {

    /* const { isOpen, navToggle } = props */
    const isToggled = useSelector(state => state.nav.isOpen);
    console.log("Value of isOpen: ", useSelector(state => state.nav.isOpen))

    return (
        <CSSTransition in={isToggled/* isOpen */} timeout={300} unmountOnExit onEnter={ () => /* navToggle */isToggled} onExited={ () => /* navToggle */isToggled} classNames="sidebar-transition">
            <nav className='sidebar-parent-container'>
                <div className='sidebar-icon-container'>
                    {/* TODO: svg className='close-icon' */}

                </div>

                <div className='sidebar-wrapper'>
                    <ul className='sidebar-menu'>
                        <div className='sidebar-link'>
                            {NavbarData.map( (item, index) => {
                                return (
                                    <NavLink to={item.path} activeclassname='active' className='nav-item'
                                    style={ {textDecoration: 'none'} }
                                    key={index}
                                    >
                                        <li key={index} className={item.title}>
                                            <span>{item.title}</span>
                                        </li>
                                    </NavLink>
                                )
                            })}

                        </div>

                    </ul>

                </div>

            </nav>
        </CSSTransition>
    );
};

export default Sidebar;
