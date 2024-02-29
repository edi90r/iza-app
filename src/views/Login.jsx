import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import Logo from '../components/atoms/logo/Logo';
import FormInput from '../components/molecules/formInput/FormInput';
import Button from '../components/atoms/button/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [fields, setFields] = useState({});
    const { error, setError, signIn, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const handleUserChange = (event) => {
        const { name, value } = event.currentTarget;
        setFields((fields) => ({ ...fields, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!fields.email || !fields.password) {
            return setError({ message: 'Email i hasło są wymagane aby się zalogować' });
        }

        signIn(fields.email, fields.password);
        setFields({});
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (isAuthenticated) {
                return navigate('/');
            }
        }

        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, navigate]);

    return (
        <div className=' bg-gradient-to-r flex h-screen w-full items-center justify-center from-slate-900 to-slate-700'>
            <div className='card relative flex flex-col items-center justify-center bg-pureWhite px-8 py-12 shadow-2xl lg:min-w-160'>
                <Logo className='w-24' />

                <div className='mt-8 w-full text-center'>
                    <h2 className='font-hind font-700'>Zaloguj się do aplikacji</h2>
                </div>

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
                    <FormInput
                        label='Hasło'
                        name='password'
                        type='password'
                        placeholder='Podaj hasło'
                        register={() => {}}
                        required
                        onChange={(e) => handleUserChange(e)}
                    />

                    <Link to={'/forget-password'} className='self-end pt-2'>
                        Nie pamiętam hasła
                    </Link>

                    <Button type='submit' variant='primary' className='mt-8 w-full'>
                        Zaloguj
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
