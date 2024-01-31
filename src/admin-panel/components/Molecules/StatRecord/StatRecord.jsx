import PropTypes from 'prop-types';
import ActionIcon from '../../Atoms/ActionIcon/ActionIcon';

const StatRecord = ({ label, value, type }) => {
    return (
        <div className='stat'>
            <div className='stat-figure text-secondary'>
                <ActionIcon action={type} />
            </div>
            <div className='stat-title'>{label}</div>
            <div className='stat-value'>{value}</div>
        </div>
    );
};

StatRecord.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
};

export default StatRecord;
