import React from 'react';
import { Add, Remove } from "@material-ui/icons";
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../../../reduxslices/basketslice';

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

    const addItemToBasket = () => {
        const product = {
            id, 
            title, 
            price, 
            description, 
            category, 
            image,
        };
        dispatch(addToBasket(product) )
    };

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket( {id} ) );
    };


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
                        <span className='individualProductPg-info-quantity'>0</span>
                        <Add onClick={addItemToBasket}/>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default IndividualProductCards;