/* This component renders a row (container) of 4 products per category: */
import React from 'react';
import { ProductCards } from '../../utils';
import { useNavigate } from 'react-router-dom';

function ItemCollectionPreview( { title, subcategory}) {

    let navigateProductRoute = useNavigate();

/* Navigates a user to the Route containing items of the passed in subcategory:  */
    function productNavigationHandler(event, subcategory) {
        event.preventDefault();
        navigateProductRoute(`/shop/products/${subcategory}`)
    };
    
    return (
        <div>
            <h2 onClick={(event) => productNavigationHandler(event, title)}>
                {title.toUpperCase()}
            </h2>
            <div>
                {/* {
                    products.filter( (_, index) => index < 4)
                    .map(( product) =>  
                        <ProductCards 
                            key={product.id} 
                            title={product.title}
                        
                        />
                    )
                } */}
                
            </div>
        </div>
    );
};

export default ItemCollectionPreview;