import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../controlers/admin';
import CardWrapper from '../components/Atoms/CardWrapper/CardWrapper';
import UserBio from '../components/Organism/UserBio/UserBio';
import DayDetails from '../components/Organism/DayDetails/DayDetails';

const initialUser = {
    name: '',
    lastname: '',
    personalIdentityNumber: '',
    dateOfBirth: '',
    address: {
        city: '',
        street: '',
        houseNumber: 0,
        apartmentNumber: 0,
        phoneNumber: 0,
    },
    describe: '',
    calendar: [],
};
const UserDetails = () => {
    const [user, setUser] = useState(initialUser);

    const {
        name,
        lastname,
        personalIdentityNumber,
        dateOfBirth,
        address: { city, street, houseNumber, apartmentNumber, phoneNumber } = {},
        describe,
    } = user;

    const userBio = {
        name,
        lastname,
        personalIdentityNumber,
        age: dateOfBirth,
        city,
        street,
        houseNumber,
        apartmentNumber,
        phoneNumber,
        describe,
    };

    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserById(id, true);
            setUser(user);
        };
        fetchUser();
    }, [id]);

    return (
        <>
            <div className='mt-8 grid w-full grid-cols-2 gap-x-8'>
                <CardWrapper>
                    <UserBio user={userBio} />
                </CardWrapper>
                <CardWrapper>
                    <DayDetails />
                </CardWrapper>
            </div>
            <div className='card my-8 h-full w-full bg-base-100 p-4 shadow-md'>Kalendarz:</div>
        </>
    );
};

export default UserDetails;
