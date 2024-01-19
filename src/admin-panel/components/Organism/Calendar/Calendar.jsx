import propTypes from 'prop-types';
import { Calendar } from 'react-multi-date-picker';

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
    return (
        <Calendar
            numberOfMonths={3}
            weekStartDayIndex={1}
            shadow={false}
            hideYear={false}
            weekDays={weekDays}
            months={months}
        />
    );
};

UserCalendar.propTypes = {
    calendar: propTypes.array.isRequired,
};

export default UserCalendar;
