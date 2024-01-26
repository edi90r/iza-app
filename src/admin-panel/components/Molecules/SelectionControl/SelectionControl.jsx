import propTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const SelectionControl = ({
    label,
    name,
    type,
    checked = false,
    className = { wrapper: '', label: '', input: '' },
    onChange,
    ...rest
}) => {
    const classes = {
        wrapper: twMerge(`label cursor-pointer p-0 ${className.wrapper ? className.wrapper : ''}`),
        label: twMerge(`label-text me-2 ${className.label ? className.label : ''}`),
        input: twMerge(`${className.input ? className.input : ''}`),
    };

    return (
        <label className={classes.wrapper}>
            <span className={classes.label}>{label}</span>
            <input
                name={name}
                type={type}
                className={classes.input}
                checked={checked}
                onChange={onChange}
                {...rest}
            />
        </label>
    );
};

SelectionControl.propTypes = {
    label: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    type: propTypes.oneOf(['checkbox', 'radio']),
    checked: propTypes.bool,
    onChange: propTypes.func.isRequired,
    className: propTypes.shape({
        wrapper: propTypes.string,
        label: propTypes.string,
        input: propTypes.string,
    }),
};

export default SelectionControl;
