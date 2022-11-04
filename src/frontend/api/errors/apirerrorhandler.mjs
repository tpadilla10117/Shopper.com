    
    import { ApiError } from "./apierror.mjs";

    export function apiErrorHandler(err, req, res, next) {
        // in production, don't use console.log or console.err
        //isn't async
        console.error(err);

    //Return ApiError instance to a user:
        if (err instanceof ApiError) {
            res.status(err.code).json(err.message);
            return;
        };

        res.status(500).json('Something went wrong');
    };

    /* module.exports = apiErrorHandler; */