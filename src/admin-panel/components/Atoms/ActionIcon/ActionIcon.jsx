import PropTypes from 'prop-types';

const ActionIcon = ({ action }) => {
    switch (action) {
        case 'good':
            return (
                <div className='h-4'>
                    <h2>G</h2>
                </div>
            );
        case 'average':
            return (
                <div className='h-4'>
                    <h2>A</h2>
                </div>
            );
        case 'bad':
            return (
                <div className='h-4'>
                    <h2>B</h2>
                </div>
            );
        case 'dietician':
            return (
                <div className='h-4'>
                    <h2>D</h2>
                </div>
            );
        case 'doctor':
            return (
                <div className='h-4'>
                    <h2>Dr.</h2>
                </div>
            );
        case 'careGiver':
            return (
                <div className='h-4'>
                    <h2>C</h2>
                </div>
            );

        default:
            return (
                <div className='h-4'>
                    <h2>-</h2>
                </div>
            );
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
    ]),
};

export default ActionIcon;
