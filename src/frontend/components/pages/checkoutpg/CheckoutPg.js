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
                <div key={index} id={item.id}>
                  <h1>{item.title}</h1>

                  <CheckoutProductCard />

                </div>
              ))}
            </div>
        </section>
      )
    }
    
    export default CheckoutPg;