import React from 'react';
import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectItems } from '../../../reduxslices/basketslice';
import { selectItems as productsFromSlice } from '../../../reduxslices/productSlice';
import { useParams } from 'react-router-dom';

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


    console.log('Total items in general: ', totalItemsInBasket)

    const productItems = useSelector(productsFromSlice);

    const { prodid } = useParams();
    const productBasedOnRoute = productItems.find( product => product.productid === prodid);
    console.log('My items based on the route: ', productBasedOnRoute.productid)

    console.log('Using find method on items:' , totalItemsInBasket.filter(x => x.productid === productBasedOnRoute.productid ).length)


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
                    {/* TODO: number needs to be dynamic: */}
                        <span className='individualProductPg-info-quantity'>0</span>
                        <Add onClick={addItemToBasket}/>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default IndividualProductCards;