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
		title: 'FAQ',
		path: '/faq',
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
	{
		title: 'Contact Us',
		path: '/contact',
		/* icon: <AiIcons.AiOutlineFilePdf />, */
		cName: 'nav-text',
		activeObject: null,
		id: 4,
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
		img: `${victoria}`,
		title: 'WINTER COLLECTION',
		desc: "DISCOVER A WORLD OF HOLIDAY MAGIC WITH ELEVATED GIFTS TO INSPIRE EVERYONE ON YOUR LIST",
		bg: '#fcf1ed',
	},
	{
		id: 2,
		img: 'https://i.ibb.co/DG69bQ4/2.png',
		title: 'EXPRESS YOURSELF',
		desc: "DISCOVER ELEGANTLY TAILORED STYLES FOR OCCASIONS TO REMEMBER",
		bg: '#fbf0f4',
	},
	{
		id: 3,
		img: 'https://i.ibb.co/cXFnLLV/3.png',
		title: 'SUMMER SALE',
		desc: "DON'T COMPROMISE ON STYLE! GET FLAT 25% OFF FOR NEW ARRIVALS.",
		bg: '#f5fafd',
	},
];
