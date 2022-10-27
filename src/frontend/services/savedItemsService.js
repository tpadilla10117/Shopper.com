/* The savedItemsService uses Axios for HTTP requests: */

    import axios from "axios";
    
    const userSavedItemsRequest = (user_id) => {
    /*TODO: For Testing Routing in Local Environment:  */
        const MY_API_URL = `http://localhost:3000/users/${user_id}/my-account/saved-items`;

    /*TODO: For Routing in Deployed app:  */
        /* const MY_API_URL = `https://shopper-nodejs.onrender.com/users/${user_id}/my-account/saved-items`; */

        return axios.get(MY_API_URL)
        
        .then ( (response) => {
            
            return response.data;
        });
    };

/* Works with authService - dispatched alongside logout() */
    const emptyStateArray = () => {
        return;
    };

    const removeSavedItem = (user_id, product_id) => {
    /*TODO: For Testing Routing in Local Environment:  */
        const MY_API_URL = `http://localhost:3000/users/${user_id}/my-account/saved-items/${product_id}`;

    /*TODO: For Routing in Deployed app:  */
        /* const MY_API_URL = `https://shopper-nodejs.onrender.com/users/${user_id}/my-account/saved-items/${product_id}`; */
        
        return axios.delete(MY_API_URL)

        .then( (response) => {
            return response.data
        });
    };

    const addSavedItem = (user_id, product_id) => {
        const MY_API_URL = `http://localhost:3000/users/${user_id}/my-account/saved-items/${product_id}`;

        return axios.post(MY_API_URL)

        .then( (response) => {
            return response.data;
        });
    };

    const savedItemsService = {
        userSavedItemsRequest,
        emptyStateArray,
        removeSavedItem,
        addSavedItem,
    };

    export default savedItemsService;