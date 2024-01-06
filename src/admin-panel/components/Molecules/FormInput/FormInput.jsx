import PropTypes from 'prop-types';

const FormInput = ({ label, name, type, placeholder, register, required, error, ...rest }) => {
    return (
        <label className='form-control w-full'>
            <div className='label'>
                <span className={`label-text ${error ? 'text-crimson' : ''}`}>
                    {error ? error.message : label}
                </span>
            </div>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                className='input input-bordered input-primary w-full'
                {...register(name, { required: required })}
                {...rest}
            />
        </label>
    );
};

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.object,
};

export default FormInput;
