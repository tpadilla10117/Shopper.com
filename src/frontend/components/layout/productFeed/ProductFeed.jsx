import React from 'react';
import { selectItems } from '../../../reduxslices/productSlice';
import { useSelector } from 'react-redux';
import {
  ProductsLandingFeed
} from '../../utils';

const ProductFeed = () => {

  const items = useSelector(selectItems);

  return (
    <section className='productFeed-parent-container'>
      
      {items && items.map(productCard => {
        return (
          <ProductsLandingFeed
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
        
    </section>
  )
}

export default ProductFeed;