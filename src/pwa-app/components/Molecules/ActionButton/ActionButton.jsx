import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const ActionButton = ({ className, children, action, onClick }) => {
    const classes = twMerge(`${className}`);
    return (
        <button className={classes} onClick={onClick} data-action={action}>
            {children}
        </button>
    );
};

ActionButton.propTypes = {
    className: PropTypes.string,
    action: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

export default ActionButton;
