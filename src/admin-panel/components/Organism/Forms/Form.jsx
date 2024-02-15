import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppView } from '../../../../utils/hooks';
import { setSpecificDataShape } from '../../../../utils/helpers';
import { createUser, getUserById, updateUser } from '../../../../controlers/admin';
import { twMerge } from 'tailwind-merge';

const Form = () => {
    const { id } = useParams();
    const [appView] = useAppView();
    const navigate = useNavigate();
    const {
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
        setValue,
    } = useFormContext();

    const classes = twMerge(
        'w-full h-full max-w-64 overflow-y-auto px-2 col-start-1 col-span-2 md:col-span-1 row-start-2 place-self-center [&>label]:pt-0',
    );

    const onSubmit = async (data) => {
        if (appView === 'addUserSummary') {
            const user = setSpecificDataShape(data, 'newUser');
            const newUser = await createUser(user);
            newUser && navigate('/admin');
        } else if (appView === 'editUser') {
            const user = setSpecificDataShape(data, 'editUser');
            updateUser(id, user);
            navigate('/admin');
        } else if (appView === 'editUserCredentials') {
            console.log('edit email&password');
            navigate('/admin');
        } else {
            return;
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

        if (isSubmitSuccessful && isMounted) {
            reset();
        }
        return () => {
            isMounted = false;
        };
    }, [isSubmitSuccessful, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes}>
            <Outlet />
        </form>
    );
};

export default Form;
