/* TODO: This component handles the login functionality for users: */

    import React, { useEffect, useState } from 'react';
    import axios from 'axios';

    const BASE ='http://localhost:3000/api';

    function storeCurrentToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
    };

    const Signin = () => {

    const [ password, setPassword ] = useState('');
    

    return (
        <div>
            
            Signin
            
        </div>
    );
    };

    export default Signin;