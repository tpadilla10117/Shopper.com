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

    usersRouter.use((req, res, next) => {
        console.log("A request is being made to /users");

        /* res.send({ message: 'hello from /users!'}); */
        next();
    });

    usersRouter.get('/', async (req, res) => {
        const users = await getAllUsers();

        res.send({
            users
        });
    });

/* Register Route for new user creation: */
    usersRouter.post('/register', async (req, res, next) => {
        const { username, password, firstname, lastname, location } = req.body;

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
                location
            });

            const token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET);

            res.send({
                message: `Thank you for signing up ${username}!`,token
            });

        } catch ( {name, message} ) {
            next( {name, message} )
        }
    });


    module.exports = usersRouter;
