import propTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const SelectionControl = ({
    label,
    name,
    type,
    checked = false,
    title = '',
    className = { wrapper: '', label: '', input: '', extraLabel: '', title: '' },
    extraLabel = '',
    onChange,
    ...rest
}) => {
    const classes = {
        wrapper: twMerge(`label cursor-pointer p-0 ${className.wrapper ? className.wrapper : ''}`),
        title: twMerge(`font-montserrat font-700 ${className.title ? className.title : ''}`),
        input: twMerge(`${className.input ? className.input : ''}`),
        label: twMerge(`label-text me-2 ${className.label ? className.label : ''}`),
        extraLabel: twMerge(`label-text ${className.extraLabel ? className.extraLabel : ''}`),
    };

    return (
        <>
            {title && <h2 className={classes.title}>{title}</h2>}
            <div className={classes.wrapper}>
                <span className={classes.label}>{label}</span>
                <input
                    name={name}
                    type={type}
                    className={classes.input}
                    checked={checked}
                    onChange={onChange}
                    {...rest}
                />
                {extraLabel && <span className={classes.extraLabel}>{extraLabel}</span>}
            </div>
        </>
    );
};

SelectionControl.propTypes = {
    label: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    type: propTypes.oneOf(['checkbox', 'radio']),
    checked: propTypes.bool,
    onChange: propTypes.func.isRequired,
    extraLabel: propTypes.string,
    title: propTypes.string,
    className: propTypes.shape({
        wrapper: propTypes.string,
        label: propTypes.string,
        input: propTypes.string,
        extraLabel: propTypes.string,
    }),
};

export default SelectionControl;
