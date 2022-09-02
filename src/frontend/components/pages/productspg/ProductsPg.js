/* This page is a generic products page: */

  import React from 'react';
  import { Routes, Route } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import { selectItems } from '../../../reduxslices/productSlice';
  import { 
    ProductCards,
    ItemCategoriesPreviewPg, 
    SingleItemCategoryPg,
  } from '../../utils';

  const ProductsPg = () => {
    
  const items = useSelector(selectItems);

  return (
    <section className='productspg-parent-container'>
      
      {/* {items && items.map(productCard => {
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
        
      )} */}

      

      {/* {items && items.map( productData => {
        const extractedProducts = productData;

        return (
          <ItemCollectionPreview 
            key={productData.id}

          />
        )
      })} */}

      <Routes>
        <Route index element={<ItemCategoriesPreviewPg/>} />
        <Route path="products/:subcategory" element={<SingleItemCategoryPg />}/>
      </Routes>

    </section>
  )};

  export default ProductsPg;