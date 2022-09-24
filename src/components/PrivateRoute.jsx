import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} element={
            (props) => sessionStorage.getItem('token')
            ? <Component {...props} />
            : <Navigate to='login' from={ props.location } />
        } />
    );
}
 
export default PrivateRoute;