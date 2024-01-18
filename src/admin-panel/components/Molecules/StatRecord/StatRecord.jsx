import PropTypes from 'prop-types';
import ActionIcon from '../../Atoms/ActionIcon/ActionIcon';

const StatRecord = ({ label, value }) => {
    return (
        <div className='stat'>
            <div className='stat-figure text-secondary'>
                <ActionIcon action={label} />
            </div>
            <div className='stat-title'>{label}</div>
            <div className='stat-value'>{value}</div>
        </div>
    );
};

StatRecord.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
};

export default StatRecord;
