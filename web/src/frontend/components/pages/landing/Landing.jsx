/* This page is for when a user first travels to the site: */
import React from 'react';
import {
	Directory,
	HeroBanner2,
	ProductFeed,
	Newsletter,
	ProductNavSlider,
	CtaBanner,
	ContentSectionBreak,
	ServiceSectionBreak,
} from '../../utils.js';
import Groomsmen from '../../../assets/images/groomsmen.jpg';

const Landing = () => {
	return (
		<section className='landing-parent-container'>
			<ProductNavSlider />
			<HeroBanner2 />
			<ContentSectionBreak
				Heading={`Featured Categories`}
				sectionClassName={`featuredCategories`}
				headingClassName={`featuredCategories`}
			/>
			<Directory />
			<ProductFeed />
			<ContentSectionBreak
				Heading={`Men's Shop`}
				sectionClassName={`mensShop`}
				headingClassName={`mensShop`}
			/>
			<CtaBanner
				parentContainerClassName={
					'ctaBanner-parent-container-groomsmen'
				}
				figureClassName={'ctaBanner-img-wrapper-groomesmen'}
				image={Groomsmen}
				imageClassName={'ctaBanner-img-groomsmen'}
				imagealt={'Groomsmen posing for a beach picture'}
				figCaptionClassName={'ctaBanner-txt-wrapper-groomsmen'}
				title={'Dress To Impress'}
				titleClassName={'ctaBanner-title-groomsmen'}
				titleRef={'ctaBanner-titleref-groomsmen'}
				description={`Whether you're a guest, the groom, or a groomsman, show up in your best`}
				descriptionClassName={'ctaBanner-description-groomsmen'}
				descriptionRef={'ctaBanner-descriptionref-groomsmen'}
			/>
			<ServiceSectionBreak
				uniqueClassName={'landingServices'}
				leftHeading={'Free Shipping, Returns & Exchanges'}
				leftDescription={`Not 100% sure it's a perfect fit?  We offer free shipping, exchanges, and returns both ways on all orders in the U.S.`}
				leftCta={'See Details'}
				rightHeading={'Fast & Friendly Customer Service'}
				rightDescription={
					'If you have comments, questions, or issues, our Guids are always on call.  Need help?  Contact a Guide.'
				}
				rightCta={'Contact Us'}
			/>
			<Newsletter />
		</section>
	);
};

export default Landing;
