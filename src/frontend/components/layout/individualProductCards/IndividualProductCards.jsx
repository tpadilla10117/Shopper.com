import React, { useState, useEffect } from 'react';
import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectItems } from '../../../reduxslices/basketslice';
import { selectItems as productsFromSlice } from '../../../reduxslices/productSlice';
import { useParams } from 'react-router-dom';
import './IndividualProductCards.scss';

function IndividualProductCards( {
    id,
    title,
    description,
    price,
    category,
    subcategory,
    productid,
    image
}) {

    const dispatch = useDispatch();
    const totalItemsInBasket = useSelector(selectItems);

    const addItemToBasket = () => {
        const product = {
            id, 
            title, 
            price, 
            description, 
            category, 
            image,
            subcategory,
            productid
        };
        dispatch(addToBasket(product) )
    };

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket( {id} ) );
    };


/* Keep track of how many individual products a user wants to add to the cart */
/* by using the productid from the route: */

    const productItems = useSelector(productsFromSlice);

    const { prodid } = useParams();
    const productBasedOnRoute = productItems.find( product => product.productid === prodid);

    const [ productCount, setProductCount ] = useState(0);

    useEffect( () => {
        setProductCount(totalItemsInBasket.filter(x => x.productid === productBasedOnRoute.productid ).length );
    },[totalItemsInBasket, productBasedOnRoute]);
    

    return (
        <div className='individualProductPg-wrapper'>
            <figure
                className='individualProductPg-img-container'
            >
                <img 
                    src={image}
                    alt=''
                />
            </figure>

            <div
                className='individualProductPg-info-container'
            >

                <h1 className='individualProductPg-info-title'>
                    {title}
                </h1>

                <p
                    className='individualProductPg-info-description'
                >
                    {description}
                </p>
                <span className='individualProductPg-info-price'>${price}</span>

                <div 
                    className='individualProductPg-info-quantity-container'
                >
                    <div
                        className='individualProductPg-info-quantity-totals'
                    >
                        <Remove onClick={removeItemFromBasket}/>
                    
                        <span className='individualProductPg-info-quantity'>{productCount}</span>

                        <Add onClick={addItemToBasket}/>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default IndividualProductCards;