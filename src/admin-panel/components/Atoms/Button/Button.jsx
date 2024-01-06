import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Button = ({
    variant = 'primary',
    tag = 'button',
    path,
    children,
    className = '',
    ...rest
}) => {
    const buttonVariants = {
        primary: 'btn-primary',
        success: 'btn-success',
        danger: 'btn-danger',
        warning: 'btn-warning',
        disabled: 'btn-disabled',
    };

    const classes = `btn ${buttonVariants[variant]} text-pureWhite min-w-40 ${className}`;

    return tag === 'button' ? (
        <button className={classes} {...rest}>
            {children}
        </button>
    ) : (
        <Link type='button' className={classes} to={path} {...rest}>
            {children}
        </Link>
    );
};

Button.propTypes = {
    variant: propTypes.oneOf(['primary', 'success', 'danger', 'warning', 'disabled']),
    tag: propTypes.oneOf(['button', 'link']),
    path: propTypes.string,
    children: propTypes.node.isRequired,
    className: propTypes.string,
};
