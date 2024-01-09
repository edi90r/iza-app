import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const StepsIndicator = ({ appView }) => {
    const steps = [
        {
            title: 'Dane osobowe',
            appView: 'addUserPersonalData',
        },
        {
            title: 'Dane kontaktowe',
            appView: 'addUserContactData',
        },
        {
            title: 'Rejestracja użytkownika',
            appView: 'addUserRegister',
        },
        {
            title: 'Podsumowanie',
            appView: 'addUserSummary',
        },
    ];

    const currentIndex = steps.findIndex((step) => step.appView === appView);

    return (
        <ul className='steps w-full pt-4'>
            {steps.map((step, index) => {
                const classes = index <= currentIndex ? 'step step-primary' : 'step';
                return (
                    <li key={uuidv4()} className={classes}>
                        {step.title}
                    </li>
                );
            })}
        </ul>
    );
};

StepsIndicator.propTypes = {
    appView: propTypes.string.isRequired,
};

export default StepsIndicator;
