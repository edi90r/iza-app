import propTypes from 'prop-types';
import { useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../../admin-panel/components/Atoms/Loader/Loader';

export const ProtectedRoute = ({ role }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated, userRole } = useAuth();

    useEffect(() => {
        let isMounted = true;

        if ((!isAuthenticated || userRole !== role) && isMounted) {
            setIsLoading(false);
            navigate('/login');
            return;
        }

        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, navigate, userRole, role, isLoading]);

    return isLoading ? (
        <div className='fixed inset-0'>
            <Loader className='absolute left-1/2 top-1/2' />
        </div>
    ) : (
        <Outlet />
    );
};

ProtectedRoute.propTypes = {
    role: propTypes.string.isRequired,
};

export default ProtectedRoute;
