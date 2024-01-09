import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../Molecules/FormInput/FormInput';
import { Button } from '../../Atoms/Button/Button';
import { useValidation, useAppView } from '../../../../utils/hooks';
import { joiResolver } from '@hookform/resolvers/joi';
import { isObjectEmpty } from '../../../../utils/helpers';

const Form = () => {
    const [appView] = useAppView();
    const [validationSchema] = useValidation(appView);
    const navigate = useNavigate();
    const classes = `mx-auto w-64 ${
        appView === 'addUserSummary' || appView === 'editUser' ? 'h-full' : ''
    } overflow-y-auto p-2`;

    const navigateToNextPage = (appView) => {
        switch (appView) {
            case 'addUserPersonalData':
                navigate('/admin/add-user/contact-data');
                break;
            case 'addUserContactData':
                navigate('/admin/add-user/register');
                break;
            case 'addUserRegister':
                navigate('/admin/add-user/summary');
                break;
            default:
                break;
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: joiResolver(validationSchema),
    });

    const onSubmit = (data) => {
        if (
            appView === 'addUserPersonalData' ||
            appView === 'addUserContactData' ||
            appView === 'addUserRegister'
        ) {
            navigateToNextPage(appView);
            console.log(data);
        }
        console.log('data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes}>
            {(appView === 'addUserPersonalData' ||
                appView === 'addUserSummary' ||
                appView === 'editUser') && (
                <>
                    <FormInput
                        label='Imię'
                        name='firstname'
                        type='text'
                        placeholder='Podaj imię'
                        register={register}
                        required={true}
                        error={errors.firstname}
                    />
                    <FormInput
                        label='Nazwisko'
                        name='lastname'
                        type='text'
                        placeholder='Podaj nazwisko'
                        register={register}
                        required={true}
                        error={errors.lastname}
                    />
                    <FormInput
                        label={'Data urodzenia'}
                        name='dateOfBirth'
                        type='date'
                        placeholder='Podaj datę urodzenia'
                        register={register}
                        required={true}
                        error={errors.dateOfBirth}
                    />

                    <FormInput
                        label='Pesel'
                        name='personalIdentityNumber'
                        type='number'
                        placeholder='Podaj pesel'
                        register={register}
                        required={true}
                        error={errors.personalIdentityNumber}
                    />

                    <FormInput
                        label='Opis'
                        name='describe'
                        type='textarea'
                        placeholder='Dodaj opis'
                        register={register}
                        required={true}
                        error={errors.describe}
                        className={{ input: 'h-32' }}
                    />
                </>
            )}
            {(appView === 'addUserContactData' ||
                appView === 'addUserSummary' ||
                appView === 'editUser') && (
                <>
                    <FormInput
                        label='Miasto'
                        name='city'
                        type='text'
                        placeholder='Podaj miasto'
                        register={register}
                        required={true}
                        error={errors.city}
                    />

                    <div className='flex justify-between gap-x-8'>
                        <FormInput
                            label='Ulica'
                            name='street'
                            type='text'
                            placeholder='Podaj ulicę'
                            register={register}
                            required={true}
                            error={errors.street}
                        />

                        <FormInput
                            label='Numer budynku'
                            name='houseNumber'
                            type='text'
                            placeholder='Podaj numer budynku'
                            register={register}
                            required={true}
                            error={errors.houseNumber}
                        />
                    </div>

                    <div className='flex justify-between gap-x-8'>
                        <FormInput
                            label='Nr. mieszkania'
                            name='apartmentNumber'
                            type='text'
                            placeholder='Podaj numer mieszkania'
                            register={register}
                            required={true}
                            error={errors.apartmentNumber}
                        />
                        <FormInput
                            label='Telefon'
                            name='phoneNumber'
                            type='number'
                            placeholder='Podaj telefon'
                            register={register}
                            required={true}
                            error={errors.phoneNumber}
                        />
                    </div>
                </>
            )}

            {(appView === 'addUserRegister' ||
                appView === 'addUserSummary' ||
                appView === 'editUserCredentials') && (
                <>
                    <FormInput
                        label='Login'
                        name='login'
                        type='text'
                        placeholder='Podaj login'
                        register={register}
                        required={true}
                        error={errors.login}
                    />

                    <div className='flex justify-between gap-x-8'>
                        <FormInput
                            label='Hasło'
                            name='password'
                            type='password'
                            placeholder='Podaj hasło'
                            register={register}
                            required={true}
                            error={errors.password}
                        />

                        <FormInput
                            label='Powtórz hasło'
                            name='repeatPassword'
                            type='password'
                            placeholder='Powtórz hasło'
                            register={register}
                            required={true}
                            error={errors.repeatPassword}
                        />
                    </div>
                </>
            )}

            {(appView === 'addUserPersonalData' ||
                appView === 'addUserContactData' ||
                appView === 'addUserRegister') && (
                <Button
                    type='submit'
                    onClick={handleSubmit(onSubmit)}
                    variant={isObjectEmpty(errors) ? 'success' : 'disabled'}
                    className='mt-8'
                >
                    Dalej
                </Button>
            )}

            {appView === 'addUserSummary' && (
                <Button type='submit' variant='success' className='mt-8'>
                    Dodaj użytkownika
                </Button>
            )}

            {appView === 'editUser' && (
                <Button type='submit' variant='warning' className='mt-8'>
                    Edytuj Użytkownika
                </Button>
            )}
            {appView === 'editUserCredentials' && (
                <Button type='submit' variant='warning' className='mt-8'>
                    Edytuj Dane
                </Button>
            )}
        </form>
    );
};

export default Form;
