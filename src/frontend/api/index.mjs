/* I DEFINE AN API ROUTER HERE, AND ATTACH THE OTHER ROUTERS */
    
    import express from "express";
    import jwt from "jsonwebtoken";
    import { getUserById } from "../../backend/dbadapters/users.mjs";
    import { apiErrorHandler } from "./errors/apirerrorhandler.mjs";
    import { createStripeCheckoutSession } from "./stripeCheckout.mjs";
    import { usersRouter } from "./users.mjs";
    import { shopRouter } from "./shop.mjs";
    import { ordersRouter } from "./orders.mjs";
    import { webhookRouter } from "./webhook.mjs";


    export const apiRouter = express.Router();

    const {REACT_APP_JWT_SECRET} = process.env;

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
                const { id } = jwt.verify(token, REACT_APP_JWT_SECRET);

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
    
    apiRouter.use('/shop', shopRouter);
    apiRouter.use('/orders', ordersRouter);
    apiRouter.use('/webhook', webhookRouter);
    apiRouter.use('/users', usersRouter);

    apiRouter.use(apiErrorHandler);
