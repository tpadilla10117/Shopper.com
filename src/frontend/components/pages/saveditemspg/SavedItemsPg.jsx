import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveUsersSavedItems, selectUsersSavedItems } from '../../../reduxslices/savedItemsSlice';
import { userData } from '../../../reduxslices/authSlice';

import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";


function SavedItemsPg() {

    const dispatch = useDispatch();
    const user = useSelector(userData);
    
    const location = useLocation();
    console.log(location)
/* TODO: Need to only render the existing savedItems once, and then re-render if additional items added */
   /*  useEffect( () => {
        if(user) {
            dispatch(retrieveUsersSavedItems())
        }
        console.log('from the savedItems page useEffect')
    }, [dispatch, user]) */

    const usersSavedItems = useSelector(selectUsersSavedItems);
    console.log(usersSavedItems)


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
                        </div>
                    )
                }
            )}

        </section>
    )
}

export default SavedItemsPg;