import PropTypes from 'prop-types';
import GoodIcon from '../../assets/iCons/good-icon.svg?react';
import AverageIcon from '../../assets/iCons/neutral-icon.svg?react';
import BadIcon from '../../assets/iCons/bad-icon.svg?react';
import DieticianIcon from '../../assets/iCons/dietician-icon.svg?react';
import DoctorIcon from '../../assets/iCons/doctor-icon.svg?react';
import CareGiverIcon from '../../assets/iCons/caregiver-icon.svg?react';
import CallingIcon from '../../assets/iCons/calling-icon.svg?react';
import MarkerIcon from '../../assets/iCons/marker.svg?react';
import UsersIcon from '../../assets/iCons/users.svg?react';
import { twMerge } from 'tailwind-merge';

const ActionIcon = ({ action, className = '' }) => {
    const classes = twMerge(`h-6 w-6 ${className}`);

    switch (action) {
        case 'good':
            return <GoodIcon className={classes} />;
        case 'average':
            return <AverageIcon className={classes} />;
        case 'bad':
            return <BadIcon className={classes} />;
        case 'dietician':
            return <DieticianIcon className={classes} />;
        case 'doctor':
            return <DoctorIcon className={classes} />;
        case 'careGiver':
            return <CareGiverIcon className={classes} />;
        case 'users':
            return <UsersIcon className={classes} />;
        case 'contactRequest':
            return <CallingIcon className={classes} />;
        case 'missing':
            return <MarkerIcon className={classes} />;

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
