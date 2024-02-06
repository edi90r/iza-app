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
        'w-full h-full max-w-64 overflow-y-auto px-2 col-start-1 row-start-2 place-self-center [&>label]:pt-0',
    );

    const onSubmit = (data) => {
        if (appView === 'addUserSummary') {
            const user = setSpecificDataShape(data);
            createUser(user);
            navigate('/admin');
        } else if (appView === 'editUser') {
            const user = setSpecificDataShape(data);
            updateUser(id, user);
            navigate('/admin');
        } else if (appView === 'editUserCredentials') {
            console.log('edit login&password');
            navigate('/admin');
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes}>
            <Outlet />
        </form>
    );
};

export default Form;
