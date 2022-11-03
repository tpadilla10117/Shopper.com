//THIS IS WHERE I LAUNCH THE express.js web server:

   /*  import dotenv from 'dotenv';
    import bodyParser from 'body-parser';
    import morgan from 'morgan';
    import express from 'express';
    import cors from 'cors';
    import { apiRouter } from './frontend/api';
    import { client } from './backend/index';

    export const server = express();
    dotenv.config(); */
    


/* TODO: this is an attempt to do SRR with my react app: */
/* 
    const React = require('react');
    const renderToString = require('react-dom/server').renderToString;
    const App = require('./frontend/components/App');
    const ReactDOMServer = require('react-dom/server'); */

    require('dotenv').config();
    
    const bodyParser = require('body-parser');
    const morgan = require('morgan');
    const express = require('express');
    const server = express();

    const cors = require('cors');

    /* ApiRouter: */
    const apiRouter = require('./frontend/api');
    server.use(cors());

/* This is where I connect to the client (database) : */

    const { client } = require('./backend/index');

    // connect to the server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, async () => {
        console.log(`Server is running on ${PORT}!`);

        try {
            await client.connect();
            console.log('Database is open for business!');
        } catch (error) {
            console.error("Database is closed for repairs!", error);
        }
        
    })

/* Middleware: */

    server.use(bodyParser.json());
    server.use(morgan('dev'));

//Server passes in:
    //the request object (built from the client's request)
    //the response object (which has methods to build and send back a response)
    //the next function, which will move forward to the next matching middleware
    server.use((req, res, next) => {
        console.log("<____Body Logger START____>");
        console.log(req.body);
        console.log("<_____Body Logger END_____>");
    
        next();
    });

    server.use(express.static('public'));

/* My default endpoint for routes: */
    server.use('/', apiRouter);

    module.exports = {
        server
    };
