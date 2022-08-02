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

/* Use .use to add middleware: */

    apiRouter.use((req, res, next) => {
        if (req.originalUrl === '/webhook') {
        next();
        } else {
        express.json()(req, res, next);
        console.log("Here is original URL: ", req.originalUrl);
        }
    });

    apiRouter.use( (req, res, next) => {
        if (req.user) {
            console.log('User is set: ', req.user);
        }
        next();
    })

   /*  apiRouter.get('/', (req, res) => {
        res.send({
            message: "Greetings from api/"
        })
    }) */


/* Testing Stripe checkout Route: */
    apiRouter.post('/create-checkout-session', createStripeCheckoutSession);

/* Middleware where I attach my routers and handle requests...  */
    
    const usersRouter = require('./users');
    apiRouter.use('/shop', require('./shop'));
    apiRouter.use('/orders', require('./orders'));
    apiRouter.use('/webhook', require('./webhook'));
    apiRouter.use('/users', usersRouter);

    apiRouter.use(apiErrorHandler);

    module.exports = apiRouter;