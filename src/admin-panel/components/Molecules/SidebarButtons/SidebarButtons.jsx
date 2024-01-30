import propType from 'prop-types';
import Button from '../../Atoms/Button/Button';
import { useAppView } from '../../../../utils/hooks';

const SidebarButtons = ({ id = '' }) => {
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
                            className='mb-4 w-full'
                        >
                            dodaj użytkownika
                        </Button>
                        <Button tag='link' path={'/'} variant='primary' className='w-full'>
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
                    <Button tag='link' path={'/admin'} className='mb-4 w-full'>
                        dashboard
                    </Button>
                );
            case 'editUser':
                return (
                    <>
                        <Button tag='link' path={'/admin'} className='mb-4 w-full'>
                            dashboard
                        </Button>
                        <Button
                            tag='link'
                            path={`/admin/user-details/${id}/edit-credentials`}
                            variant='primary'
                            className=' mb-4 w-full'
                        >
                            edytuj login lub hasło
                        </Button>
                    </>
                );

            case 'userDetails':
                return (
                    <>
                        <Button tag='link' path={'/admin'} className='mb-4 w-full'>
                            dashboard
                        </Button>
                        <Button
                            tag='link'
                            path={`/admin/user-details/${id}/edit`}
                            className='mb-4 w-full'
                        >
                            edytuj użytkownika
                        </Button>
                        <Button tag='link' path={`/admin`} className='mb-4 w-full'>
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
    id: propType.string.isRequired,
};

export default SidebarButtons;
