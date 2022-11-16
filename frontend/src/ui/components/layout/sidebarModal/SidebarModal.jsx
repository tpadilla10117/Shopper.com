import React from 'react';

const SidebarModal = ({ children, active }) => {
/* TODO: Check for accessibility */
	return (
		<section
			className={active ? `sidebarmodal-parent-container active` : 'sidebarmodal-parent-container'}
			role='dialog'
			aria-modal='true'
			aria-label='Sidebar Navigation Modal Container'
			tabIndex='-1'
		>
				<div className='sidebarmodal-content'>

					{children}
					
				</div>
		</section>
	);
};

export default SidebarModal;
