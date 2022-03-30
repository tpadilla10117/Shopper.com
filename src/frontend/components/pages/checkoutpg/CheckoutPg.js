/* This page shows the Checkout page for a customer */
    import React from "react";
    import axios from "axios";
    import { useSelector } from "react-redux";
    import { selectItems, selectTotal } from "../../../reduxslices/basketslice.js";
    import CurrencyFormat from 'react-currency-format';
    import { CheckoutProductCard } from '../../../components/utils.js';
    import { useStripe } from '@stripe/react-stripe-js';
    import { userData } from '../../../reduxslices/authSlice';


    
    function CheckoutPg() {

        const items = useSelector( selectItems );
        const total = useSelector ( selectTotal );
        const user = useSelector( userData)

        const handleGuestCheckout = async () => {
          const checkoutSession = await axios.post('/api/create-checkout-session', {
            items: items,
            email: user.email
          })
        }
        
console.log("Here is my total: ", total)

/* TODO: Need to finish component and style: */
      return (
        <section>
            CheckoutPg

            <button onClick={handleGuestCheckout}>Checkout</button>
            <span>
              <CurrencyFormat value={total} prefix={'$'} isNumericString={true} displayType={'text'} thousandSeparator={true} />
            </span>

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