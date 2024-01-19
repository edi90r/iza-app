import propTypes from 'prop-types';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { setUserMoodStylesClass } from '../../../../utils/helpers';

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

const UserCalendar = ({ calendar }) => {
    console.log(calendar);
    const userDates = calendar.map((day) => {
        const dateFormat = day.timestamp.split('T')[0];
        return new DateObject(dateFormat);
    });
    return (
        <Calendar
            numberOfMonths={3}
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
        />
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
                    note: propTypes.shape({
                        text: propTypes.string.isRequired,
                        timestamp: propTypes.string.isRequired,
                    }),
                }),
            ),
            moodId: propTypes.string.isRequired,
            timestamp: propTypes.string.isRequired,
            mood: propTypes.string.isRequired,
            source: propTypes.shape({ userId: propTypes.string.isRequired }).isRequired,
        }),
    ),
};

export default UserCalendar;
