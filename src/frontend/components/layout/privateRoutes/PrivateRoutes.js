import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { userData } from '../../../reduxslices/authSlice';
import { useSelector } from 'react-redux';

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