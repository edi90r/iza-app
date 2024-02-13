import propTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { useEffect } from 'react';

export const ProtectedRoute = ({ role }) => {
    const navigate = useNavigate();
    const { isAuthenticated, userRole } = useAuth();

    useEffect(() => {
        if (!isAuthenticated || userRole !== role) {
            navigate('/login');
            return;
        }
    }, [isAuthenticated, navigate, userRole, role]);

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    role: propTypes.string.isRequired,
};

export default ProtectedRoute;
