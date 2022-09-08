import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItemCount } from '../../../reduxslices/basketslice';
import{ userData } from '../../../reduxslices/authSlice';
import { addASavedItem } from '../../../reduxslices/savedItemsSlice';
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
  category_id,
  subcategory,
  productid,
  image,
  quantity
}) => {

  let navigateProductRoute = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userData);

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

  function searchOutlineHandler(event, productid) {
    event.preventDefault();
    navigateProductRoute(`/shop/products/${subcategory}/${title}/${productid}`)
  }

  function addItemToCartFromProductFeedCard(event) {
    event.preventDefault();
    dispatch(addCartItemCount(product))
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

  return (
    <figure className='productsLandingFeed-parent-container'>
        <img 
          src={image} 
          alt=''
          className='productsLandingFeed-img'
        />
        <div className='productsLandingFeed-information'>
          {/* TODO: When click this icon, add to shopping cart & redirect to checkout */}
          <div className='productsLandingFeed-icon-parent-container'>
          
            <ShoppingCartOutlined 
              onClick={(event) => addItemToCartFromProductFeedCard(event)}
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
            <FavoriteBorderOutlined 
              onClick={(event) => addItemToSavedProducts(event, id )}
            />
          </div>

        </div>

    </figure>
  )
}

export default ProductsLandingFeed;