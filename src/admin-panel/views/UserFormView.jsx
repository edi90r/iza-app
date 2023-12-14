import { useAppView } from '../../utils/hooks';
import Form from '../components/Organism/Form/Form';

const UserFormView = () => {
    const [appView] = useAppView();
    switch (appView) {
        case 'addUser':
            return (
                <div className='grid w-full grid-cols-2'>
                    <Form />
                    <div className='flex items-center justify-center'>Add User</div>
                </div>
            );
        case 'editUser':
            return (
                <div className='grid w-full grid-cols-2'>
                    <Form />
                    <div className='flex items-center justify-center'>Edit User</div>
                </div>
            );
        default:
            break;
    }
};

export default UserFormView;
