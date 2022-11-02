import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { userData } from '../../../reduxslices/authSlice';
import { useSelector } from 'react-redux';

/* PrivateRoutes works with react-router-dom to only allow authenticated users into certain routes:  */

function PrivateRoutes() {
    const user = useSelector(userData);

    return (
        user ? 

        <Outlet/>

        :

        <Navigate to='/signin'/>
    )

};

export default PrivateRoutes;