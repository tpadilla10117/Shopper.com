/* The productService uses Axios for HTTP requests: */

    import axios from "axios";

    const FAKESTORE_API_URL = "https://fakestoreapi.com/";

/* Logic to request products from fakestoreapi.com : */
    const productRequest = (id, title, price, category, description, image) => {
        return axios.get(FAKESTORE_API_URL + "products?limit=5", {
            id,
            title,
            price,
            category,
            description,
            image
        });
    };

    const productService = {
        productRequest
    };

    export default productRequest;