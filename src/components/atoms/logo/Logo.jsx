import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { twMerge } from 'tailwind-merge';

const Logo = ({ className }) => {
    const classes = twMerge(`w-16 ${className ? className : ''}`);
    return (
        <div className={classes}>
            <Link to={'/'} className='w-full'>
                <img src={logo} alt='logo' className='w-full' />
            </Link>
        </div>
    );
};

Logo.propTypes = {
    className: propTypes.string,
};

export default Logo;
