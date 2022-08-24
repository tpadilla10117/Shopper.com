/* This page is a generic products page: */

  import React from 'react';
  import { useSelector } from 'react-redux';
  import { selectItems } from '../../../reduxslices/productSlice';
  import { ProductCards } from '../../utils';

  const ProductsPg = () => {
    
  const items = useSelector(selectItems);

  return (
    <section className='productspg-parent-container'>
      
      {items && items.map(productCard => {
        return (
          <ProductCards 
            id={productCard.id} 
            key={productCard.id} 
            title={productCard.title} 
            description={productCard.description}
            productid={productCard.productid}
            image={productCard.image}
            category_id={productCard.category_id}
            subcategory={productCard.subcategory}
            price={productCard.price}  
            created_at={productCard.created_at}
            quantity={1}
          />
        )
      }
        
      )}


      {/* TODO: <ProductCategoriesPreview /> */}

    </section>
  )};

  export default ProductsPg;