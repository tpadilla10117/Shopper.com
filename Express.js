//THIS IS WHERE I LAUNCH THE express.js web server:

    require('dotenv').config();
    const bodyParser = require('body-parser');
    const morgan = require('morgan');

    const express = require('express');
    const server = express();

    const cors = require('cors');


/* This is where I connect to the client (database) : */

    const { client } = require('./src/backend');

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