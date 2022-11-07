/* This component allows a user to logout of their account:  */

import React, { useEffect } from 'react';

const Logout = () => {
	/* TODO: Removes token from localStorage: */
	function clearCurrentUser() {
		localStorage.removeItem('token');
		/* console.log()  */
	}

	/* TODO: handleLogout() should empty out state values */

	return <button className='logout-btn'>Logout</button>;
};

export default Logout;
