import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductNavSlider() {

/* Default data for slider: */

    let navigateRoutes = useNavigate();

    let navSliderItems = [
        {
            id: 1,
            name: `Mens`,
            image: 'https://i.ibb.co/R70vBrQ/men.png',
            alt: 'A young man posing',
            clickHandler: () => navigateRoutes('/shop/products/'),
        },
        {
            id: 2,
            name: 'Womens',
            image: 'https://i.ibb.co/GCCdy8t/womens.png',
            alt: 'A young woman posing',
            clickHandler: () => navigateRoutes('/shop/products/'),
        },
        {
            id: 3,
            name: 'Hats',
            image: 'https://i.ibb.co/cvpntL1/hats.png',
            alt: 'A young man touching a hat',
            clickHandler: () => navigateRoutes('/shop/products/hats'),
        },
        {
            id: 4,
            name: 'Jackets',
            image: 'https://i.ibb.co/px2tCc3/jackets.png',
            alt: 'A closet full of jackets on hangers',
            clickHandler: () => navigateRoutes('/shop/products/'),
        },
        {
            id: 5,
            name: 'Shoes',
            image: 'https://i.ibb.co/0jqHpnp/sneakers.png',
            alt: 'An assortment of sneakers',
            clickHandler: () => navigateRoutes('/shop/products/shoes'),
        },
        {
            id: 6,
            name: 'Accessories',
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            alt: 'A backpack',
            clickHandler: () => navigateRoutes('/shop/products/'),
        },
    
    ];


    return (
        <section className='productNavSlider-parent-container'>
            
            <div className='productNavSlider-wrapper'>

                {navSliderItems && navSliderItems.map( ({id, image, name, alt, clickHandler}) => {
                    return (
                        <figure 
                            className='productNavSlider-slide'
                            key={id}
                            onClick={clickHandler}
                        >

                            <img 
                                src={image} 
                                alt={alt}
                            />
                            <p>{name}</p>

                        </figure>
                    )
                })}

            </div>
        </section>
    )
}

export default ProductNavSlider;