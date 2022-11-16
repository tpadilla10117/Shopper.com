import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavbarData } from '../../../seed';
import { useDispatch, useSelector } from 'react-redux';
import { userData, logout } from '../../../reduxslices/authSlice.js';
import { emptyUsersOrderItems } from '../../../reduxslices/ordersSlice.js';
import { emptyUsersSavedItems } from '../../../reduxslices/savedItemsSlice.js';
import CloseIcon from '@mui/icons-material/Close';

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
		<nav className={isSidebarVisible ? 'slidingsidebar2 active' : 'slidingsidebar2'}>
			<ul className='slidingsidebar2-items' onClick={showSidebar}>
				<div className='slidingsidebar2-togglebtn'>
					<CloseIcon/>
				</div>

				<div className='slidingsidebar2-nav-item-wrapper'>

					{NavbarData.map((item, index) => {
						return (
							
							<NavLink 
								to={item.path}
								activeclassname='active'
								className='slidingsidebar2-nav-item'
								style={{ textDecoration: 'none' }}
								key={index}
							>
								{item.title}
							</NavLink>
							
						);
					})}

					{isUserLoggedIn && (
						<NavLink
							to='/my-account/saved-items'
							className='slidingsidebar2-nav-item'
							activeclassname='active'
							style={{ textDecoration: 'none' }}
						>
							Saved Items
						</NavLink>
					)}

					<NavLink
						to={isUserLoggedIn ? '/' : '/signin'}
						className='slidingsidebar2-nav-item'
						activeclassname='active'
						style={{ textDecoration: 'none' }}
						onClick={userAuthToggler}
					>
						
							{isUserLoggedIn ? 'Sign Out' : 'Sign In'}
						
					</NavLink>

				</div>

				

			</ul>
		</nav>
	)
}

export default SlidingSidebar2