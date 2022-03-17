/* This page shows the Checkout page for a customer */
    import React from "react";
    import { useSelector } from "react-redux";
    import { selectItems, selectTotal } from "../../../reduxslices/basketslice.js";
    import { CheckoutProductCard } from '../../../components/utils.js';
    
    function CheckoutPg() {

        const items = useSelector( selectItems );
        const total = useSelector ( selectTotal );


/* TODO: Need to finish component and style: */
      return (
        <section>
            CheckoutPg

            <div>
              {items.map( (item, index) => (
                  <CheckoutProductCard 
                    key={index}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    category={item.category}
                    image={item.image}
                  />
              ))}
            </div>
        </section>
      )
    }
    
    export default CheckoutPg;