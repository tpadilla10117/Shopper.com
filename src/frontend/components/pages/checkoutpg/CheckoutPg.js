/* This page shows the Checkout page for a customer */
  import React from "react";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import { 
    selectItems, 
    selectTotal, 
    clearBasket } from "../../../reduxslices/basketslice.js";
  import CurrencyFormat from 'react-currency-format';
  import { 
    CheckoutProductCard,
    
  } from '../../../components/utils.js';
  /* import { useStripe } from '@stripe/react-stripe-js'; */
  import { userData } from '../../../reduxslices/authSlice.js';
  import { loadStripe } from '@stripe/stripe-js';
  import { useDispatch } from 'react-redux';

    
  function CheckoutPg() {

      const items = useSelector( selectItems );
      const total = useSelector ( selectTotal );
      const user = useSelector( userData);
      const dispatch = useDispatch();
      const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

      const MY_API_URL = process.env.REACT_APP_WEB_APP_URL;
      
console.log(user)
      const handleGuestCheckout = async () => {
        const stripe = await stripePromise;

      /* Call backend to create a checkout session: */

        const checkoutSession = await axios.post(`${MY_API_URL}/create-checkout-session`, {
          items: items,
          email: user.email,
          user_id: user.recoveredData.id
        });

      /* Redirect the customer to the Stripe Checkout pg: */

        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.sessionId
        }).then(
          dispatch(clearBasket() )

        );

        if (result.error) {
          alert(result.error.message);
        }

      };


/* TODO: Need to finish component and style: */
    return (
      <section className="checkoutpg-parent-container">
          <div className="checkoutpg-wrapper">

            <h1 className="checkoutpg-title">
              Your Bag
            </h1>

            <div className="checkoutpg-topsection">
              <button className="checkoutpg-topbtn">
                CONTINUE SHOPPING
              </button>

              <div className="checkoutpg-toptextwrapper">
                <span className="checkoutpg-toptext">
                  Shopping Bag ({items.length})
                </span>
               {/*  <CurrencyFormat value={total} prefix={'$'} isNumericString={true} displayType={'text'} thousandSeparator={true} /> */}
               Total: ${total}
              </div>

              <button className="checkoutpg-topbtn"
                onClick={handleGuestCheckout}
              >
                CHECKOUT NOW
              </button>

            </div>

            <div className="checkoutpg-bottomsection">

              <div className="checkoutpg-infosection">
          {/* TODO: Need to update with new info: */}
                {items.map( (item, index) => (
                    <CheckoutProductCard 
                      key={index}
                      cartItem={item}
                      /* id={item.id}
                      title={item.title}
                      description={item.description}
                      productid={item.productid}
                      image={item.image}
                      category_id={item.category_id}
                      subcategory={item.subcategory}
                      price={item.price}
                      quantity={1} */
                    />
                ))}
                
              </div>

            </div>

          </div>
          
      </section>
      
    )
  }
  
  export default CheckoutPg;