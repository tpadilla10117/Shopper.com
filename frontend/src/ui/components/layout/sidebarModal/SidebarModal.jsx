import React from 'react';

const SidebarModal = ({ children }) => {
	
	return (
		<section
			className='sidebarmodal-parent-container'
			role='dialog'
			aria-modal='true'
		>
			<div className='sidebarmodal-content'>

				{children}
                
			</div>
		</section>
	);
};

export default SidebarModal;
