/* For default data to be used in project: */

/* import antman from '../ui/assets/images/antman.png'; */
import victoria from '../ui/assets/images/victoriajustice.png';

export const NavbarData = [
	{
		title: 'Home',
		path: '/',
		/* icon: <AiIcons.AiFillHome />, */
		activeObject: null,
		id: 0,
		smooth: true,
		duration: 500,
		spy: true,
		exact: 'true',
		offset: -80,
	},
	{
		title: 'Products',
		path: '/shop',
		/* icon: <AiIcons.AiOutlineUser />, */
		activeObject: null,
		id: 1,
		smooth: true,
		duration: 500,
		spy: true,
		exact: 'true',
		offset: -80,
	},

	{
		title: 'About',
		path: '/about',
		/*  icon: <FaIcons.FaProjectDiagram />, */
		activeObject: null,
		id: 2,
		smooth: true,
		duration: 500,
		spy: true,
		exact: 'true',
		offset: -80,
	},
	{
		title: 'Cart',
		path: '/checkout',
		/* icon: <AiIcons.AiOutlineFilePdf />, */
		cName: 'nav-text',
		activeObject: null,
		id: 3,
		smooth: true,
		duration: 500,
		spy: true,
		exact: 'true',
		offset: -80,
	},
];

export const carouselItems = [
	{
		id: 1,
		img: 'https://i.ibb.co/cXFnLLV/3.png',
		title: 'SUMMER SALE',
		desc: "DON'T COMPROMISE ON STYLE! GET FLAT 25% OFF FOR NEW ARRIVALS.",
		bg: '#f5fafd',
	},
	{
		id: 2,
		img: `${victoria}`,
		title: 'AUTUMN COLLECTION',
		desc: "DON'T COMPROMISE ON STYLE! GET FLAT 25% OFF FOR NEW ARRIVALS.",
		bg: '#fcf1ed',
	},
	{
		id: 3,
		img: 'https://i.ibb.co/DG69bQ4/2.png',
		title: 'EXPRESS YOURSELF',
		desc: "DON'T COMPROMISE ON STYLE! GET FLAT 25% OFF FOR NEW ARRIVALS.",
		bg: '#fbf0f4',
	},
];
