import React, { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { carouselItems } from '../../../seed.js';
import { CtaButton } from '../../utils.js';

function Herobanner2() {
	const [carouselIndex, setCarouselIndex] = useState(0);
	const slideLength = carouselItems.length;

	let btnClickNavigateRoutes = useNavigate();

/* Functions for Arrow Buttons: */

	const nextSlide = () => {
		setCarouselIndex(
			carouselIndex === slideLength - 1 ? 0 : carouselIndex + 1
		);
	};

	const previousSlide = () => {
		setCarouselIndex(
			carouselIndex === 0 ? slideLength - 1 : carouselIndex - 1
		);
	};

/* Click handler for <CtaButton/>: */
	function ctaButtonClickHandler(event) {
		event.preventDefault();
		event.stopPropagation();
		btnClickNavigateRoutes('/shop');
	};

	return (
		<section className='herobanner2-parent-container'>
			<div className='herobanner2-arrow-wrapper' style={{ left: '10px' }}>
				<ArrowLeftOutlined
					className='herobanner2-arrow-left'
					onClick={previousSlide}
				/>
			</div>

			<div className='herobanner2-wrapper'>
				{carouselItems.map((item, index) => (
					<div
						className={
							index === carouselIndex
								? 'herobanner2-slide active'
								: 'herobanner2-slide'
						}
						style={{ backgroundColor: `${item.bg}` }}
						key={item.id}
					>
						<figure className='herobanner2-imgcontainer'>
							<img src={item.img} alt='' />
						</figure>
						<div className='herobanner2-infocontainer'>
							<h1 className='herobanner2-h1'>{item.title}</h1>
							<p className='herobanner2-description'>
								{item.desc}
							</p>
							{/* <button className='herobanner2-btn'>
								SHOP NOW
							</button> */}
							<CtaButton
								text={'SHOP NOW'}
								myClass={'herobanner2-btn'}
								btnType={'button'}
								ariaLabel={'Navigate to Products Page'}
								onClick={ctaButtonClickHandler}
							/>
						</div>
					</div>
				))}
			</div>

			<div
				className='herobanner2-arrow-wrapper'
				style={{ right: '10px' }}
			>
				<ArrowRightOutlined
					className='herobanner2-arrow-right'
					onClick={nextSlide}
				/>
			</div>
		</section>
	);
}

export default Herobanner2;
