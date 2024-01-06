import { useAppView } from '../../utils/hooks';
import Form from '../components/Organism/Form/Form';

const UserFormView = () => {
    const [appView] = useAppView();

    const renderFormCopy = () => {
        switch (appView) {
            case 'addUserPersonalData':
                return <div className='flex items-center justify-center'>Dane osobowe</div>;
            case 'addUserContactData':
                return <div className='flex items-center justify-center'>Dane kontaktowe</div>;
            case 'addUserRegister':
                return (
                    <div className='flex items-center justify-center'>Zarejestruj użytkownika</div>
                );
            case 'addUserSummary':
                return <div className='flex items-center justify-center'>Podsumowanie</div>;
            default:
                break;
        }
    };

    return (
        <div className='w-full'>
            <div>Form step indicator</div>
            <div className='grid h-full w-full grid-cols-2 items-center'>
                <Form />
                {renderFormCopy(appView)}
            </div>
        </div>
    );
};

export default UserFormView;
