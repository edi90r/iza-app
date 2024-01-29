import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { AdminPanelStateProvider } from './admin-panel/store/StateProvider';
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

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<LandingPage />} />
            <Route path='admin' element={<AdminPanel />}>
                <Route element={<Dashboard />} index />
                <Route path='add-user' element={<UserFormView />}>
                    <Route path='personal-data' element={<PersonalDataForm />} index />
                    <Route path='contact-data' element={<ContactDataForm />} />
                    <Route path='register' element={<UserRegisterForm />} />
                    <Route path='summary' element={<SummaryForm />} />
                </Route>

                <Route path='user-details'>
                    <Route path=':id' element={<UserDetails />} />
                    <Route path='edit' element={<UserFormView />}>
                        <Route path=':id' element={<EditUserForm />} />
                        <Route path='credentials/:id' element={<UserRegisterForm edit />} />
                    </Route>
                </Route>
            </Route>
            <Route path='/pwa' element={<PwaApp />} index />
        </>,
    ),
);

function App() {
    return (
        <AdminPanelStateProvider>
            <RouterProvider router={router} />
        </AdminPanelStateProvider>
    );
}

export default App;
