import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import Logo from '../../admin-panel/components/Atoms/Logo/Logo';
import FormInput from '../../admin-panel/components/Molecules/FormInput/FormInput';
import Button from '../../admin-panel/components/Atoms/Button/Button';

const PasswordReset = () => {
    const [formFields, setFormFields] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);
    const { confirmThePasswordReset, error, setError } = useAuth();

    let oobCode = useSearchParams().get('oobCode');

    const handleUserChange = (event) => {
        const { name, value } = event.currentTarget;
        setFormFields((formFields) => ({ ...formFields, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDegault();

        if (formFields.password !== formFields.repeatPassword) {
            return setError({ message: 'Hasła nie są takie same' });
        }

        try {
            if (oobCode) {
                await confirmThePasswordReset(oobCode, formFields.repeatPassword);
                setFormFields(null);
                setSuccessMessage(true);
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-action-code') {
                setError({ message: 'Link do resetowania hasła jest nieprawidłowy' });
            } else if (error.code === 'auth/expired-action-code') {
                setError({ message: 'Link do resetowania hasła wygasł' });
            }
            console.log(error.message);
        }
    };

    return (
        <div className=' flex h-screen w-full items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700'>
            <div className='card relative flex flex-col items-center justify-center bg-pureWhite px-8 py-12 shadow-2xl lg:min-w-160'>
                <Logo className='w-24' />
                {successMessage && (
                    <>
                        <h3 className='mt-8 pt-2 font-hind font-700'>Hasło zostało zresetowane</h3>
                        <Button tag='link' path={'/login'}>
                            Wróć do strony logowania
                        </Button>
                    </>
                )}

                <form onSubmit={onSubmit} className='flex w-full flex-col'>
                    <FormInput
                        label='Hasło'
                        name='password'
                        type='password'
                        placeholder='Podaj hasło'
                        register={() => {}}
                        required={true}
                        error={error}
                        onChange={(e) => handleUserChange(e)}
                    />

                    <FormInput
                        label='Powtórz hasło'
                        name='repeatPassword'
                        type='password'
                        placeholder='Powtórz hasło'
                        register={() => {}}
                        required={true}
                        error={error}
                        onChange={(e) => handleUserChange(e)}
                    />
                    <Button type='submit' variant='primary' className='mt-8 w-full'>
                        Resetuj hasło
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PasswordReset;
