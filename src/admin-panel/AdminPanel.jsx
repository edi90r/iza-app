import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className='drawer lg:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content space-between flex flex-col border-l-2'>
                <div
                    className='breadcrumbs border-gray-400 w-100 flex border-b-2 text-sm'
                    style={{ height: '10vh' }}
                >
                    <ul>
                        <li>
                            <a>Home</a>
                        </li>
                        <li>
                            <a>Documents</a>
                        </li>
                        <li>Add Document</li>
                    </ul>
                </div>

                <h2 className='grow bg-crimson'>ADmin Panel</h2>

                <label htmlFor='my-drawer-2' className='btn btn-primary drawer-button lg:hidden'>
                    Open drawer
                </label>
            </div>
            <div className='drawer-side'>
                <label
                    htmlFor='my-drawer-2'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                ></label>
                <ul className='menu bg-base-200 text-base-content min-h-full w-80 p-4'>
                    {/* Sidebar content here */}
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
