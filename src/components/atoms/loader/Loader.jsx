import propTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const Loader = ({ className }) => {
    const classes = twMerge(`loading loading-dots loading-lg mx-auto ${className}`);
    return <span className={classes}></span>;
};

Loader.propTypes = {
    className: propTypes.string,
};

export default Loader;
