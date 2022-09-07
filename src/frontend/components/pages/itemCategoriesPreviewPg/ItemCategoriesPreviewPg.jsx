import React from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../../../reduxslices/productSlice';
import { ProductCards, ItemCollectionPreview } from '../../utils';
/* TODO: This loads all of the products, now need to organize them by preview: */
function ItemCategoriesPreviewPg() {
    const items = useSelector(selectItems);

    function filterItemCategories(items) {

        let uniqueCategories = items.map(item => item.subcategory)
        .filter( (value, index, self) => self.indexOf(value) === index)

        return uniqueCategories;
    };

    const itemCategories = filterItemCategories(items);

    console.log(filterItemCategories(items))

    return (    
        <div>ItemCategoriesPreview
        {/* TODO: Need to grab the categories, then map out a collection preview component  */}
            {/* {items && items.map(productCard => {
                const products = productCard;
                return (
                    <ItemCollectionPreview
                        key={productCard.id}
                        subcategory={productCard.subcategory}
                        title={productCard.subcategory}
                        products={products}
                    />
                    
                )
            }
                            
            )}  */}

            {items && itemCategories.map( (category, index) => {
                return (
                    <ItemCollectionPreview 
                        key={index}
                        title={category}
                    />
                )
            })}

        </div>
    )
}

export default ItemCategoriesPreviewPg;

{/* <ProductCards 
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
                    /> */}