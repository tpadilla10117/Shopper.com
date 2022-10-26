/* Step 1) Where I create my Stripe API Object: */
    const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

    module.exports = stripe;