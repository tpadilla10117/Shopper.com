import React, { useEffect } from 'react';
/* import { useNavigate, useLocation } from 'react-router-dom'; */
import { useSelector, useDispatch } from 'react-redux';
import { 
    retrieveUsersSavedItems, 
    selectUsersSavedItems, 
    deleteAUsersSavedItem
} from '../../../reduxslices/savedItemsSlice';

import { userData } from '../../../reduxslices/authSlice';

import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";


function SavedItemsPg() {

    const dispatch = useDispatch();
    const user = useSelector(userData);
    const usersSavedItems = useSelector(selectUsersSavedItems);

/* Render the existing savedItems once & send user_id: */
    useEffect( () => {
        if(usersSavedItems.length === 0 && user) {
            dispatch(retrieveUsersSavedItems(user.recoveredData.id))
        }
      
    }, [dispatch, user, usersSavedItems])

    console.log(usersSavedItems)

/* To remove saved_products: */
    function removeSavedItemHandler(event, product_id) {
        event.preventDefault();
        
        const thunkArguments = { user_id: user.recoveredData.id, product_id: product_id}

        dispatch(deleteAUsersSavedItem( thunkArguments ));
    };


/* Below I render saved products : */
    return (
        <section className='saveditemspg-parent-container'>
            <h1 className='saveditemspg-title'>
                Saved Items
            </h1>
            <div className='saveditemspg-subtitle-wrapper'>
                <p className='saveditemspg-subtitle'>
                    Miss something? Use this page to easily keep track of any items you like or wish to save for later.
                </p>
            </div>

            <div className='saveditemspg-information-parent-container'>
                {
                    usersSavedItems && usersSavedItems.map(items => {
                        return (
                            <div 
                                id={items.id} 
                                key={items.id}
                                className='saveditemspg-saveditem-wrapper'
                            >
                                
                                <img
                                    src={items.image}
                                    alt=''
                                    className='saveditemspg-img'
                                />
                                <div className='saveditemspg-information'>

                                    <div className='saveditemspg-icon-parent-container'>

                                        <FavoriteBorderOutlined 
                                            className='saveditemspg-favoriteborderoutlined'
                                            onClick={(event) => removeSavedItemHandler(event, items.product_id)}
                                        />
                                        {/* <ShoppingCartOutlined 
                                            className='saveditemspg-shoppingcartoutlined'
                                        /> */}
                                    </div>

                                    <p className='saveditemspg-itemtitle'>{items.title}
                                    </p>

                                    <h5 className='saveditemspg-itemprice'>${items.price}</h5>

                                </div>
                            </div>
                        )
                    }
                )}
            </div>


        </section>
    )
}

export default SavedItemsPg;