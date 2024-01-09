import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminPanelStateProvider } from './admin-panel/store/StateProvider';
import LandingPage from './ladning-page/LandingPage';
import AdminPanel from './admin-panel/AdminPanel';
import PwaApp from './pwa-app/PwaApp';
import Dashboard from './admin-panel/views/Dashboard';
import UserFormView from './admin-panel/views/UserFormView';
import UserDetails from './admin-panel/views/UserDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/admin',
        element: <AdminPanel content={<Dashboard />} />,
    },
    {
        path: '/admin/add-user/personal-data',
        element: <AdminPanel content={<UserFormView />} />,
    },
    {
        path: '/admin/add-user/contact-data',
        element: <AdminPanel content={<UserFormView />} />,
    },
    {
        path: '/admin/add-user/register',
        element: <AdminPanel content={<UserFormView />} />,
    },
    {
        path: '/admin/add-user/summary',
        element: <AdminPanel content={<UserFormView />} />,
    },
    {
        path: '/admin/edit-user',
        element: <AdminPanel content={<UserFormView />} />,
    },
    {
        path: '/admin/edit-user/credentials',
        element: <AdminPanel content={<UserFormView />} />,
    },
    {
        path: '/admin/user-details/:id',
        element: <AdminPanel content={<UserDetails />} />,
    },
    {
        path: '/pwa',
        element: <PwaApp />,
    },
]);

function App() {
    return (
        <AdminPanelStateProvider>
            <RouterProvider router={router} />
        </AdminPanelStateProvider>
    );
}

export default App;
