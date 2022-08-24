import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveUsersSavedItems, selectUsersSavedItems } from '../../../reduxslices/savedItemsSlice';
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

            {
                usersSavedItems && usersSavedItems.map(items => {
                    return (
                        <div 
                            id={items.id} 
                            key={items.id}
                            className='saveditemspg-information-parent-container'
                        >
                            
                            <img
                                src={items.image}
                                alt=''
                                className='saveditemspg-img'
                            />
                            <div className='saveditemspg-information'>
                                <FavoriteBorderOutlined />
                                <ShoppingCartOutlined />
                                <h4>{items.title}</h4>
                                <h5>${items.price}</h5>

                            </div>
                        </div>
                    )
                }
            )}

        </section>
    )
}

export default SavedItemsPg;