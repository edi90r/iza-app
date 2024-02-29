import propTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const PaginationInput = ({ handleClick, inputRef, checked, ariaLabel, className }) => {
    const classes = twMerge('btn btn-square join-item', className);

    return (
        <input
            className={classes}
            type='radio'
            name='options'
            aria-label={ariaLabel}
            checked={checked}
            onClick={() => handleClick(inputRef)}
            readOnly
        />
    );
};

PaginationInput.propTypes = {
    className: propTypes.string,
    handleClick: propTypes.func,
    inputRef: propTypes.object,
    checked: propTypes.bool,
    ariaLabel: propTypes.number,
};

export default PaginationInput;
