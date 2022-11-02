/* ordersService.js uses axios for GET requests to my backend: */

import axios from "axios";

/* TODO: Will need to change for specific user's orders: */

/* const MY_API_URL = process.env.REACT_APP_WEB_APP_LOCAL_URL; */

/*TODO: For Routing in Deployed app:  */

const MY_API_URL = process.env.REACT_APP_WEB_APP_DEPLOYED_URL;


const ordersRequest = () => {
    return axios.get(`${MY_API_URL}/orders`)
    .then ( (response) => {
     
        return response.data;
    })
};

const individualUsersOrdersRequest = (user_id) => {
    
    return axios.get(`${MY_API_URL}/orders/${user_id}`)
    
    .then( (response) => {
        return response.data;
    });
};

const ordersService = {
    ordersRequest,
    individualUsersOrdersRequest
};

export default ordersService;
