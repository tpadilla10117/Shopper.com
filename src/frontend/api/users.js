/* That path/router for my API at the users endpoint: */

    const express = require('express');
    const usersRouter = express.Router();
    const { requireUser } = require('./utils');
    const {
        createUser, 
        getAllUsers,
        getUser,
        getUserById,
        getUserByUsername
    } = require('../../backend/dbadapters/users');

    const { 
        getSavedProductsByUserId,
    } = require('../../backend/dbadapters/saved_products');

    const {
        updateUser
    } = require('../../backend/dbadapters/admin');

    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const ApiError = require('./errors/apierror');
    /* const {JWT_SECRET} = process.env || 'notSoSecret'; */


    usersRouter.use((req, res, next) => {
        console.log("A request is being made to /users");

        /* res.send({ message: 'hello from /users!'}); */
        next();
    });



/* Errors Handling: */
/* class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Validation Error';
    }
};

class TypeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Type Error';
    };
}; */

/* Route to getAllUsers : */

    usersRouter.get('/', async (req, res) => {
        const users = await getAllUsers();

        res.send({
            users
        });
    });

/* Register Route for new user creation: */
    usersRouter.post('/register', async (req, res, next) => {
        const { username, password, firstname, lastname, location, isAdmin, email, imageURL, active } = req.body;

        try {
            const _user = await getUserByUsername(username);

            if(_user) {
                next( {
                    name: 'UserExistsError',
                    message: 'A user by that username already exists!'
                });
            }

            const user = await createUser({
                username,
                password,
                firstname,
                lastname,
                location,
                email,
                isAdmin,
                imageURL,
                active
            });

            const token = jwt.sign({
                id: user.id,
                username,
                
            }, process.env.JWT_SECRET);

            res.send({
                user,
                message: `Thank you for signing up ${username}!`,token
            });

        } catch ( {name, message} ) {
            next( {name, message} )
        }
    });

/* Login route for existing users: */

    usersRouter.post('/login', async (req, res, next) => {
        const { username, password } = req.body;

        //request must have both a username and a password:
        if (!username || !password ) {
            next ({
                name: 'MissingCredentialsError',
                message: 'Please supply both a valid username and password'
            });
        }

        try {
            const user = await getUserByUsername(username);

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch === true) {
                //create token & return to the user
                let token = jwt.sign( {id: user.id, username}, process.env.JWT_SECRET);

                const recoveredData = jwt.verify(token, process.env.JWT_SECRET);

                //the recovered data...
                res.send( {
                    message: 'Login Success!',
                    recoveredData,
                    token: token,
                    email: user.email,
                });
            } else if (isMatch === false) {
                next({
                    name: 'IncorrectCredentialsError',
                    message: 'Username or password is incorrect!'
                });
            }

        } catch (error) {
            console.log(error);
            next(error);
        }

    });

/* TODO: Route once a user has been logged in: */
/* Not successully tested yet */
    usersRouter.get('/me', requireUser, async (req, res, next) => {
        const user = req.user;

        try {
            res.send(user);
            console.log('Here is req.user: ', user);

        } catch ({name, message}) {
            next({name, message});
        }
    });

/* Get a user by their id: */
    usersRouter.get('/:userId', async (req, res, next) => {
        const { userId } = req.params;

        try {
            const user = await getUserById(userId);

            if(userId === null || typeof userId === undefined || !userId ) {
                next(ApiError.badRequest('Incorrect type'));
                return;
                
            } else {
                res.send(user);
                console.log("Here is my user: ", user);
            }
        } catch (error) {
           next(error)
        }
    });

/* Get a user's saved-items by their id: */
    usersRouter.get('/:userId/my-account/saved-items', async (req, res, next) => {
        const { userId } = req.params;

        try {
            const user = await getUserById(userId);

            if(userId === null || typeof userId === undefined || !userId ) {
                next(ApiError.badRequest('Incorrect type'));
                return;
                
            } else {
                const usersSavedProducts = await getSavedProductsByUserId(user.id);

                res.send(usersSavedProducts);
            };


        } catch (error) {
           next(error)
        }
    });

/* Get a user by their username: */
/* TODO: Need to test */
/* Also, this will be the helper for a user checking their own profile */
    usersRouter.get('/username', async (req, res, next) => {
        const { username } = req.params;
        try {
            const user = await getUserByUsername(username);
            res.send(user);
            console.log("Here is my User: ", username);
        } catch (error) {
            
            next(error);
        };
    });

/* TODO: Delete a user route: */
/* Need to debug */
    usersRouter.delete('/:userId', requireUser, async (req, res, next) => {
        try {
            const user = await getUserById(req.params.userId);

            if (user && user.id === req.user.id) {
                const updatedUser = await updateUser(user.id, { active: false});

                res.send({ user: updatedUser });
            } else {
                next(user ? {
                    name: "UnauthorizedUserError",
                    message: "You cannot delete an account that is not yours"
                } : {
                    name: "UserNotFoundError",
                    message: "That user does not exist"
                });
            }

        } catch (error) {
            next(error);
        }
    });

/* ------------------------------------------------------------ */
/* THIS IS THE PATCH /users/:userId (*admin) Only admins can update a user */

usersRouter.patch('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const { firstname, lastname, email, imageURL, username, password, isAdmin, location } = req.body
      try {     
          const updatedUser = await updateUser({id: userId, firstname, lastname, email, imageURL, username, password, isAdmin, location});
          res.send(updatedUser);
      } catch (error) {
        next(error);
    }
  });


    module.exports = usersRouter;
