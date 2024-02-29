import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { StateProvider } from './store/StateProvider';
import { ProvideAuth } from './auth/UseProvideAuth';
import PwaApp from './Layout';
import ProtectedRoute from './authActions/ProtectedRoute';
import Login from './views/Login';
import ForgetPassword from './authActions/ForgetPassword';
import AuthActions from './authActions/AuthActions';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<ProtectedRoute />}>
                <Route path='/' element={<PwaApp />} index />
                <Route path='/login' element={<Login />} />
                <Route path='/forget-password' element={<ForgetPassword />} />
                <Route path='/auth/action' element={<AuthActions />} />
            </Route>
        </>,
    ),
);

function App() {
    return (
        <StateProvider>
            <ProvideAuth>
                <RouterProvider router={router} />
            </ProvideAuth>
        </StateProvider>
    );
}

export default App;
