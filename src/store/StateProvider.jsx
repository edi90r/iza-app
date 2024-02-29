import PropTypes from 'prop-types';
import { Context } from './Context';
import { useGlobalState } from './useGlobalState';

export const StateProvider = ({ children }) => {
    const store = useGlobalState();
    return <Context.Provider value={store}>{children}</Context.Provider>;
};

StateProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
