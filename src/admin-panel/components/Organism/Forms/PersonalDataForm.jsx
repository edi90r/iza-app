import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../../../../utils/helpers';
import FormInput from '../../Molecules/FormInput/FormInput';
import Button from '../../Atoms/Button/Button';

const PersonalDataForm = () => {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        trigger,
    } = useFormContext();

    const handleClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            navigate('/admin/add-user/contact-data');
        }
    };

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
            <Button
                type='button'
                onClick={() => handleClick()}
                variant={isObjectEmpty(errors) ? 'success' : 'disabled'}
                className='mt-8'
            >
                Dalej
            </Button>
        </>
    );
};

export default PersonalDataForm;
