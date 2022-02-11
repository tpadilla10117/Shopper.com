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


    module.exports = usersRouter;
