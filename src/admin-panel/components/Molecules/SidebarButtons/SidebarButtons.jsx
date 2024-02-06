import propType from 'prop-types';
import Button from '../../Atoms/Button/Button';
import { useAppView } from '../../../../utils/hooks';

const SidebarButtons = ({ id = '', handleMenuClick }) => {
    const [appView] = useAppView();

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
                            onClick={handleMenuClick}
                        >
                            dodaj użytkownika
                        </Button>
                        <Button
                            tag='link'
                            path={'/'}
                            variant='primary'
                            className='mt-4 w-full first:mt-0'
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
                        onClick={handleMenuClick}
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
                            onClick={handleMenuClick}
                        >
                            dashboard
                        </Button>
                        <Button
                            tag='link'
                            path={`/admin/user-details/${id}/edit-credentials`}
                            variant='primary'
                            className='mt-4 w-full first:mt-0'
                            onClick={handleMenuClick}
                        >
                            edytuj login lub hasło
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
                            onClick={handleMenuClick}
                        >
                            dashboard
                        </Button>
                        <Button
                            tag='link'
                            path={`/admin/user-details/${id}/edit`}
                            className='mt-4 w-full first:mt-0'
                            onClick={handleMenuClick}
                        >
                            edytuj użytkownika
                        </Button>
                        <Button
                            tag='link'
                            path={`/admin`}
                            className='mt-4 w-full first:mt-0'
                            onClick={handleMenuClick}
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
