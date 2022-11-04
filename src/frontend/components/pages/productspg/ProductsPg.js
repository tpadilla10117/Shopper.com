/* This page distinguishes renders between single product subcategories and all products: */

  import React from 'react';
  import { Routes, Route } from 'react-router-dom';
  import { 
    ItemCategoriesPreviewPg, 
    SingleItemCategoryPg,
  } from '../../utils.js';

  const ProductsPg = () => {

  return (
    <section className='productspg-parent-container'>

      <Routes>
        <Route index element={<ItemCategoriesPreviewPg/>} />
        <Route path="products/:subcategory" element={<SingleItemCategoryPg />}/>
      </Routes>

    </section>
  )};

  export default ProductsPg;