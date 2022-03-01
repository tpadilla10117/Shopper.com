/* The productService uses Axios for HTTP requests: */

    import axios from "axios";

    const FAKESTORE_API_URL = "https://fakestoreapi.com/";

/* Logic to request products from fakestoreapi.com : */
    const productRequest = () => {
        return axios.get(FAKESTORE_API_URL + "products?limit=5")
        .then( (response) => {
            console.log(response.data)
            return response.data;
        });
    };

    const productService = {
        productRequest
    };

    export default productService;