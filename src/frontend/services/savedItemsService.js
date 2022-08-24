/* The savedItemsService uses Axios for HTTP requests: */

    import axios from "axios";
    
    const userSavedItemsRequest = (user_id) => {
        const MY_API_URL = `http://localhost:3000/users/${user_id}/my-account/saved-items`;

        return axios.get(MY_API_URL)
        
        .then ( (response) => {
            
            return response.data;
        });
    };

/* Works with authService - dispatched alongside logout() */
    const emptyStateArray = () => {
        return;
    };

    const savedItemsService = {
        userSavedItemsRequest,
        emptyStateArray
    };

    export default savedItemsService;