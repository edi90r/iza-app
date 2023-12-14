import { useForm } from 'react-hook-form';

const Form = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='m-auto mt-4' style={{ width: '500px' }}>
            <label className='form-control w-full'>
                <div className='label'>
                    <span className='label-text'>Imię</span>
                </div>
                <input
                    name='firstName'
                    type='text'
                    placeholder='Podaj imię'
                    className='input input-bordered input-primary  w-full '
                    {...register('firstName', { required: true })}
                />
            </label>

            <label className='form-control w-full '>
                <div className='label'>
                    <span className='label-text'>Nazwisko</span>
                </div>
                <input
                    name='lastName'
                    type='text'
                    placeholder='Podaj nazwisko'
                    className='input input-bordered input-primary  w-full '
                    {...register('lastName', { required: true })}
                />
            </label>

            <label className='form-control w-full '>
                <div className='label'>
                    <span className='label-text'>Data urodzenia</span>
                </div>
                <input
                    name='dateOfBirth'
                    type='date'
                    placeholder='Podaj datę urodzenia'
                    className='input input-bordered input-primary  w-full '
                    {...register('dateOfBirth', { required: true })}
                />
            </label>

            <label className='form-control w-full '>
                <div className='label'>
                    <span className='label-text'>Pesel</span>
                </div>
                <input
                    name='personalIdentityNumber'
                    type='number'
                    placeholder='Podaj pesel'
                    className='input input-bordered  input-primary w-full '
                    {...register('personalIdentityNumber', { required: true })}
                />
            </label>

            <label className='form-control w-full '>
                <div className='label'>
                    <span className='label-text'>Miasto</span>
                </div>
                <input
                    name='city'
                    type='text'
                    placeholder='Podaj miasto'
                    className='input input-bordered  input-primary w-full '
                    {...register('city', { required: true })}
                />
            </label>

            <div className='flex justify-between'>
                <label className='form-control w-full pe-4'>
                    <div className='label'>
                        <span className='label-text'>Ulica</span>
                    </div>
                    <input
                        name='street'
                        type='text'
                        placeholder='Podaj ulicę'
                        className='input input-bordered  input-primary w-full '
                        {...register('street', { required: true })}
                    />
                </label>

                <label className='form-control w-full ps-4'>
                    <div className='label'>
                        <span className='label-text'>Number budynku</span>
                    </div>
                    <input
                        name='houseNumber'
                        type='text'
                        placeholder='Podaj numer budynku'
                        className='input input-bordered  input-primary w-full '
                        {...register('houseNumber', { required: true })}
                    />
                </label>
            </div>

            <div className='flex justify-between'>
                <label className='form-control w-full pe-4'>
                    <div className='label'>
                        <span className='label-text'>Nr. mieszkania</span>
                    </div>
                    <input
                        name='apartmentNumber'
                        type='text'
                        placeholder='Podaj numer mieszkania'
                        className='input input-bordered  input-primary w-full '
                        {...register('apartmentNumber', { required: true })}
                    />
                </label>

                <label className='form-control w-full ps-4'>
                    <div className='label'>
                        <span className='label-text'>Telefon</span>
                    </div>
                    <input
                        name='phoneNumber'
                        type='number'
                        placeholder='Podaj telefon'
                        className='input input-bordered  input-primary w-full '
                        {...register('phoneNumber', { required: true })}
                    />
                </label>
            </div>

            <label className='form-control w-full'>
                <div className='label'>
                    <span className='label-text'>Login</span>
                </div>
                <input
                    name='login'
                    type='text'
                    placeholder='Podaj login'
                    className='input input-bordered  input-primary w-full '
                    {...register('login', { required: true })}
                />
            </label>

            <div className='flex justify-between'>
                <label className='form-control w-full pe-4'>
                    <div className='label'>
                        <span className='label-text'>Hasło</span>
                    </div>
                    <input
                        name='password'
                        type='password'
                        placeholder='Podaj hasło'
                        className='input input-bordered  input-primary w-full '
                        {...register('password', { required: true })}
                    />
                </label>

                <label className='form-control w-full ps-4'>
                    <div className='label'>
                        <span className='label-text'>Powtórz hasło</span>
                    </div>
                    <input
                        name='repeatPassword'
                        type='password'
                        placeholder='Powtórz hasło'
                        className='input input-bordered  input-primary w-full '
                        {...register('repeatPassword', { required: true })}
                    />
                </label>
            </div>
            <button className='btn btn-success mt-8 text-pureWhite'>Dodaj użytkownika</button>
        </form>
    );
};

export default Form;
