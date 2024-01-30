import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BurgerButton from './components/Atoms/BurgerButton/BurgerButton';
import Breadcrumbs from './components/Molecules/Breadcrumbs/Breadcrumbs';
import Sidebar from './components/Organism/Sidebar/Sidebar';

const AdminPanel = () => {
    const [sideBarActive, setsideBarActive] = useState(false);
    const handleChange = () => {
        setsideBarActive(!sideBarActive);
    };

    return (
        <div className='drawer lg:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />

            <div className='space-between drawer-content flex h-screen flex-col border-primary lg:border-l'>
                <Breadcrumbs />

                {/* ===Admin panel content=== */}
                <div className='content-height flex flex-col justify-between px-4'>
                    <Outlet />
                </div>

                <BurgerButton handleChange={handleChange} active={sideBarActive} />
            </div>

            <Sidebar handleChange={() => handleChange()} />
        </div>
    );
};

export default AdminPanel;
