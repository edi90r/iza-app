import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import SidebarButtons from '../../Molecules/SidebarButtons/SidebarButtons';
import Logo from '../../Atoms/Logo/Logo';
import AdminCard from '../../Molecules/AdminCard/AdminCard';

const Sidebar = ({ handleChange }) => {
    const { id } = useParams();

    return (
        <div className='drawer-side'>
            <label
                htmlFor='my-drawer-2'
                aria-label='close sidebar'
                className='drawer-overlay'
                onClick={() => handleChange()}
            ></label>

            <div className='menu flex min-h-full w-80 flex-col items-center justify-start bg-pureWhite py-8 text-base-content'>
                <Logo />
                <div className='flex items-center' style={{ height: '20vh' }}>
                    <AdminCard title='John Doe' facility='Rzeszowski ośrodek opieki dziennej' />
                </div>
                <div className='mt-auto flex w-full basis-60 flex-col items-center justify-end'>
                    <SidebarButtons id={id} />
                </div>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    handleChange: propTypes.func.isRequired,
};

export default Sidebar;
