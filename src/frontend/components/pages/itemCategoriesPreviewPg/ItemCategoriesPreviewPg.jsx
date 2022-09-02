import React from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../../../reduxslices/productSlice';
import { ProductCards } from '../../utils';
/* TODO: This loads all of the products, now need to organize them by preview: */
function ItemCategoriesPreviewPg() {
    const items = useSelector(selectItems);
    return (
        <div>ItemCategoriesPreview

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

        </div>
    )
}

export default ItemCategoriesPreviewPg;