/* Middleware: */

//Middleware for Errors with no user:
    function requireUser(req, res, next) {
        console.log('Here is req.user from utils: ', req.user)
        if(!req.user) {
            next({
                name: 'MissingUserError',
                message: 'You must be logged in as a valid user to perform this action'
            });
        }
        next();
    };


    module.exports = {
        requireUser,
    }