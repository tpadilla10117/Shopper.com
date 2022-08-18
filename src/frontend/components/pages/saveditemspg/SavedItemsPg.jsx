import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUsersSavedItems } from '../../../reduxslices/savedItemsSlice';

import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";


function SavedItemsPg() {

    /* const usersSavedItems = useSelector(selectUsersSavedItems);
    console.log(usersSavedItems) */

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
          {/*   {
                usersSavedItems && usersSavedItems.map(items => {
                    return (
                        <div id={items.id}>
                            <p>{items.product_id}</p>
                        </div>
                    )
                }
            )} */}

        </section>
    )
}

export default SavedItemsPg;