import PropTypes from 'prop-types';

const CardWrapper = ({ children, className }) => {
    const classes = `card h-auto w-full bg-base-100 shadow-md ${className}`;
    return <div className={classes}>{children}</div>;
};

CardWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
export default CardWrapper;
