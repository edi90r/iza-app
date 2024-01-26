import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { getUserById } from '../../controlers/admin';
import CardWrapper from '../components/Atoms/CardWrapper/CardWrapper';
import UserBio from '../components/Organism/UserBio/UserBio';
import DayDetails from '../components/Organism/DayDetails/DayDetails';
import UserCalendar from '../components/Organism/Calendar/Calendar';
import { convertFirebaseTimestamp } from '../../utils/helpers';

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
    const [dayDetails, setDayDetails] = useState({});
    const { pickedDate } = useStore();

    const {
        name,
        lastname,
        personalIdentityNumber,
        dateOfBirth,
        address: { city, street, houseNumber, apartmentNumber, phoneNumber } = {},
        describe,
        calendar,
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
        const dayDetails = calendar.find((day) => {
            const userDay = convertFirebaseTimestamp(day.timestamp, 'date');

            return userDay === pickedDate;
        });
        setDayDetails(dayDetails);
    }, [pickedDate, calendar]);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserById(id, true);
            setUser(user);
        };
        console.log('fetch user');
        fetchUser();
    }, [id]);

    return (
        <>
            <div className='mt-8 grid w-full grid-cols-2 gap-x-8'>
                <CardWrapper>
                    <UserBio user={userBio} />
                </CardWrapper>
                <CardWrapper>
                    <DayDetails dayDetails={dayDetails} />
                </CardWrapper>
            </div>
            <CardWrapper className='mb-8'>
                <UserCalendar calendar={calendar} />
            </CardWrapper>
        </>
    );
};

export default UserDetails;
