import propType from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../../../../utils/helpers';
import FormInput from '../../Molecules/FormInput/FormInput';
import Button from '../../Atoms/Button/Button';

const UserRegisterForm = ({ edit }) => {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        trigger,
    } = useFormContext();

    const handleClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            navigate('/admin/add-user/summary');
        }
    };

    const active = edit ? 'warning' : 'success';

    return (
        <>
            <FormInput
                label='Email'
                name='email'
                type='email'
                placeholder='Podaj email'
                register={register}
                required={true}
                error={errors.email}
            />

            <div className='flex justify-between gap-x-8'>
                <FormInput
                    label='Hasło'
                    name='password'
                    type='password'
                    placeholder='Podaj hasło'
                    register={register}
                    required={true}
                    error={errors.password}
                />

                <FormInput
                    label='Powtórz hasło'
                    name='repeatPassword'
                    type='password'
                    placeholder='Powtórz hasło'
                    register={register}
                    required={true}
                    error={errors.repeatPassword}
                />
            </div>
            <Button
                type={edit ? 'submit' : 'button'}
                onClick={edit ? null : () => handleClick()}
                variant={isObjectEmpty(errors) ? active : 'disabled'}
                className='mt-8'
            >
                {edit ? 'Edytuj' : 'Dalej'}
            </Button>
        </>
    );
};

UserRegisterForm.propTypes = {
    edit: propType.bool,
};

export default UserRegisterForm;
