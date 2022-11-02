/* The savedItemsService uses Axios for HTTP requests: */

    import axios from "axios";
    
    const userSavedItemsRequest = (user_id) => {

        const MY_API_URL = process.env.REACT_APP_WEB_APP_URL;
        
        return axios.get(`${MY_API_URL}/users/${user_id}/my-account/saved-items`)
        
        .then ( (response) => {
            
            return response.data;
        });
    };

/* Works with authService - dispatched alongside logout() */
    const emptyStateArray = () => {
        return;
    };

    const removeSavedItem = (user_id, product_id) => {

        const MY_API_URL = process.env.REACT_APP_WEB_APP_URL;
        
        return axios.delete(`${MY_API_URL}/users/${user_id}/my-account/saved-items/${product_id}`)

        .then( (response) => {
            return response.data
        });
    };

    const addSavedItem = (user_id, product_id) => {

        const MY_API_URL = process.env.REACT_APP_WEB_APP_URL;

        return axios.post(`${MY_API_URL}/users/${user_id}/my-account/saved-items/${product_id}`)

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