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
      
        <ProductsLandingFeed
              id={items[0].id} 
              key={items[0].id} 
              title={items[0].title} 
              price={items[0].price}  
              category_id={items[0].category_id}
              subcategory={items[0].subcategory}
              productid={items[0].productid}
              image={items[0].image}
              quantity={1}
              
          />
        <ProductsLandingFeed
              id={items[1].id} 
              key={items[1].id} 
              title={items[1].title} 
              price={items[1].price}  
              category_id={items[1].category_id}
              subcategory={items[1].subcategory}
              productid={items[1].productid}
              image={items[1].image}
              quantity={1}
              
          />
        <ProductsLandingFeed
              id={items[3].id} 
              key={items[3].id} 
              title={items[3].title} 
              price={items[3].price}  
              category_id={items[3].category_id}
              subcategory={items[3].subcategory}
              productid={items[3].productid}
              image={items[3].image}
              quantity={1}
              
          />
        <ProductsLandingFeed
              id={items[2].id} 
              key={items[2].id} 
              title={items[2].title} 
              price={items[2].price}  
              category_id={items[2].category_id}
              subcategory={items[2].subcategory}
              productid={items[2].productid}
              image={items[2].image}
              quantity={1}
              
          />
        
        
      </div>
        
    </section>
  )
}

export default ProductFeed;