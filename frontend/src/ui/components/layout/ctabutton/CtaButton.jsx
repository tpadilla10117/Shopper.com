/* This component abstracts away Call-To-Action Buttons: */
import React from 'react';

function CtaButton({ text, myClass, onClick, btnType, ariaLabel }) {
	return (
		<button className={myClass} onClick={onClick} type={btnType} aria-label={ariaLabel}>
			{text}
		</button>
	);
}

export default CtaButton;
