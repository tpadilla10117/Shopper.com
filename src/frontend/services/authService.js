/* The service uses Axios for HTTP requests and Local Storage for user info & JWT: */

    import axios from "axios";

/* TODO: Use for Local Environment: */
    /* const API_URL = "http://localhost:3000/users/"; */
    /* const API_URL = process.env.REACT_APP_WEB_APP_LOCAL_URL; */

/*TODO: For Routing in Deployed app:  */

    /* const API_URL = "https://shopper-nodejs.onrender.com/users/" */
    const API_URL = process.env.REACT_APP_WEB_APP_DEPLOYED_URL;

/* Register logic */
    const register = (username, password, firstname, lastname, location, email, isAdmin, imageURL, active ) => {
        return axios.post(`${API_URL}/users/register`, {
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
        return axios.post(`${API_URL}/users/login`, {
            username,
            password
        })
       
        .then( (response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.token));
            };

            if(response.data.token) {
                localStorage.setItem("user_id", JSON.stringify(response.data.recoveredData.id));
            };

            return response.data;
        })
    };

    const logout = () => {
        
        localStorage.removeItem("user_id");
        return localStorage.removeItem("user");
        
    };

    const authService = {
        register,
        login,
        logout
    };

    export default authService;