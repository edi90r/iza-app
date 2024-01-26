import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import CardHeader from '../../Molecules/CardHeader/CardHeader';
import CardRecord from '../../Molecules/CardRecord/CardRecord';
import ContactRequestsItem from '../ContactRequestItem/ContactRequestItem';
import { useStore } from '../../../store/useStore';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDailyContactRequests } from '../../../../controlers/admin';

const DayDetails = ({ dayDetails }) => {
    const { mood, contactRequests } = dayDetails || {};
    const [contactRequestsRemote, setContactRequestsRemote] = useState(contactRequests);
    const { pickedDate } = useStore();
    const { id } = useParams();
    const userMood = {
        good: 'dobry',
        average: 'średni',
        bad: 'zły',
    };
    useEffect(() => {
        const fetchContactRequests = async () => {
            const response = await getDailyContactRequests(id, pickedDate);
            setContactRequestsRemote(response);
        };
        fetchContactRequests();
    }, [pickedDate, id]);

    return (
        <div className='max-h-80 w-full overflow-hidden'>
            <CardHeader
                title='Szczegóły dnia'
                describe='Tu znajdziesz szczegóły dnia, zgłoszone prośby kontaktu, przy każdej z nich możesz zostawić notatkę'
            />
            <div className='p-4'>
                <CardRecord label='data' content={pickedDate} />
                <CardRecord
                    label='nastrój'
                    content={mood ? userMood[mood] : 'Użytkownik nie wybrał nastroju'}
                />
                <p className='mr-2 inline-block text-gray-900 '>prośba o kontakt</p>
                {contactRequestsRemote && contactRequestsRemote.length > 0 ? (
                    <div className='h-40 w-full overflow-y-auto pb-4 pe-4'>
                        {contactRequestsRemote.map((contactRequest, index) => {
                            return (
                                <ContactRequestsItem
                                    key={uuidv4()}
                                    details={contactRequest}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                ) : (
                    'brak'
                )}
            </div>
        </div>
    );
};
DayDetails.propTypes = {
    dayDetails: propTypes.shape({
        timestamp: propTypes.string,
        mood: propTypes.string,
        contactRequests: propTypes.arrayOf(
            propTypes.shape({
                contactRequestId: propTypes.string,
                resolve: propTypes.bool,
                source: propTypes.shape({ userId: propTypes.string }),
                note: propTypes.string,
            }),
        ),
    }),
};

export default DayDetails;
