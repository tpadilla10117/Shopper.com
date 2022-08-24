import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveUsersSavedItems, selectUsersSavedItems } from '../../../reduxslices/savedItemsSlice';
import { selectItems } from '../../../reduxslices/productSlice';
import { userData } from '../../../reduxslices/authSlice';

import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";


function SavedItemsPg() {

    const dispatch = useDispatch();
/* TODO: NEED to comnpare the items in all products to the ones in savedITems, or find some way to retireve the info from products tabl;e:  */
    const user = useSelector(userData);
    const allProducts = useSelector(selectItems);
    const usersSavedItems = useSelector(selectUsersSavedItems);
    /* console.log(usersSavedItems) */
    

/* Render the existing savedItems once & send user_id: */
    useEffect( () => {
        if(usersSavedItems.length === 0 && user) {
            dispatch(retrieveUsersSavedItems(user.recoveredData.id))
        }
      
    }, [dispatch, user, usersSavedItems])

    


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

            {/* TODO: Saved Products are [ {}, {} ] */}
            {
                usersSavedItems && usersSavedItems.map(items => {
                    return (
                        <div id={items.id} key={items.id}>
                            <p>{items.product_id}</p>
                            {/* {filterSavedProductsOutOfAllProducts(items.product_id)} */}
                        </div>
                    )
                }
            )}

        </section>
    )
}

export default SavedItemsPg;