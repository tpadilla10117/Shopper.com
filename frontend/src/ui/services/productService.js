/* The productService uses Axios for HTTP requests: */

    import axios from "axios";

/* This URL is hitting my API: */
    const MY_API_URL = process.env.REACT_APP_WEB_APP_URL;

/* Logic to request products from fakestoreapi.com : */
    const productRequest = (page, limit) => {
        console.log("From my Service: ", page);
      /* TODO: May need to write conditional logic so api call runs only once */  
        return axios.get(`${MY_API_URL}/shop`)
        .then( (response) => {
            console.log("My response data from hitting the API:", response.data)
            return response.data;
        });
    };

    const productService = {
        productRequest
    };

    export default productService;