/* The productService uses Axios for HTTP requests: */

    import axios from "axios";

    /* const FAKESTORE_API_URL = "https://fakestoreapi.com/"; */
    const MY_API_URL = "http://localhost:3000/api/products"

/* Logic to request products from fakestoreapi.com : */
    const productRequest = () => {
        /* return axios.get(FAKESTORE_API_URL + "products?limit=5") */
        return axios.get(MY_API_URL)
        .then( (response) => {
            console.log(response.data)
            return response.data;
        });
    };

    const productService = {
        productRequest
    };

    export default productService;