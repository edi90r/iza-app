import { twMerge } from 'tailwind-merge';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({
    variant = 'primary',
    tag = 'button',
    path,
    children,
    className = '',
    outline = false,
    ...rest
}) => {
    const buttonVariants = {
        primary: 'btn-primary',
        success: 'btn-success',
        error: 'btn-error',
        warning: 'btn-warning',
        disabled: 'btn-disabled',
    };

    const classes = twMerge(
        `btn ${outline && 'btn-outline'} ${
            buttonVariants[variant]
        } text-pureWhite min-w-40 ${className}`,
    );

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
    variant: propTypes.oneOf(['primary', 'success', 'warning', 'error', 'disabled']),
    outline: propTypes.bool,
    tag: propTypes.oneOf(['button', 'link']),
    path: propTypes.string,
    children: propTypes.node.isRequired,
    className: propTypes.string,
};

export default Button;
