/* The Section container for the menuItem components on the Landing Page: */
import React, { useState, useMemo } from 'react';
import { MenuItem } from '../../utils.js';
import { NavLink } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function Directory() {
	/* Options for Intersection Observers: */
	const intersectionOptions = useMemo(() => {
		return {
			threshold: 0.8,
			root: null,
			rootMargin: '0px 0px 300px 0px',
			triggerOnce: true,
		};
	}, []);

	const { ref: leftDivRef, inView: isVisible } =
		useInView(intersectionOptions);

	const { ref: rightDivRef, inView: isVisible2 } =
		useInView(intersectionOptions);

	const [sections] = useState([
		/*  {
              title: 'hats',
              imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
              id: 1,
              linkUrl: 'shop/products/hats'
            }, */
		{
			title: 'jackets',
			imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
			id: 2,
			linkUrl: 'shop/products/jackets',
			reference: leftDivRef,
		},
		{
			title: 'sneakers',
			imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
			id: 3,
			linkUrl: 'shop/products/sneakers',
			reference: rightDivRef,
		},
		/* {
              title: 'womens',
              imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
              size: 'large',
              id: 4,
              linkUrl: 'shop/products/womens'
            },
            {
              title: 'mens',
              imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
              size: 'large',
              id: 5,
              linkUrl: 'shop/products/mens'
            } */
	]);

	return (
		<section className='directory-parent-container'>
			<NavLink
				key={sections[0].id}
				exact='true'
				to={sections[0].linkUrl}
				activeclassname='active'
				className={
					isVisible
						? `directory-nav-item ${sections[0].title} fade-in`
						: `directory-nav-item ${sections[0].title}`
				}
				ref={sections[0].reference}
			>
				<MenuItem
					key={sections[0].id}
					title={sections[0].title}
					imageUrl={sections[0].imageUrl}
				/>
			</NavLink>
			<NavLink
				key={sections[1].id}
				exact='true'
				to={sections[1].linkUrl}
				activeclassname='active'
				className={
					isVisible2
						? `directory-nav-item ${sections[1].title} fade-in`
						: `directory-nav-item ${sections[1].title}`
				}
				ref={sections[1].reference}
			>
				<MenuItem
					key={sections[1].id}
					title={sections[1].title}
					imageUrl={sections[1].imageUrl}
				/>
			</NavLink>
		</section>
	);
}

export default Directory;
