import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import BurgerButton from './components/Atoms/BurgerButton/BurgerButton';
import { useAppView } from '../utils/hooks';

const AdminPanel = ({ content }) => {
    const [appView] = useAppView();
    const [sideBarActive, setsideBarActive] = useState(false);

    const handleChange = () => {
        setsideBarActive(!sideBarActive);
    };

    return (
        <div className='drawer lg:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />

            <div className='space-between drawer-content flex h-screen flex-col lg:border-l-2'>
                {/* Breadcrumbs */}
                <div
                    className='border-gray-400 w-100 breadcrumbs hidden border-b-2 text-sm lg:flex'
                    style={{ height: '10vh' }}
                >
                    <ul className='p-4'>
                        <li>
                            <a>Home</a>
                        </li>
                        <li>
                            <a>Documents</a>
                        </li>
                        <li>Add Document</li>
                    </ul>
                </div>
                {/* Admin panel content */}
                <div className='p-x-4 flex  grow'>{content}</div>
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
                                        <Link to={'/'}>Wyloguj</Link>
                                    </li>
                                );
                            case 'userDetails':
                                return (
                                    <li>
                                        <Link to={'/admin'}>Dashboard</Link>
                                        <Link to={'/admin/edit-user'}>Edytuj użytkownika</Link>
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

AdminPanel.propTypes = {
    content: PropTypes.element.isRequired,
};

export default AdminPanel;
