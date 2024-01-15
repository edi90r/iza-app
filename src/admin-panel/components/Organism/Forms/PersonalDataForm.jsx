import { useFormContext } from 'react-hook-form';
import FormInput from '../../Molecules/FormInput/FormInput';

const PersonalDataForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <>
            <FormInput
                label='Imię'
                name='name'
                type='text'
                placeholder='Podaj imię'
                register={register}
                required={true}
                error={errors.name}
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
    );
};

export default PersonalDataForm;
