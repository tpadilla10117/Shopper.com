/* ordersService.js uses axios for GET requests to my backend: */

import axios from "axios";

/* TODO: Will need to change for specific user's orders: */
/* const MY_API_URL = "http://localhost:3000/orders"; */
const MY_API_URL = "https://shopper-nodejs.onrender.com/orders";


const ordersRequest = () => {
    return axios.get(MY_API_URL)
    .then ( (response) => {
        console.log('My orders data from the ordersService: ', response.data);
        return response.data;
    })
};

const ordersService = {
    ordersRequest
};

export default ordersService;
