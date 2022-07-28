/* The service uses Axios for HTTP requests and Local Storage for user info & JWT: */

    import axios from "axios";

    const API_URL = "http://localhost:3000/users/";

/* TODO: Register logic */
    const register = (username, password, firstname, lastname, location, email, isAdmin, imageURL, active ) => {
        return axios.post(API_URL + "register", {
            username,
            password,
            email,
            isAdmin,
            imageURL,
            active,
            firstname,
            lastname,
            location
        })
        .then ( (response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.token));
            }
            return response.data;
        })
    };

/* Login Logic */
    const login = (username, password) => {
        return axios.post(API_URL + "login", {
            username,
            password
        })
        /* TODO: This token is never used -> we make a post request each time above */
        .then( (response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.token));
            }
            return response.data;
        })
    };

    const logout = () => {
        console.log('logout from auth service')
        localStorage.removeItem("user");
    };

    const authService = {
        register,
        login,
        logout
    };

    export default authService;