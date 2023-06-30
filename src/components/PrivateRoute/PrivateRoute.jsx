import React, { useContext } from 'react';
import './PrivateRoute.css';
import { AuthContext } from '../../context/ContextAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />
};

export default PrivateRoute;