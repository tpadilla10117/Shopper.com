import React, { useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavbarData } from '../../../seed';
import { useDispatch, useSelector } from 'react-redux';
import { navToggler } from '../../../reduxslices/navSlice.js';
import { selectItems } from '../../../reduxslices/basketslice.js';
import { scrollTop, SidebarModal } from '../../utils.js';


function SlidingSidebar2() {

    const [sidebar, setSidebar ] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const dispatch = useDispatch();
	const items = useSelector(selectItems);


    const [scrollNav, setScrollNav] = useState(false);
    /* Box and transparent are referencing inline style properties: */
	const box = {
		background: '#fff',
		boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.1)',
		backdropFilter: 'blur(5px)',
	};

	const transparent = {
		background: 'transparent',
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
	}, []);

  return (
    <nav
    className='nav-parent-container'
    style={Object.assign({}, scrollNav ? box : transparent)}
    >
        {/* For the mobile Icon */}
			<div className='nav-mobile-icon-container'>
				<NavLink
					to={'/'}
					exact='true'
					activeclassname='active'
					className='main-nav-logo'
				>
					<h1 className='nav-mobile-header'>Shopper</h1>
				</NavLink>

				<NavLink
					to={'/checkout'}
					exact='true'
					activeclassname='active'
					className='nav-mobile-shoppingcart-parent-container'
					style={{ textDecoration: 'none' }}
				>
					<div className='nav-mobile-shoppingcart-wrapper'>
						<span className='nav-mobile-shoppingcart-counter'>
							{items.length}
						</span>

						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							height='34'
							width='24'
							className='nav-mobile-shoppingcart-icon'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
							/>
						</svg>
					</div>
				</NavLink>

				<button
					type='button'
					aria-label='Reveal Navigation'
					className='nav-mobile-icon'
					/* onClick={navToggle} */
                    onClick={showSidebar}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						height='24'
						width='24'
						viewBox='0 0 24 24'
						stroke='currentColor'
						alt='A three-lined horizontal icon to toggle a navigation menu'
						focusable='false'
						role='presentation'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4 6h16M4 12h16m-7 6h7'
						/>
					</svg>
				</button>
			</div>
     <SidebarModal
	 	active={sidebar}
	 	children={<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
		 <ul className='nav-menu-items' onClick={showSidebar}>
			 <li className='navbar-toggle'>
				 <p>X</p>
			 </li>

			 {NavbarData.map((item, index) => {
			 return (
				 <div key={index} className={item.cName}>
					 <NavLink 
						 to={item.path}
						 activeclassname='active'
						 className='nav-item'
						 style={{ textDecoration: 'none' }}
						 key={index}
						 /* onClick={navToggle} */
					 
					 >
						 <li key={index} className={item.title}>
							 <span>{item.title}</span>
						 </li>
					 </NavLink>
				 </div>
			 );
			 })}

		 </ul>
	 </nav>}
	 />
        
            
   
    </nav>
  )
}

export default SlidingSidebar2