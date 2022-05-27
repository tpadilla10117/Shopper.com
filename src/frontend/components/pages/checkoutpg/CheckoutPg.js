/* This page shows the Checkout page for a customer */
    import React from "react";
    import axios from "axios";
    import { useSelector } from "react-redux";
    import { selectItems, selectTotal, removeFromBasket, clearBasket } from "../../../reduxslices/basketslice.js";
    import CurrencyFormat from 'react-currency-format';
    import { 
      CheckoutProductCard,
      
    } from '../../../components/utils.js';
    import { useStripe } from '@stripe/react-stripe-js';
    import { userData } from '../../../reduxslices/authSlice';
    import { loadStripe } from '@stripe/stripe-js';
    import { useDispatch } from 'react-redux';


    
    function CheckoutPg() {

        const items = useSelector( selectItems );
        const total = useSelector ( selectTotal );
        const user = useSelector( userData);
        const dispatch = useDispatch();
        const stripePromise = loadStripe('pk_test_51KepPXD7lX2ovvhcjTQAGgIsYzdaGEnKEYrKcbbfT4GXc29gwu6FrvlYZsdIEIDJLyFIlUBH3qxr0v6tWew3gN4a00mUeJLoOd');
        console.log(stripePromise)

        const handleGuestCheckout = async () => {
          const stripe = await stripePromise;
        /* Call backend to create a checkout session: */
          const checkoutSession = await axios.post('http://localhost:3000/api/create-checkout-session', {
            items: items,
            email: user.email
          });

        /* Redirect the customer to the Stripe Checkout pg: */console.log("sessionId: ", checkoutSession.data.sessionId)
          const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.sessionId
          }).then(
            dispatch(clearBasket() )

          );

          if (result.error) {
            alert(result.error.message);
          }

        };
        
console.log("Here is my total: ", total)
console.log("Here are my items: ", items)

/* TODO: Need to finish component and style: */
      return (
        <section className="checkoutpg-parent-container">
            <div className="checkoutpg-wrapper">

            </div>

            <button onClick={handleGuestCheckout}>Checkout</button>
            <span>
              <CurrencyFormat value={total} prefix={'$'} isNumericString={true} displayType={'text'} thousandSeparator={true} />
            </span>

            <div className="checkoutpg-topsection">

            </div>

            <div className="checkoutpg-bottomsection">

              <div className="checkoutpg-infosection">
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

            </div>
            
        </section>
        
      )
    }
    
    export default CheckoutPg;