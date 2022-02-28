/* The service uses Axios for HTTP requests and Local Storage for user info & JWT: */

    import axios from "axios";

    const API_URL = "http://localhost:3000/api/users/";

    /* TODO: Register logic */

    /* TODO: Login Logic */
    const login = (username, password) => {
        return axios.post(API_URL + "login", {
            username,
            password
        })
        .then( (response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
    };

    const logout = () => {
        localStorage.removeItem("user");
    };

    const authService = {
        login,
        logout
    };

    export default authService;