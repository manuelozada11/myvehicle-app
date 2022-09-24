import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Component, path }) => {
    return (
        <Route path='signin' element={<Login />} />
    );
}
 
export default PublicRoute;