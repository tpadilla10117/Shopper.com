/* This component renders a row (container) of 4 products per category: */
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductCards } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { selectItems } from '../../../reduxslices/productSlice';

function ItemCollectionPreview( { title, subcategory, products}) {

    const items = useSelector(selectItems);
    let navigateProductRoute = useNavigate();

/* Navigates a user to the Route containing items of the passed in subcategory:  */
    function productNavigationHandler(event, subcategory) {
        event.preventDefault();
        navigateProductRoute(`/shop/products/${subcategory}`)
    };

/* Renders JSX <ProductCards/> after first filtering for products based on subcategory: */
    
    function renderFilteredItems(originalItems, subcategory) {
        let uniqueItems = originalItems.filter(
            item => item.subcategory.includes(subcategory)
        )
        .map(productCard => 
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
        
        return uniqueItems;
    };
    
    return (
        <div>
            <h2 onClick={(event) => productNavigationHandler(event, title)}>
                {title.toUpperCase()}
            </h2>
            <div>

                {renderFilteredItems(items, title)}
                
            </div>
        </div>
    );
};

export default ItemCollectionPreview;