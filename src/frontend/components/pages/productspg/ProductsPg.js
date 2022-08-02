/* This page is a generic products page: */

import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectItems } from '../../../reduxslices/productSlice';
import { setLoader, isLoading } from '../../../reduxslices/loadingSlice';
import { ProductCards, Loading } from '../../utils';

const ProductsPg = () => {
  
const dispatch = useDispatch();
const items = useSelector(selectItems);
const loadStatus = useSelector(setLoader);


useEffect(() => {

  if(items.length === 0 ) {
    dispatch(isLoading(true))
    setTimeout(() => {
      dispatch(isLoading(false))
    }, 2000);
    dispatch(getProducts());
    
  } else {
    return;
  }

},[dispatch, items])

if(loadStatus) return <Loading/>

/* TODO: Need to fetch from my db:
  - make a product_category table
  - use redux dispatch to fetch categories
*/

return (
  <section className='productspg-parent-container'>
    
    {items && items.map(productCard => {
      return (
        <ProductCards 
          id={productCard.id} 
          key={productCard.id} 
          title={productCard.title} 
          description={productCard.description}
          category={productCard.category}
          image={productCard.image}
          price={productCard.price}  
        />
      )
    }
      
    )}


    {/* TODO: <ProductCategoriesPreview /> */}

  </section>
)};

export default ProductsPg;