/* Methods to retrieve data from the server.  For protected resources, my HTTP requests need an Authorization header: */

/* If there is a token in Local Storage, return HTTP Authorization header: */
    export default function authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            return {Authorization: 'Bearer ' + user.token};
        } else {
            return {};
        }
    };