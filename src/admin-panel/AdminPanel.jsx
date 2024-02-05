import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BurgerButton from './components/Atoms/BurgerButton/BurgerButton';
import Breadcrumbs from './components/Molecules/Breadcrumbs/Breadcrumbs';
import Sidebar from './components/Organism/Sidebar/Sidebar';
import DateBadge from './components/Molecules/DateBadge/DateBadge.';

const AdminPanel = () => {
    const [sideBarActive, setsideBarActive] = useState(false);
    const handleChange = () => {
        setsideBarActive(!sideBarActive);
    };

    return (
        <div className='drawer lg:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />

            <div className='drawer-content flex min-h-screen flex-col justify-center border-primary lg:h-screen lg:justify-between lg:border-l'>
                <div className='top-bar-height hidden items-center justify-between border-b border-primary text-sm lg:flex'>
                    <Breadcrumbs />
                    <DateBadge />
                </div>

                {/* ===Admin panel content=== */}
                <div className='lg:content-height flex flex-col justify-evenly px-4 py-8 lg:py-0'>
                    <Outlet />
                </div>

                <BurgerButton handleChange={handleChange} active={sideBarActive} />
            </div>

            <Sidebar handleChange={() => handleChange()} />
        </div>
    );
};

export default AdminPanel;
