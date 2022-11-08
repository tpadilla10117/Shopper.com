/* This component abstracts away Call-To-Action Buttons: */
import React from 'react';

function CtaButton({ text, myClass, onClick }) {
	return (
		<button className={myClass} onClick={onClick}>
			{text}
		</button>
	);
}

export default CtaButton;
