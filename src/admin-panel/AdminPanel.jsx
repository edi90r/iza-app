import { Link } from 'react-router-dom';

const AdminPanel = () => {
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
                <div className=' flex  grow items-center justify-center bg-crimson p-4'>
                    <h2 className=''>Admin Panel</h2>
                </div>
                <label
                    htmlFor='my-drawer-2'
                    className='btn-primary drawer-button btn absolute z-50 lg:hidden'
                    style={{ top: '5%', right: '5%' }}
                >
                    Open drawer
                </label>
            </div>

            {/* Sidebar */}
            <div className='drawer-side'>
                <label
                    htmlFor='my-drawer-2'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                ></label>

                <ul className='menu min-h-full w-80 bg-base-200 p-4 text-base-content'>
                    <li>
                        <Link to={'/'}>Back to main</Link>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
