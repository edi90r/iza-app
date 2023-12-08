import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './ladning-page/LandingPage';
import AdminPanel from './admin-panel/AdminPanel';
import PwaApp from './pwa-app/PwaApp';
import Dashboard from './admin-panel/views/Dashboard';
import UserFormView from './admin-panel/views/UserFormVIew';
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
        path: '/admin/add-user',
        element: <AdminPanel content={<UserFormView />} />,
    },
    {
        path: '/admin/edit-user',
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
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
