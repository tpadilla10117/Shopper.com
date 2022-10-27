/* The productService uses Axios for HTTP requests: */

    import axios from "axios";

/*TODO: For Testing Routing in Local Environment:  */
    /* const MY_API_URL = process.env.REACT_APP_WEB_APP_LOCAL_URL; */

/*TODO: For Routing in deployed app:  */
    const MY_API_URL = process.env.REACT_APP_WEB_APP_DEPLOYED_URL;

/* Logic to request products from fakestoreapi.com : */
    const productRequest = () => {
        /* return axios.get(FAKESTORE_API_URL + "products?limit=5") */
      /* TODO: May need to write conditional logic so api call runs only once */  
        return axios.get(`${MY_API_URL}/shop`)
        .then( (response) => {
            console.log(response.data)
            return response.data;
        });
    };

    const productService = {
        productRequest
    };

    export default productService;