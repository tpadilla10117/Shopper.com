/* Step 1) Where I create my Stripe API Object: */
import Stripe from 'stripe';
export const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);
