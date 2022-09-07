/* This component renders a row (container) of 4 products per category: */
import React from 'react';
import { ProductCards } from '../../utils';

function ItemCollectionPreview( { title, subcategory, products}) {
    
    return (
        <div>
            <h2>
                {/* {title.toUpperCase()} */}
                {products}
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