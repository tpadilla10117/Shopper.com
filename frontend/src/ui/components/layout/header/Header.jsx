/* Header Component is to contain the navigation components: */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
	Nav, 
	DesktopNav, 
	/* Sidebar, */
	SlidingSidebar,
	SidebarModal,
	SlidingSidebar2,
} from '../../utils.js';

import { navStatus } from '../../../reduxslices/navSlice.js';

const Header = () => {

	const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);

/* Toggler for Sidebar Modal: */

	const navIsOpen = useSelector(navStatus);

	const updateComponentView = () => {
		setIsDesktop(window.innerWidth > 1000);
	};

	useEffect(() => {
		window.addEventListener('resize', updateComponentView);
		return () => window.removeEventListener('resize', updateComponentView);
	}, []);

	return (
		<header className='header-parent-wrapper'>
			{isDesktop ? (
				<DesktopNav />
			) : (
				
				<SlidingSidebar2 />
				
			)}

			{/* <Sidebar isOpen={isOpen} navToggle={navToggle} /> */}


		</header>
	);
};

export default Header;

	/* <SidebarModal> */
					{/* <SlidingSidebar2 /> */}
				/* </SidebarModal> */

				/* {navIsOpen && (
				
				
					<SidebarModal>
						<SlidingSidebar2 />
					</SidebarModal>
					
				)}
	 */