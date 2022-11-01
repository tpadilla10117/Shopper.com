/* ordersService.js uses axios for GET requests to my backend: */

import axios from "axios";

/* TODO: Will need to change for specific user's orders: */

/* const MY_API_URL = process.env.REACT_APP_WEB_APP_LOCAL_URL; */

/*TODO: For Routing in Deployed app:  */

const MY_API_URL = process.env.REACT_APP_WEB_APP_DEPLOYED_URL;


const ordersRequest = () => {
    return axios.get(`${MY_API_URL}/orders`)
    .then ( (response) => {
        console.log('My orders data from the ordersService: ', response.data);
        return response.data;
    })
};

const individualUsersOrdersRequest = () => {
    return axios.get(`${MY_API_URL}/orders/`)
}

const ordersService = {
    ordersRequest,
    individualUsersOrdersRequest
};

export default ordersService;
