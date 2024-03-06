import propTypes from 'prop-types';
import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../components/atoms/loader/Loader';

export const ProtectedRoute = ({ role }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated, userRole, setError } = useAuth();

    useEffect(() => {
        let isMounted = true;

        if ((!isAuthenticated || userRole !== role) && isMounted) {
            setIsLoading(false);
            setError({
                message: 'Brak dostępu - Nie możesz zalogować się do aplikacji jako administrator',
            });
            navigate('/login');
            return;
        }

        setIsLoading(false);
        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, navigate, userRole, isLoading, role, setError]);

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
