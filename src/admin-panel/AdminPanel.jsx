import { useState, useRef } from 'react';
import { useStore } from './store/useStore';
import { Outlet } from 'react-router-dom';
import BurgerButton from './components/Atoms/BurgerButton/BurgerButton';
import Breadcrumbs from './components/Molecules/Breadcrumbs/Breadcrumbs';
import Sidebar from './components/Organism/Sidebar/Sidebar';
import DateBadge from './components/Molecules/DateBadge/DateBadge.';
import Modal from '../common-components/Modal/Modal';

const AdminPanel = () => {
    const [sideBarActive, setsideBarActive] = useState(false);
    const { modalState } = useStore();

    const handleChange = () => {
        setsideBarActive(!sideBarActive);
    };

    const drawerRef = useRef(null);

    const handleClickMenu = () => {
        if (typeof drawerRef.current === 'undefined') return;
        setsideBarActive(!sideBarActive);
        drawerRef.current.click();
    };

    return (
        <div className='drawer block lg:drawer-open md:grid'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' ref={drawerRef} />

            <div className='drawer-content flex min-h-screen flex-col justify-center border-primary lg:justify-between lg:border-l'>
                <div className='top-bar-height hidden items-center justify-between border-b border-primary text-sm lg:flex'>
                    <Breadcrumbs />
                    <DateBadge />
                </div>

                {/* ===Admin panel content=== */}
                <div className='lg:content-height flex flex-col justify-evenly px-4 py-8 lg:py-0 lg:pb-12'>
                    <Outlet />
                </div>

                <BurgerButton handleChange={handleChange} active={sideBarActive} />
            </div>

            <Sidebar
                handleChange={() => handleChange()}
                handleClickMenu={() => handleClickMenu()}
            />
            {modalState.showModal && <Modal />}
        </div>
    );
};

export default AdminPanel;
