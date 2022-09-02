import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectItems } from '../../../reduxslices/productSlice';
import { ProductCards } from '../../utils';
/* import { selectProductCategoriesMap } from '../../../reduxslices/productCategories/productCategories.selector'; */

/* TODO: This is meant to render all of the products belonging to a subcategory */
function SingleItemCategoryPg() {
    const items = useSelector(selectItems);
    
    const { subcategory } = useParams();
    console.log(subcategory)
    console.log(items)
    
    const filteredItems = items.filter( targettedSubcategory => targettedSubcategory.subcategory === subcategory);

    console.log(filteredItems)

    return (
        <div>singleItemCategoryPg
            {filteredItems && filteredItems.map(productCard => {
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

export default SingleItemCategoryPg;