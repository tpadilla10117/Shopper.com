import React from 'react';
import SendIcon from '@mui/icons-material/Send';

function Newsletter() {
	return (
		<section className='newsletter-parent-container'>
			<h2 className='newsletter-title'>
				15% Off Your First Order
			</h2>
			<p className='newsletter-description'>
				Want exclusive offers and first access to products? Sign up for email alerts.
			</p>

			<div className='newsletter-info-parent-container'>
				<input
					className='newsletter-info-input'
					placeholder='Enter Your Email'
				/>
				<button>
					<SendIcon />
				</button>
			</div>
		</section>
	);
}

export default Newsletter;
