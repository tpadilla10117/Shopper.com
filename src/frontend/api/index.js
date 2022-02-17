/* I DEFINE AN API ROUTER HERE, AND ATTACH THE OTHER ROUTERS */
    const express = require('express');
    const apiRouter = express.Router();

    const jwt = require('jsonwebtoken');
    const { getUserById } = require('../../backend/dbadapters/users');
    const {JWT_SECRET} = process.env;

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

    apiRouter.use( (req, res, next) => {
        if (req.user) {
            console.log('User is set: ', req.user);
        }
        next();
    })

/* Where I attach my routers...  */

    const usersRouter = require('./users');
    apiRouter.use('/users', usersRouter);

/* Error Handler -> Errors outputted as JSON to the frontend: */
    apiRouter.use( (error, req, res, next) => {
        res.send({
            name: error.name,
            message: error.message
        })  ;
    });

    module.exports = apiRouter;