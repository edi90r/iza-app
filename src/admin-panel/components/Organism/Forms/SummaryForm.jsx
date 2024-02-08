import { useFormContext } from 'react-hook-form';
import { isObjectEmpty } from '../../../../utils/helpers';
import FormInput from '../../Molecules/FormInput/FormInput';
import Button from '../../Atoms/Button/Button';

const SummaryForm = () => {
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
                    type='number'
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
                    type='number'
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
            <FormInput
                label='Email'
                name='email'
                type='text'
                placeholder='Podaj email'
                register={register}
                required={true}
                error={errors.email}
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
            <Button
                type='submit'
                variant={isObjectEmpty(errors) ? 'success' : 'disabled'}
                className='mt-8'
            >
                Dodaj użytkownika
            </Button>
        </>
    );
};

export default SummaryForm;
