/* That path/router for my API at the users endpoint: */

    import express from "express";
    import { requireUser } from "./utils.js";
    import { createUser, getAllUsers, getUser, getUserById, getUserByUsername } from "../../backend/dbadapters/users.js";
    import { getSavedProductsByUserId, deleteSavedProductByProductid, createSavedProduct, getASavedProductByUserId } from "../../backend/dbadapters/saved_products.js";
    import { updateUser } from "../../backend/dbadapters/admin.js";
    import moment from 'moment';
    import jwt from "jsonwebtoken";
    import bcrypt from "bcrypt";
    import { ApiError } from "./errors/apierror.js";

    export const usersRouter = express.Router();

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
        const { username, password, firstname, lastname, location, isAdmin, email, imageURL, active, created_at } = req.body;

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
                active,
                created_at,
            });

            const token = jwt.sign({
                id: user.id,
                username,
                
            }, process.env.REACT_APP_JWT_SECRET);

            const recoveredData = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);

            /* let recoveredData = user; */
            res.send({
                user,
                message: `Thank you for signing up ${username}!`,
                token,
                recoveredData,
                email
            });

        } catch ( {name, message} ) {
            next( {name, message} )
        }
    });

/* Login route for existing users: */

    usersRouter.post('/login', async (req, res, next) => {
        const { username, password } = req.body;

        try {
            const user = await getUserByUsername(username);

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch === true) {
                //create token & return to the user
                let token = jwt.sign( {id: user.id, username}, process.env.REACT_APP_JWT_SECRET);

                const recoveredData = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);

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

/* Remove a user's saved Item by a product_id: */
    usersRouter.delete('/:userId/my-account/saved-items/:productid', async(req, res, next) => {
        const { userId, productid } = req.params;
        try {
            
            if(userId === null || typeof userId === undefined || !userId ) {
                next(ApiError.badRequest('Incorrect type'));
                return;
                
            } else {
                const removeItem = await deleteSavedProductByProductid(productid);

                res.send(removeItem);
                
            };

        } catch(error) {
            next(error);
        }
    });

/* Add a saved item based on product_id & user_id: */
    usersRouter.post('/:userId/my-account/saved-items/:productid', async(req, res, next) => {
        const { userId, productid } = req.params;
        
        try {
            
            if(userId === null || typeof userId === undefined || !userId ) {
                next(ApiError.badRequest('Incorrect type'));
                return;
                
            } else {
                const productObject = { 
                    product_id: productid, 
                    user_id: userId, 
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss') 
                };

                const savedProduct = await createSavedProduct(productObject);

                const usersSavedProducts = await getASavedProductByUserId(savedProduct);

                res.send(usersSavedProducts);
                
            };
        } catch(error) {
            next(error);
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

