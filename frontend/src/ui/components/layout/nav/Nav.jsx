import React, { useState, useEffect } from 'react';
import { NavbarData } from '../../../seed.js';
import { NavLink } from 'react-router-dom';
import { scrollTop, SidebarModal, SlidingSidebar2 } from '../../utils.js';
import { /* useDispatch, */ useSelector } from 'react-redux';
/* import { navToggler } from '../../../reduxslices/navSlice.js'; */
import { selectItems } from '../../../reduxslices/basketslice.js';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Nav = props => {
	/* useDispatch lets me dispatch / shoot actions into the Global Store: */
	/* const dispatch = useDispatch(); */
	const items = useSelector(selectItems);

	const [scrollNav, setScrollNav] = useState(false);
	const [isSidebarVisible, setIsSidebarVisible ] = useState(false);
    const showSidebar = () => setIsSidebarVisible(!isSidebarVisible);

	/* const navToggle = () => {
		dispatch(navToggler());
	};
 */
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
			<div className='nav-items-container'>
				{NavbarData.map((item, index) => {
					return (
						<NavLink
							to={item.path}
							exact='true'
							activeclassname='active'
							className='main-nav-item'
							style={{ textDecoration: 'none' }}
							key={index}
						>
							<li
								key={index}
								className={item.title}
								onClick={scrollTop}
								id='navlinks'
							>
								<span>{item.title}</span>
							</li>
						</NavLink>
					);
				})}
			</div>

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

						<ShoppingCartIcon 
							className='nav-mobile-shoppingcart-icon'
						/>
					</div>
				</NavLink>

				<button
					type='button'
					aria-label='Reveal Navigation'
					className='nav-mobile-icon-btn'
					/* onClick={navToggle} */
					onClick={showSidebar}
				>
				
					<MenuIcon 
						className='nav-mobile-icon'
					/>
				</button>
			</div>

		{/* This is where I render my Modal with a sidebar: */}
			<SidebarModal
				exitModal={showSidebar}
				active={isSidebarVisible}
				children={
					<SlidingSidebar2 
						isSidebarVisible={isSidebarVisible}
						showSidebar={showSidebar}
					/>
				}
			/>

		</nav>
	);
};

export default Nav;
