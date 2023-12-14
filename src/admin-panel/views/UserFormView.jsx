import { useAppView } from '../../utils/hooks';

const UserFormView = () => {
    const [appView] = useAppView();
    console.log(appView);
    switch (appView) {
        case 'addUser':
            return <div>Add User</div>;
        case 'editUser':
            return <div>Edit User</div>;
        default:
            break;
    }
};

export default UserFormView;
