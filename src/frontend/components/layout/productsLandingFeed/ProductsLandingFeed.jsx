import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";

const ProductsLandingFeed = ({
  id,
  title,
  description,
  price,
  category,
  subcategory,
  productid,
  image,
}) => {

  let navigateProductRoute = useNavigate();

  function searchOutlineHandler(event, productid) {
    event.preventDefault();
    console.log('Clicked seach icon!')
    console.log(`My productId is ${productid} `)
    navigateProductRoute(`/products/${productid}`)
  }

  return (
    <article className='productsLandingFeed-parent-container'>
        <img 
          src={image} 
          alt=''
          className='productsLandingFeed-img'
        />
        <div className='productsLandingFeed-information'>
          {/* TODO: When click this icon, add to shopping cart & redirect to checkout */}
          <div className='productsLandingFeed-icon-parent-container'>
          
            <ShoppingCartOutlined 
            
            />
          </div>
          {/* TODO: When click this icon, take to product page */}
          <div className='productsLandingFeed-icon-parent-container'>
            <SearchOutlined
              /* onClick={navigateProductRoute(`/products/${productid}`)} */
              onClick={(event) => searchOutlineHandler(event, productid)}
            />
          </div>
          {/* TODO: When click this icon, add to faves */}
          <div className='productsLandingFeed-icon-parent-container'>
            <FavoriteBorderOutlined />
          </div>

        </div>

    </article>
  )
}

export default ProductsLandingFeed;