import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.svg';

const Logo = () => {
    return (
        <div className='flex w-16 -translate-x-1/2 items-start justify-center'>
            <Link to={'/'} className='w-full'>
                <img src={logo} alt='logo' className='w-full' />
            </Link>
        </div>
    );
};

export default Logo;
