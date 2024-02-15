import propTypes from 'prop-types';
import { useProvideAuth } from '../utils/hooks';
import { authContext } from './authContext';

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

ProvideAuth.propTypes = {
    children: propTypes.node.isRequired,
};
