//THIS IS WHERE I LAUNCH THE express.js web server:

    import dotenv from "dotenv";
    import bodyParser from "body-parser";
    import morgan from "morgan";
    import express from "express";
    import cors from "cors";
    import { client } from "./backend/index.mjs";
    import { createStore } from "redux";
    import { Provider } from "react-redux";
    import { renderToString } from "react-dom/server.js";
    /* import store from './frontend/reduxglobalstore/Store.js'; */
    /* import App from './frontend/components/App.js'; */

/* ApiRouter: */
    import { apiRouter } from "./frontend/api/index.mjs";
    
/* This is where I connect to the client (database) : */

    const server = express();
    server.use(cors());
    dotenv.config();

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

/* Fired Every Time server-side receives a request: */
    function handleRender(req, res) {
        //Create a new Redux store instance
        /* const storeInstance = createStore(store); */

        //Render the component to a string:
        const html = renderToString(
            {/* <Provider store={storeInstance}>
                <App />
            </Provider> */}
        )
    };

    function renderFullPage(html, preloadedState) {

    };

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

/* Serve up static files: */
    server.use(express.static('public'));

/* My default endpoint for routes: */
    server.use('/', apiRouter);

