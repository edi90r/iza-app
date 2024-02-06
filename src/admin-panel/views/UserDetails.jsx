import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { getUserById } from '../../controlers/admin';
import CardWrapper from '../components/Atoms/CardWrapper/CardWrapper';
import Loader from '../components/Atoms/Loader/Loader';
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
    const { currentDay } = useStore();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(initialUser);
    const [dayDetails, setDayDetails] = useState({});
    const [pickedDate, setPickedDate] = useState(currentDay);

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
            if (!user) {
                setIsLoading(true);
            }
            setUser(user);
            setIsLoading(false);
        };
        fetchUser();
    }, [id]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className='flex w-full flex-col gap-x-8 lg:flex-row'>
                        <CardWrapper className='pt-8 lg:pt-0'>
                            <UserBio user={userBio} />
                        </CardWrapper>
                        <CardWrapper className='pt-8 lg:pt-0'>
                            <DayDetails dayDetails={dayDetails} pickedDate={pickedDate} />
                        </CardWrapper>
                    </div>
                    <CardWrapper className='pt-8 lg:pt-0'>
                        <UserCalendar calendar={calendar} setPickedDate={setPickedDate} />
                    </CardWrapper>
                </>
            )}
        </>
    );
};

export default UserDetails;
