import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './ladning-page/LandingPage';
import AdminPanel from './admin-panel/AdminPanel';
import PwaApp from './pwa-app/PwaApp';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/admin',
        element: <AdminPanel />,
    },
    {
        path: '/pwa',
        element: <PwaApp />,
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />;
        </>
    );
}

export default App;
