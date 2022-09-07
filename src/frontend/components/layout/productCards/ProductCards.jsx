import React, { useEffect } from 'react';
import { CtaButton } from '../../utils';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartItemCount } from '../../../reduxslices/basketslice';
import{ userData } from '../../../reduxslices/authSlice';
import { addASavedItem } from '../../../reduxslices/savedItemsSlice';
import { 
    retrieveUsersSavedItems, 
    selectUsersSavedItems, 
    deleteAUsersSavedItem
} from '../../../reduxslices/savedItemsSlice';
import {
    Favorite,
} from "@material-ui/icons";

function ProductCards({
    id,
    title,
    description,
    productid,
    image,
    category_id,
    subcategory,
    price,
    quantity
}) {

    const dispatch = useDispatch();
    const user = useSelector(userData);
    const usersSavedItems = useSelector(selectUsersSavedItems);
    const usersRetrievedItems = useSelector(retrieveUsersSavedItems);
    let navigateProductRoute = useNavigate();

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            description,
            productid,
            image,
            category_id,
            subcategory,
            price,
            quantity
        };
        dispatch(addCartItemCount(product) )
    };

    function productNavigationHandler(event, productid) {
        event.preventDefault();
        navigateProductRoute(`/shop/products/${subcategory}/${title}/${productid}`)
    };

/* Lets a user save a product for later: */
    function addItemToSavedProducts(event, product_id) {
        event.preventDefault();

        if(user === null || !user.token) {
            navigateProductRoute('/signin')
        } else {
            const productObject = {user_id: user.recoveredData.id, product_id: product_id};
            dispatch(addASavedItem(productObject));
        }
    };

    /* To remove saved_products: */
    function removeSavedItemHandler(event, product_id) {
        event.preventDefault();
        /* event.stopPropagation(); */
        const thunkArguments = { user_id: user.recoveredData.id, product_id: product_id}
        
        dispatch(deleteAUsersSavedItem( thunkArguments ));
    };

    function filterOutAUsersItemHelper(productid) {
        console.log(usersSavedItems.filter( item => item.product_id === productid) );
        return usersSavedItems.filter( item => item.product_id === productid);
    };

/* TODO: Need to conditionally check the heart icon and save / remove */
    function savedItemToggler(event, productid ) {
        /* If you are a logged in user and the item is saved (check by filtering for productid)
        - unsave it on click
        - else save it onclick
        */

        event.preventDefault();
        event.stopPropagation();
        console.log('The id from the props: ', productid)
        
        let filteredId = filterOutAUsersItemHelper(productid);
        console.log('from filteredid: ', filteredId);

        if(user.recoveredData.id && filteredId === productid) {
            /* addItemToSavedProducts(event, productid) */
            console.log(productid)
        } else {
            removeSavedItemHandler(event, productid);
        }
    };

/* Render the existing savedItems once & send user_id: */
    /* useEffect( () => {
        if(usersSavedItems.length === 0 && user) {
            dispatch(retrieveUsersSavedItems(user.recoveredData.id))
        }
    
    }, [dispatch, user, usersSavedItems]); */

    console.log('My users saved items: ', usersSavedItems)
    console.log('My users saved items: ', user)

    return (
        <div 
            className='productcard-parent-container' 
            key={id}
            onClick={(event) => productNavigationHandler(event, productid)}
        >
            
            <figure className='productcard-img-wrapper'>
                <img src={image} className='productcard-img' alt={title}/>
            </figure>

            <div className='productcard-icon-parent-container'>
                <Favorite 
                    className='productcard-favoriteborderoutlined'
                    /* TODO: savedItemToggler needs to be here: */
                    onClick={(event) => savedItemToggler(event, id)}
                />
            </div>

            <div className='productcard-details-wrapper'>

                <h4 className='productcard-title'>{title}</h4>
                {/* <p className='productcard-description'>{description}</p> */}

                <div className='productcard-price-wrapper'>
                    <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} className='productcard-price'/>
                </div>
                
            </div>


            {/* TODO: Dont delete this YET - need to test an add to cart via clicking a product card first*/}

            {/* <CtaButton className={'productcard-button'} text={"Add to Cart"} onClick={addItemToBasket}/> */}

        </div>
    )
}

export default ProductCards;