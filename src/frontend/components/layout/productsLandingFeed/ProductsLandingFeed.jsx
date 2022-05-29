import React from 'react';
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";

const ProductsLandingFeed = ({
  id,
  title,
  description,
  category,
  image,
  price
}) => {

  

  return (
    <article className='productsLandingFeed-parent-container'>
     
        <img 
          src={image} 
          alt=''
          className='productsLandingFeed-img'
        />
        <div className='productsLandingFeed-information'>
          <div className='productsLandingFeed-icon-parent-container'>
            <ShoppingCartOutlined />
          </div>
          <div className='productsLandingFeed-icon-parent-container'>
            <SearchOutlined/>
          </div>
          <div className='productsLandingFeed-icon-parent-container'>
            <FavoriteBorderOutlined />
          </div>

        </div>

    </article>
  )
}

export default ProductsLandingFeed;