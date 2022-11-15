import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavbarData } from '../../../seed';
import { useDispatch, useSelector } from 'react-redux';
import { userData, logout } from '../../../reduxslices/authSlice.js';
import { emptyUsersOrderItems } from '../../../reduxslices/ordersSlice.js';
import { emptyUsersSavedItems } from '../../../reduxslices/savedItemsSlice.js';

function SlidingSidebar2( {isSidebarVisible, showSidebar} ) {
	const navigateRoutes = useNavigate();
	const dispatch = useDispatch();
	const isUserLoggedIn = useSelector(userData);

/* Logout function chain: */
	function logOutUser() {
		dispatch(logout());
		dispatch(emptyUsersSavedItems());
		dispatch(emptyUsersOrderItems());
		navigateRoutes('/', { replace: true });
	}

	function userAuthToggler() {
		if (isUserLoggedIn) {
			logOutUser();
		} else {
			return;
		}
	};

	return (
		<nav className={isSidebarVisible ? 'nav-menu active' : 'nav-menu'}>
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
							>
								<li key={index} className={item.title}>
									<span>{item.title}</span>
								</li>
							</NavLink>
						</div>
					);
				})};

				{isUserLoggedIn && (
					<NavLink
						to='/my-account/saved-items'
						className='nav-item'
						activeclassname='active'
						style={{ textDecoration: 'none' }}
					>
						<span>
							Saved Items
						</span>
					</NavLink>
				)}

				<NavLink
					to={isUserLoggedIn ? '/' : '/signin'}
					className='nav-item'
					activeclassname='active'
					style={{ textDecoration: 'none' }}
				>
					<span onClick={userAuthToggler}>
						{isUserLoggedIn ? 'Sign Out' : 'Sign In'}
					</span>
				</NavLink>

			</ul>
		</nav>
	)
}

export default SlidingSidebar2