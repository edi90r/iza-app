import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { AdminPanelStateProvider } from './admin-panel/store/StateProvider';
import { ProvideAuth } from './auth/UseProvideAuth';
import LandingPage from './ladning-page/LandingPage';
import AdminPanel from './admin-panel/AdminPanel';
import PwaApp from './pwa-app/PwaApp';
import Dashboard from './admin-panel/views/Dashboard';
import UserFormView from './admin-panel/views/UserFormView';
import UserDetails from './admin-panel/views/UserDetails';
import PersonalDataForm from './admin-panel/components/Organism/Forms/PersonalDataForm';
import ContactDataForm from './admin-panel/components/Organism/Forms/ContactDataForm';
import UserRegisterForm from './admin-panel/components/Organism/Forms/UserRegisterForm';
import SummaryForm from './admin-panel/components/Organism/Forms/SummaryForm';
import EditUserForm from './admin-panel/components/Organism/Forms/EditUserForm';
import ProtectedRoute from './common-components/ProtectedRoute/ProtectedRoute';
import Login from './common-components/Login/Login';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute role='admin' />}>
                <Route path='admin' element={<AdminPanel />}>
                    <Route element={<Dashboard />} index />
                    <Route path='add-user' element={<UserFormView />}>
                        <Route path='personal-data' element={<PersonalDataForm />} index />
                        <Route path='contact-data' element={<ContactDataForm />} />
                        <Route path='register' element={<UserRegisterForm />} />
                        <Route path='summary' element={<SummaryForm />} />
                    </Route>

                    <Route path='user-details'>
                        <Route path=':id' element={<UserDetails />} index />
                        <Route path=':id' element={<UserFormView />}>
                            <Route path='edit' element={<EditUserForm />} />
                            <Route path='edit-credentials' element={<UserRegisterForm edit />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route element={<ProtectedRoute role='user' />}>
                <Route path='/pwa' element={<PwaApp />} index />
            </Route>
        </>,
    ),
);

function App() {
    return (
        <AdminPanelStateProvider>
            <ProvideAuth>
                <RouterProvider router={router} />
            </ProvideAuth>
        </AdminPanelStateProvider>
    );
}

export default App;
