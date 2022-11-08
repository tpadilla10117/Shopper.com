import React, { useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../App.scss';
/* import { Badge } from "@material-ui/core"; */
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { userData, logout } from '../../../reduxslices/authSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { emptyUsersSavedItems } from '../../../reduxslices/savedItemsSlice.js';
import { emptyUsersOrderItems } from '../../../reduxslices/ordersSlice.js';
import { KeyboardArrowDown } from '@material-ui/icons';

const DesktopNav = props => {
	let navigateRoutes = useNavigate();
	const [ menuItemIsToggled, setMenuItemIsToggled ] = useState(false);

	function toggleSubMenu(event) {
		event.preventDefault();

		console.log('Clicked the submenu by mouse');
	}

/* Actions & Selectors for authentication:  */
	const userToken = localStorage.getItem('user');
	const dispatch = useDispatch();
	const isUserLoggedIn = useSelector(userData);

/* Logout function chain: */
	function logoutUser() {
		dispatch(logout());
		dispatch(emptyUsersSavedItems());
		dispatch(emptyUsersOrderItems());
		navigateRoutes('/', { replace: true });
	}

/* Default State for authDropDown: */

	const dynamicFrontendUrl = process.env.REACT_APP_FRONTEND_URL;

	let authDropdownItems = [
		{
			id: 1,
			name: 'Orders & Returns',
			clickHandler: () => navigateRoutes('/orders'),
		},
		{
			id: 2,
			name: 'Saved Items',
			clickHandler: () => navigateRoutes('/my-account/saved-items'),
		},
		{
			id: 3,
			name: 'About',
		},
		{
			id: 4,
			name: 'FAQ',
		},
		{
			id: 5,
			name: 'Contact Us',
		},
		{
			id: 6,
			name: 'Sign Out',
			clickHandler: () => logoutUser(),
		},
	];

	let menDropdownItems = [
		{
			id: 1,
			category: 'Shirts',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/shirts`,
		},
		{
			id: 2,
			category: 'Pants',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/pants`,
		},
		{
			id: 3,
			category: 'Jackets',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/jackets`,
		},
		{
			id: 4,
			category: 'Accessories',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/`,
		},
		{
			id: 5,
			category: 'Shoes',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/shoes`,
		},
	];

	let kidsDropdownItems = [
		{
			id: 1,
			category: 'Shirts',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/shirts`,
		},
		{
			id: 2,
			category: 'Pants',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/pants`,
		},
		{
			id: 3,
			category: 'Jackets',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/jackets`,
		},
		{
			id: 4,
			category: 'Accessories',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/accessories`,
		},
		{
			id: 5,
			category: 'Shoes',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/shoes`,
		},
	];

	let womenDropdownItems = [
		{
			id: 1,
			category: 'Shirts',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/shirts`,
		},
		{
			id: 2,
			category: 'Pants',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/pants`,
		},
		{
			id: 3,
			category: 'Jackets',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/jackets`,
		},
		{
			id: 4,
			category: 'Accessories',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/accessories`,
		},
		{
			id: 5,
			category: 'Shoes',
			clickHandler: () => navigateRoutes('/'),
			routes: `${dynamicFrontendUrl}/shop/products/shoes`,
		},
	];

	return (
		<nav
			className='desktopNav-parent-container'
			aria-label='Main Navigation'
		>
			<div className='desktop-nav-items-container'>
				<div className='desktop-nav-items-left'>
					<span className='desktop-nav-items-languages'>EN</span>
					<div className='desktop-nav-items-search-container'>
						<input placeholder='Search' />
						<Search style={{ color: 'gray', fontSize: 16 }} />
					</div>
				</div>

				<NavLink
					className='desktop-nav-items-center'
					to={'/'}
					exact='true'
					activeclassname='active'
				>
					<h1 className='desktop-nav-items-center-h1'>SHOPPER</h1>
				</NavLink>

				<div className='desktop-nav-items-right'>
					<NavLink
						to='/shop'
						className='desktopNav-nav-item'
						exact='true'
						activeclassname='active'
						style={{ textDecoration: 'none' }}
					>
						Products
					</NavLink>

					{/* TODO: Refactor to give unauth state the dropdown items: */}

					{userToken ? (
						<div
							className='desktop-nav-items-authdropdown-container'
							activeclassname='active'
							style={{ textDecoration: 'none' }}
							tabIndex='0'
						>
							<span className='desktop-nav-items-btn'>
								Hi, {isUserLoggedIn.recoveredData.username}
								{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='desktop-nav-items-authdropdown-btnicon' height='14' width='14' fill="#777582" ><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg> */}
								<KeyboardArrowDown className='desktop-nav-items-authdropdown-btnicon' />
							</span>
							<ul className='desktop-nav-items-authdropdown'>
								{authDropdownItems.map((items, index) => {
									return (
										<li
											key={items.id}
											className='desktop-nav-items-authdropdown-li'
											onClick={items.clickHandler}
										>
											{items.name}
										</li>
									);
								})}
							</ul>
						</div>
					) : (
						<NavLink
							to='/signin'
							className='desktopNav-nav-item'
							exact='true'
							activeclassname='active'
							style={{ textDecoration: 'none' }}
						>
							Sign In
						</NavLink>
					)}

					<NavLink
						to='/checkout'
						className='desktopNav-nav-item'
						exact='true'
						activeclassname='active'
						style={{ textDecoration: 'none' }}
					>
						{/* <Badge badgeContent={4} color='primary'> */}
						<ShoppingCartOutlined />
						{/* </Badge> */}
					</NavLink>
				</div>
			</div>

			<div className='desktop-nav-items-container2'>
				<div
					className='desktop-nav-items-container2-dropdown-container'
					activeclassname='active'
					style={{ textDecoration: 'none' }}
				>
					<button 
						onClick={event => toggleSubMenu(event)}
						type='button'
						aria-label='Toggle navigation dropdown'
						className='desktop-nav-items-container2-btn has-submenu'
					>
						Men
						<div className='desktop-nav-items-container2-dropdown'>
							{menDropdownItems.map((items, index) => {
								return (
									<li
										key={items.id}
										className='desktop-nav-items-authdropdown-li'
										/* onClick={items.clickHandler} */
									>
										<a href={items.routes}>{items.category}</a>
									</li>
								);
							})}
						</div>
					</button>

				</div>
				<div
					className='desktop-nav-items-container2-dropdown-container'
					activeclassname='active'
					style={{ textDecoration: 'none' }}
					/* tabIndex='0' */
				>
					<button>Women</button>

					<nav className='desktop-nav-items-container2-dropdown'>
						{womenDropdownItems.map((items, index) => {
							return (
								<li
									key={items.id}
									className='desktop-nav-items-authdropdown-li'
									onClick={items.clickHandler}
								>
									{items.category}
								</li>
							);
						})}
					</nav>
				</div>
				<div
					className='desktop-nav-items-container2-dropdown-container'
					activeclassname='active'
					style={{ textDecoration: 'none' }}
					/* tabIndex='0' */
				>
					<button>Kids</button>

					<nav className='desktop-nav-items-container2-dropdown'>
						{kidsDropdownItems.map((items, index) => {
							return (
								<li
									key={items.id}
									className='desktop-nav-items-authdropdown-li'
									onClick={items.clickHandler}
								>
									{items.category}
								</li>
							);
						})}
					</nav>
				</div>
				<div
					className='desktop-nav-items-container2-dropdown-container'
					activeclassname='active'
					style={{ textDecoration: 'none' }}
					/* tabIndex='0' */
				>
					<button>Jewelry</button>

					{/*  <ul className='desktop-nav-items-dropdown'>
                    {menDropdownItems.map( (items, index) => {
                        return <li key={items.id} className='desktop-nav-items-authdropdown-li' onClick={items.clickHandler}>
                            {items.name}
                        </li>
                    })}
                </ul> */}
				</div>
				<div
					className='desktop-nav-items-container2-dropdown-container'
					activeclassname='active'
					style={{ textDecoration: 'none' }}
					/* tabIndex='0' */
				>
					<button>Hats</button>

					{/*  <ul className='desktop-nav-items-dropdown'>
                    {menDropdownItems.map( (items, index) => {
                        return <li key={items.id} className='desktop-nav-items-authdropdown-li' onClick={items.clickHandler}>
                            {items.name}
                        </li>
                    })}
                </ul> */}
				</div>
				<div
					className='desktop-nav-items-container2-dropdown-container'
					activeclassname='active'
					style={{ textDecoration: 'none' }}
					/* tabIndex='0' */
				>
					<button>Shoes</button>

					{/*  <ul className='desktop-nav-items-dropdown'>
                    {menDropdownItems.map( (items, index) => {
                        return <li key={items.id} className='desktop-nav-items-authdropdown-li' onClick={items.clickHandler}>
                            {items.name}
                        </li>
                    })}
                </ul> */}
				</div>
				<div
					className='desktop-nav-items-container2-dropdown-container'
					activeclassname='active'
					style={{ textDecoration: 'none' }}
					/* tabIndex='0' */
				>
					<button>Accessories</button>

					{/*  <ul className='desktop-nav-items-dropdown'>
                    {menDropdownItems.map( (items, index) => {
                        return <li key={items.id} className='desktop-nav-items-authdropdown-li' onClick={items.clickHandler}>
                            {items.name}
                        </li>
                    })}
                </ul> */}
				</div>
			</div>
		</nav>
	);
};

export default DesktopNav;
