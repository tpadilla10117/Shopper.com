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
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    /* const {JWT_SECRET} = process.env || 'notSoSecret'; */
    usersRouter.use((req, res, next) => {
        console.log("A request is being made to /users");

        /* res.send({ message: 'hello from /users!'}); */
        next();
    });

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
                message: `Thank you for signing up ${username}!`,token
            });

            res.send({user})

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
                mesaage: 'Please supply both a valid username and password'
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
                    token: token
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

    })




    module.exports = usersRouter;
