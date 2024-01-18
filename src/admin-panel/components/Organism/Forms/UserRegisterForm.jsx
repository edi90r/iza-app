import FormInput from '../../Molecules/FormInput/FormInput';
import { useFormContext } from 'react-hook-form';

const UserRegisterForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <>
            <FormInput
                label='Login'
                name='login'
                type='text'
                placeholder='Podaj login'
                register={register}
                required={true}
                error={errors.login}
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
        </>
    );
};

export default UserRegisterForm;
