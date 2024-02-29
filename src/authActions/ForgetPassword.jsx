import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import Logo from '../components/atoms/logo/Logo';
import FormInput from '../components/molecules/formInput/FormInput';
import Button from '../components/atoms/button/Button';
import { Link } from 'react-router-dom';

const Login = () => {
    const [field, setField] = useState('');
    const { error, setError, passwordReset } = useAuth();
    const [successMessage, setSuccessMessage] = useState(null);

    const handleUserChange = (event) => {
        const { value } = event.currentTarget;
        setField(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!field) {
            return setError({ message: 'Email jest wymagany aby zresetować hasło' });
        }
        try {
            await passwordReset(field);
            setSuccessMessage(true);
            setField('');
            return;
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/user-not-found') {
                setSuccessMessage(false);
                setField('');
                return;
            }
        }
    };

    return (
        <div className=' bg-gradient-to-r flex h-screen w-full items-center justify-center from-slate-900 to-slate-700'>
            <div className='card relative flex flex-col items-center justify-center bg-pureWhite px-8 py-12 shadow-2xl lg:min-w-160'>
                <Logo className='w-24' />
                {successMessage && (
                    <h3 className='mt-8 pt-2 font-hind font-700'>
                        Na podany email został wysłany link do resetowania hasła
                    </h3>
                )}
                <form onSubmit={onSubmit} className='flex w-full flex-col'>
                    <FormInput
                        label='Email'
                        name='email'
                        type='email'
                        placeholder='Podaj email'
                        register={() => {}}
                        required
                        className={{ container: 'w-full' }}
                        onChange={(e) => handleUserChange(e)}
                        error={error}
                    />
                    <Button type='submit' variant='primary' className='mt-8 w-full'>
                        Wyślij email
                    </Button>
                </form>
                <div className='my-4 w-full border-b border-primary'></div>

                <Link to={'/'} className='pt-2 font-hind font-700'>
                    powrót do strony głównej
                </Link>
            </div>
        </div>
    );
};

export default Login;
