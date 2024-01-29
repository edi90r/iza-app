// import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BurgerButton from './components/Atoms/BurgerButton/BurgerButton';
import Breadcrumbs from './components/Molecules/Breadcrumbs/Breadcrumbs';
import { useAppView } from '../utils/hooks';

const AdminPanel = () => {
    const [appView] = useAppView();
    const [sideBarActive, setsideBarActive] = useState(false);
    const { id } = useParams();
    const handleChange = () => {
        setsideBarActive(!sideBarActive);
    };

    return (
        <div className='drawer lg:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
            <div className='space-between drawer-content flex h-screen flex-col lg:border-l-2'>
                {/* Breadcrumbs */}
                <Breadcrumbs />
                {/* Admin panel content */}
                <div className='content-height flex flex-col justify-between px-4'>
                    <Outlet />
                </div>
                {/* Burger */}
                <BurgerButton handleChange={handleChange} active={sideBarActive} />
            </div>
            {/* Sidebar */}
            <div className='drawer-side'>
                <label
                    htmlFor='my-drawer-2'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                    onClick={() => handleChange()}
                ></label>

                <ul className='menu min-h-full w-80 bg-base-200 p-4 text-base-content'>
                    {(() => {
                        switch (appView) {
                            case 'dashboard':
                                return (
                                    <>
                                        <li>
                                            <Link to={'/admin/add-user/personal-data'}>
                                                Add User
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/'}>Wyloguj</Link>
                                        </li>
                                    </>
                                );
                            case 'addUserPersonalData':
                            case 'addUserContactData':
                            case 'addUserRegister':
                            case 'addUserSummary':
                            case 'editUserCredentials':
                                return (
                                    <li>
                                        <Link to={'/admin'}>Dashboard</Link>
                                        <Link to={'/'}>Wyloguj</Link>
                                    </li>
                                );
                            case 'editUser':
                                return (
                                    <li>
                                        <Link to={'/admin'}>Dashboard</Link>
                                        <Link to={`/admin/user-details/${id}/edit-credentials`}>
                                            Edytuj Login lub Hasło
                                        </Link>
                                        <Link to={'/'}>Wyloguj</Link>
                                    </li>
                                );

                            case 'userDetails':
                                return (
                                    <li>
                                        <Link to={'/admin'}>Dashboard</Link>
                                        <Link to={`/admin/user-details/${id}/edit`}>
                                            Edytuj użytkownika
                                        </Link>
                                        <Link to={'/admin'}>Usuń użytkownika</Link>
                                        <Link to={'/'}>Wyloguj</Link>
                                    </li>
                                );

                            default:
                                return null;
                        }
                    })()}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
