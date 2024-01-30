import propType from 'prop-types';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Breadcrumb = ({ path, className = '', children, ...rest }) => {
    const classes = twMerge(`font-700 text-primary ${className ? className : null} `);

    return (
        <Link to={path} className={classes} {...rest}>
            {children}
        </Link>
    );
};
Breadcrumb.propTypes = {
    path: propType.string.isRequired,
    className: propType.string,
    children: propType.node.isRequired,
};

export default Breadcrumb;
