/* The savedItemsService uses Axios for HTTP requests: */

    import axios from "axios";
    
    const user_id = localStorage.getItem('user_id');
console.log("user_id from the thunk: ", user_id)
    const MY_API_URL = `http://localhost:3000/users/${user_id}/my-account/saved-items`;

    const userSavedItemsRequest = () => {

        return axios.get(MY_API_URL)
        .then ( (response) => {
            console.log('My response data from the thunk:', response.data)
            return response.data;
        });
    };

    const savedItemsService = {
        userSavedItemsRequest
    };

    export default savedItemsService;