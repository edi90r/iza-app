import PropTypes from 'prop-types';

const CardWrapper = ({ children }) => {
    return <div className='card h-auto w-full bg-base-100 shadow-md'>{children}</div>;
};

CardWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};
export default CardWrapper;
