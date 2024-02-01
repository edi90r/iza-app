import PropTypes from 'prop-types';
import good from '../../../../assets/iCons/good-icon.svg';
import average from '../../../../assets/iCons/neutral-icon.svg';
import bad from '../../../../assets/iCons/bad-icon.svg';
import dietician from '../../../../assets/iCons/dietician-icon.svg';
import doctor from '../../../../assets/iCons/doctor-icon.svg';
import careGiver from '../../../../assets/iCons/caregiver-icon.svg';
import calling from '../../../../assets/iCons/calling-icon.svg';
import marker from '../../../../assets/iCons/marker.svg';
import users from '../../../../assets/iCons/users.svg';
import { twMerge } from 'tailwind-merge';

const ActionIcon = ({ action, className = '' }) => {
    const classes = twMerge(`h-4 w-4 flex justify-center items-center ${className}`);

    switch (action) {
        case 'good':
            return (
                <div className={classes}>
                    <img src={good} alt='goodMood-icon' />
                </div>
            );
        case 'average':
            return (
                <div className={classes}>
                    <img src={average} alt='averageMood-icon' />
                </div>
            );
        case 'bad':
            return (
                <div className={classes}>
                    <img src={bad} alt='badMood-icon' />
                </div>
            );
        case 'dietician':
            return (
                <div className={classes}>
                    <img src={dietician} alt='dietician-icon' />
                </div>
            );
        case 'doctor':
            return (
                <div className={classes}>
                    <img src={doctor} alt='doctor-icon' />
                </div>
            );
        case 'careGiver':
            return (
                <div className={classes}>
                    <img src={careGiver} alt='careGiver-icon' />
                </div>
            );
        case 'users':
            return (
                <div className={classes}>
                    <img src={users} alt='users-icon' />
                </div>
            );
        case 'contactRequest':
            return (
                <div className={classes}>
                    <img src={calling} alt='contactRequest-icon' />
                </div>
            );
        case 'missing':
            return (
                <div className={classes}>
                    <img src={marker} alt='missing-icon' />
                </div>
            );

        default:
            return null;
    }
};

ActionIcon.propTypes = {
    action: PropTypes.oneOf([
        'good',
        'average',
        'bad',
        'dietician',
        'doctor',
        'careGiver',
        'missing',
        'users',
        'contactRequest',
    ]),
    className: PropTypes.string,
};

export default ActionIcon;
