import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import PersonalDataForm from './PersonalDataForm';
import ContactDataForm from './ContactDataForm';
import UserRegisterForm from './UserRegisterForm';
import Button from '../../Atoms/Button/Button';
import { useAppView } from '../../../../utils/hooks';
import { isObjectEmpty, setSpecificDataShape } from '../../../../utils/helpers';
import { createUser, getUserById, updateUser } from '../../../../controlers/admin';

const Form = () => {
    const { id } = useParams();
    const [appView] = useAppView();
    const navigate = useNavigate();
    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
        trigger,
        setValue,
    } = useFormContext();

    const classes = `mx-auto w-64 ${
        appView === 'addUserSummary' || appView === 'editUser' ? 'h-full' : ''
    } overflow-y-auto p-2`;

    const navigateToNextPage = async (appView) => {
        const nextStep = {
            addUserPersonalData: '/admin/add-user/contact-data',
            addUserContactData: '/admin/add-user/register',
            addUserRegister: '/admin/add-user/summary',
            dashboard: '/admin',
        };

        const isValid = await trigger();
        if (isValid) {
            navigate(nextStep[appView]);
        }
    };

    const onSubmit = (data) => {
        if (appView === 'addUserSummary') {
            const user = setSpecificDataShape(data);
            createUser(user);
            navigateToNextPage('dashboard');
        } else if (appView === 'editUser') {
            const user = setSpecificDataShape(data);
            updateUser(id, user);
            navigateToNextPage('dashboard');
        } else {
            return;
        }
    };

    useEffect(() => {
        const fields = [
            'name',
            'lastname',
            'dateOfBirth',
            'personalIdentityNumber',
            'city',
            'street',
            'houseNumber',
            'apartmentNumber',
            'phoneNumber',
            'login',
            'describe',
        ];

        const populateUserFields = async () => {
            if (appView === 'editUser') {
                const user = await getUserById(id);
                if (!user) return;

                const userShape = setSpecificDataShape(user, true);

                for (const field of fields) {
                    setValue(field, userShape[field]);
                }
            }
        };

        populateUserFields();
    }, [appView, id, setValue]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const renderForm = (appView) => {
        switch (appView) {
            case 'addUserPersonalData':
                return (
                    <>
                        <PersonalDataForm />
                        <Button
                            type='button'
                            onClick={() => navigateToNextPage(appView)}
                            variant={isObjectEmpty(errors) ? 'success' : 'disabled'}
                            className='mt-8'
                        >
                            Dalej
                        </Button>
                    </>
                );
            case 'addUserContactData':
                return (
                    <>
                        <ContactDataForm />
                        <Button
                            type='button'
                            onClick={() => navigateToNextPage(appView)}
                            variant={isObjectEmpty(errors) ? 'success' : 'disabled'}
                            className='mt-8'
                        >
                            Dalej
                        </Button>
                    </>
                );
            case 'addUserRegister':
                return (
                    <>
                        <UserRegisterForm />
                        <Button
                            type='button'
                            onClick={() => navigateToNextPage(appView)}
                            variant={isObjectEmpty(errors) ? 'success' : 'disabled'}
                            className='mt-8'
                        >
                            Dalej
                        </Button>
                    </>
                );
            case 'addUserSummary':
                return (
                    <>
                        <PersonalDataForm />
                        <ContactDataForm />
                        <UserRegisterForm />
                        <Button
                            type='submit'
                            variant={isObjectEmpty(errors) ? 'success' : 'disabled'}
                            className='mt-8'
                        >
                            Dodaj użytkownika
                        </Button>
                    </>
                );
            case 'editUser':
                return (
                    <>
                        <PersonalDataForm />
                        <ContactDataForm />
                        <Button
                            type='submit'
                            variant={isObjectEmpty(errors) ? 'warning' : 'disabled'}
                            className='mt-8'
                        >
                            Edytuj Użytkownika
                        </Button>
                    </>
                );
            case 'editUserCredentials':
                return (
                    <>
                        <UserRegisterForm />
                        <Button
                            type='submit'
                            variant={isObjectEmpty(errors) ? 'warning' : 'disabled'}
                            className='mt-8'
                        >
                            Edytuj Dane
                        </Button>
                    </>
                );

            default:
                break;
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes}>
            {renderForm(appView)}
        </form>
    );
};

export default Form;
