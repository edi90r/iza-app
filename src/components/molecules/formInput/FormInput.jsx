import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

const FormInput = ({
    label = '',
    name,
    type,
    placeholder,
    register,
    required,
    error,
    className = { container: '', wrapper: '', label: '', input: '' },
    ...rest
}) => {
    const classes = {
        container: twMerge(
            `form-control w-full pt-4 ${className.container ? className.container : ''}`,
        ),
        wrapper: `label ${className.wrapper ? className.wrapper : ''}`,
        label: `label-text ${error ? 'text-crimson' : ''} ${
            className.label ? className.label : ''
        }`,
        input: `input input-bordered input-primary w-full ${
            className.input ? className.input : ''
        }`,
    };

    return (
        <label className={`${classes.container}`}>
            {(label || error) && (
                <div className={`${classes.wrapper} `}>
                    <span className={`${classes.label} `}>{error ? error.message : label}</span>
                </div>
            )}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                className={`${classes.input} `}
                {...register(name, { required: required })}
                {...rest}
            />
        </label>
    );
};

FormInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.object,
    className: PropTypes.shape({
        container: PropTypes.string,
        wrapper: PropTypes.string,
        label: PropTypes.string,
        input: PropTypes.string,
    }),
};

export default FormInput;
