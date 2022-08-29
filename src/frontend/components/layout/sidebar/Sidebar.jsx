import React, {useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import { NavbarData } from '../../../seed';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { navToggler } from '../../../reduxslices/navSlice.js';
import "../../App.scss";

const Sidebar = () => {

    const isToggled = useSelector(state => state.nav.isOpen);
    const nodeRef = useRef(null);

    const dispatch = useDispatch();

    const navToggle = () => {
        dispatch(navToggler())
    }


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

                        </div>

                    </ul>

                </div>

            </nav>
        </CSSTransition>
    );
};

export default Sidebar;
