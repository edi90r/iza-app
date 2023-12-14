import PropTypes from 'prop-types';
import { Context } from './Context';
import { useGlobalState } from './useGlobalState';

export const AdminPanelStateProvider = ({ children }) => {
    const store = useGlobalState();
    return <Context.Provider value={store}>{children}</Context.Provider>;
};

AdminPanelStateProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
