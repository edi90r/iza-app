import propTypes from 'prop-types';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useViewport } from '../../../../utils/hooks';
import CardHeader from '../../Molecules/CardHeader/CardHeader';
import { setUserMoodStylesClass, convertFirebaseTimestamp } from '../../../../utils/helpers';

const weekDays = ['ndz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];
const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
];

const UserCalendar = ({ calendar, setPickedDate }) => {
    const width = useViewport();
    const userDates = calendar.map((day) => {
        const dateFormat = convertFirebaseTimestamp(day.timestamp, 'date');
        return new DateObject(dateFormat);
    });

    const amountOfMonths = width < 600 ? 1 : width < 1140 ? 2 : 3;

    return (
        <>
            <CardHeader title='Kalendarz' describe='Wybierz dzień aby zobaczyć szczegóły' />
            <Calendar
                className='pt-4'
                numberOfMonths={amountOfMonths}
                weekStartDayIndex={1}
                shadow={false}
                hideYear={false}
                weekDays={weekDays}
                months={months}
                mapDays={({ date, isSameDate }) => {
                    let props = {};
                    userDates.forEach((element) => {
                        if (isSameDate(date, element)) {
                            props = setUserMoodStylesClass(date, calendar);
                        }
                    });
                    return props;
                }}
                onFocusedDateChange={(dateClicked) => {
                    setPickedDate(dateClicked.format('YYYY-MM-DD'));
                }}
            />
        </>
    );
};

UserCalendar.propTypes = {
    calendar: propTypes.arrayOf(
        propTypes.shape({
            contactRequests: propTypes.arrayOf(
                propTypes.shape({
                    contactRequestId: propTypes.string.isRequired,
                    resolve: propTypes.bool.isRequired,
                    source: propTypes.shape({ userId: propTypes.string.isRequired }).isRequired,
                    timestamp: propTypes.string.isRequired,
                    type: propTypes.string.isRequired,
                    note: propTypes.string,
                }),
            ),
            moodId: propTypes.string.isRequired,
            timestamp: propTypes.string.isRequired,
            mood: propTypes.string.isRequired,
            source: propTypes.shape({ userId: propTypes.string.isRequired }).isRequired,
        }),
    ),
    setPickedDate: propTypes.func.isRequired,
};

export default UserCalendar;
