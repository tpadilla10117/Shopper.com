/* I DEFINE AN API ROUTER HERE, AND ATTACH THE OTHER ROUTERS */
    const express = require('express');
    const apiRouter = express.Router();

    const jwt = require('jsonwebtoken');
    const { getUserById } = require('../../backend/dbadapters/users');
    const {JWT_SECRET} = process.env;
    const apiErrorHandler = require('./errors/apirerrorhandler');
    const createStripeCheckoutSession = require('./stripeCheckout');

/* For API Requests...*/
    apiRouter.use(async (req, res, next) => {
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');

        if (!auth) {
            next();
        } else if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length);

            try {
                //read the token and attempt to decrypt...
                const { id } = jwt.verify(token, JWT_SECRET);

                if (id) {
                    req.user = await getUserById(id);
                    next();
                }
        
            } catch ({ name, message}) {
                next({ name, message});
            }
        } else {
            next({
                name: 'AuthorizationHeaderError',
                message: `Authorization token must start with ${prefix}`
            });
        }
    });

/* Use .use to add middleware */
    apiRouter.use( (req, res, next) => {
        if (req.user) {
            console.log('User is set: ', req.user);
        }
        next();
    })

    apiRouter.get('/', (req, res) => {
        res.send({
            message: "Greetings from api/"
        })
    })

/* Webhook TODO: */
    apiRouter.post('/webhook', (req, res) => {
    /* extract some events from stripe: */
        const event = req.body;
        console.log("Here is my req.body from webhook: ",req.body)

        switch(event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log("Checkout Session ID: ", session.id)
                break;
            case 'payment_intent.created':
                const paymentIntent = event.data.object;
                console.log("PatmentIntent Created: ", paymentIntent.id);
                break;
            default:
                console.log('Unkown event type: ' + event.type)
        }
        res.send({ message: 'success from webhook!'})
    });

/* Testing Stripe checkout Route: */
    apiRouter.post('/create-checkout-session', createStripeCheckoutSession);

/* Middleware where I attach my routers and handle requests...  */
    
    const usersRouter = require('./users');
    apiRouter.use('/products', require('./products'));
    apiRouter.use('/users', usersRouter);

    apiRouter.use(apiErrorHandler);

    module.exports = apiRouter;