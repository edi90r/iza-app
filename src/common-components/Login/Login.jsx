import FormInput from '../../admin-panel/components/Molecules/FormInput/FormInput';
import Button from '../../admin-panel/components/Atoms/Button/Button';
import Logo from '../../admin-panel/components/Atoms/Logo/Logo';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userType, seUserType] = useState(null);
    const navigate = useNavigate();
    const { signIn, isAuthenticated, userRole } = useAuth();
    const [user, setUser] = useState({
        name: '',
        email: '',
    });

    const handleSetTypeOfUser = (e) => {
        seUserType(e.currentTarget.dataset.type);
    };
    const handleUserChange = (event) => {
        const { name, value } = event.currentTarget;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        signIn(user.email, user.password);
    };

    useEffect(() => {
        if (isAuthenticated && userRole === 'admin' && userType === 'admin') {
            navigate('/admin');
            return;
        } else if (isAuthenticated && userRole === 'user' && userType === 'user') {
            navigate('/pwa');
            return;
        }
    }, [isAuthenticated, navigate, userType, userRole]);

    return (
        <div className=' flex h-screen w-full items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700'>
            <div className='card relative flex flex-col items-center justify-center bg-pureWhite px-8 py-12 shadow-2xl lg:min-w-160'>
                <Logo className='w-24' />
                <div className='mt-8 w-full text-center'>
                    <h2 className='font-hind font-700'>Wybierz jako kto chcesz się zalogować</h2>
                    <div className='my-8 flex w-full flex-col lg:flex-row'>
                        <div
                            className={`card grid h-32 flex-1 flex-grow place-items-center rounded-box border hover:cursor-pointer  hover:bg-base-300 hover:shadow-lg ${
                                userType === 'admin' ? 'bg-base-300' : 'bg-pureWhite'
                            }`}
                            data-type='admin'
                            onClick={(e) => handleSetTypeOfUser(e)}
                        >
                            admin
                        </div>
                        <div className='divider lg:divider-horizontal'>lub</div>
                        <div
                            className={`card grid h-32 flex-1 flex-grow place-items-center rounded-box border hover:cursor-pointer hover:bg-base-300 hover:shadow-lg ${
                                userType === 'user' ? 'bg-base-300' : 'bg-pureWhite'
                            }`}
                            data-type='user'
                            onClick={(e) => handleSetTypeOfUser(e)}
                        >
                            użytkownik
                        </div>
                    </div>
                </div>
                {userType && (
                    <>
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
                            <Link to={'/admin'} className='self-end pt-2'>
                                Nie pamiętam hasła
                            </Link>

                            <Button type='submit' variant='primary' className='mt-8 w-full'>
                                Zaloguj
                            </Button>
                        </form>
                        <div className='my-4 w-full border-b border-primary'></div>
                    </>
                )}
                <Link to={'/'} className='pt-2 font-hind font-700'>
                    powrót do strony głównej
                </Link>
            </div>
        </div>
    );
};

export default Login;
