import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

const CardWrapper = ({ children, className = '' }) => {
    const classes = twMerge(`card h-auto w-full shadow-md ${className}`);
    return <div className={classes}>{children}</div>;
};

CardWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
export default CardWrapper;
