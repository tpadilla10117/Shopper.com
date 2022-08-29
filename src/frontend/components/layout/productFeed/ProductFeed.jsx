import React from 'react';
import { selectItems } from '../../../reduxslices/productSlice';
import { useSelector } from 'react-redux';
import {
  ProductsLandingFeed
} from '../../utils';

const ProductFeed = () => {
/* TODO: BUGGGGG -> This renders, but relies on the Thunk on the /products route */
  const items = useSelector(selectItems);

  return (
    <section className='productFeed-parent-container'>
      <h2 className='productFeed-h2'>
        Featured Highlights
      </h2>
      
      <div className='productFeed-wrapper'>
        {items && items.map(productCard => {
          return (
            <ProductsLandingFeed
              id={productCard.id} 
              key={productCard.id} 
              title={productCard.title} 
              description={productCard.description}
              price={productCard.price}  
              category_id={productCard.category_id}
              subcategory={productCard.subcategory}
              productid={productCard.productid}
              image={productCard.image}
              quantity={1}
            />
          )
        }
          
        )}
      </div>
        
    </section>
  )
}

export default ProductFeed;