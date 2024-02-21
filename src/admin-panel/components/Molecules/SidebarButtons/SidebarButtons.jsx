import propType from 'prop-types';
import Button from '../../Atoms/Button/Button';
import { useAppView } from '../../../../utils/hooks';
import { useStore } from '../../../store/useStore';
import { useAuth } from '../../../../auth/useAuth';

const SidebarButtons = ({ id = '', handleClickMenu }) => {
    const { handleSignOut } = useAuth();
    const [appView] = useAppView();
    const { handleOpenModal } = useStore();

    const singOut = () => {
        handleSignOut();
    };

    const handleDeleteUser = () => {
        handleOpenModal(
            'delete',
            {
                title: 'Usuwanie użytkownika',
                message: 'Czy na pewno chcesz usunąć użytkownika?',
            },
            true,
        );
    };

    const renderButtons = () => {
        switch (appView) {
            case 'dashboard':
                return (
                    <>
                        <Button
                            tag='link'
                            path={'/admin/add-user/personal-data'}
                            variant='primary'
                            className='mt-4 w-full first:mt-0'
                            onClick={handleClickMenu}
                        >
                            dodaj użytkownika
                        </Button>
                        <Button
                            type='submit'
                            variant='primary'
                            className='mt-4 w-full first:mt-0'
                            onClick={singOut}
                        >
                            wyloguj
                        </Button>
                    </>
                );
            case 'addUserPersonalData':
            case 'addUserContactData':
            case 'addUserRegister':
            case 'addUserSummary':
            case 'editUserCredentials':
                return (
                    <Button
                        tag='link'
                        path={'/admin'}
                        className='mt-4 w-full first:mt-0'
                        onClick={handleClickMenu}
                    >
                        dashboard
                    </Button>
                );
            case 'editUser':
                return (
                    <>
                        <Button
                            tag='link'
                            path={'/admin'}
                            className='mt-4 w-full first:mt-0'
                            onClick={handleClickMenu}
                        >
                            dashboard
                        </Button>
                        <Button
                            tag='link'
                            path={`/admin/user-details/${id}/edit-credentials`}
                            variant='primary'
                            className='mt-4 w-full first:mt-0'
                            onClick={handleClickMenu}
                        >
                            Zmień hasło
                        </Button>
                    </>
                );

            case 'userDetails':
                return (
                    <>
                        <Button
                            tag='link'
                            path={'/admin'}
                            className='mt-4 w-full first:mt-0'
                            onClick={handleClickMenu}
                        >
                            dashboard
                        </Button>
                        <Button
                            tag='link'
                            path={`/admin/user-details/${id}/edit`}
                            className='mt-4 w-full first:mt-0'
                            onClick={handleClickMenu}
                        >
                            edytuj użytkownika
                        </Button>
                        <Button
                            className='mt-4 w-full first:mt-0'
                            onClick={() => handleDeleteUser(id)}
                        >
                            usuń użytkownika
                        </Button>
                    </>
                );

            default:
                return null;
        }
    };

    return renderButtons();
};

SidebarButtons.propTypes = {
    id: propType.string,
};

export default SidebarButtons;
