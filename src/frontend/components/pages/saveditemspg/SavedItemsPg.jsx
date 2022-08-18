import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";


function SavedItemsPg() {

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

    </section>
  )
}

export default SavedItemsPg;