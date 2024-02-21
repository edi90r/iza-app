import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Outlet, useParams } from 'react-router-dom';
import { useAppView } from '../../../../utils/hooks';
import { setSpecificDataShape, isObjectEmpty } from '../../../../utils/helpers';
import { getUserById } from '../../../../controlers/admin';
import { useStore } from '../../../store/useStore';
import { twMerge } from 'tailwind-merge';

const Form = () => {
    const { id } = useParams();
    const [appView] = useAppView();
    const {
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
        setValue,
    } = useFormContext();
    const { handleOpenModal, setNewUser, newUser } = useStore();

    const classes = twMerge(
        'w-full h-full max-w-64 overflow-y-auto px-2 col-start-1 col-span-2 md:col-span-1 row-start-2 place-self-center [&>label]:pt-0',
    );

    const onSubmit = async (data) => {
        if (appView === 'addUserSummary') {
            setNewUser(data);
            handleOpenModal(
                'addUser',
                {
                    title: 'Dodawanie użytkownika',
                    message: 'Czy na pewno chcesz dodać użytkownika?',
                },
                true,
            );
        } else if (appView === 'editUser') {
            setNewUser(data);
            handleOpenModal(
                'editUser',
                {
                    title: 'Edytowanie użytkownika',
                    message: 'Czy na pewno chcesz edytować użytkownika?',
                },
                true,
            );
        }
    };

    useEffect(() => {
        let isMounted = true;
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
            'email',
            'describe',
        ];
        if (isMounted) {
            const populateUserFields = async () => {
                if (appView === 'editUser') {
                    const user = await getUserById(id);
                    if (!user) return;
                    const userShape = setSpecificDataShape(user, 'reverse');
                    for (const field of fields) {
                        setValue(field, userShape[field]);
                    }
                }
            };

            populateUserFields();
        }
        return () => {
            isMounted = false;
        };
    }, [appView, id, setValue]);

    useEffect(() => {
        let isMounted = true;

        if (isSubmitSuccessful && isObjectEmpty(newUser) && isMounted) {
            reset();
        }
        return () => {
            isMounted = false;
        };
    }, [isSubmitSuccessful, reset, newUser]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes}>
            <Outlet />
        </form>
    );
};

export default Form;
