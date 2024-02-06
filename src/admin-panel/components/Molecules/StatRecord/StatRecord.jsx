import PropTypes from 'prop-types';
import ActionIcon from '../../Atoms/ActionIcon/ActionIcon';
import { twMerge } from 'tailwind-merge';
twMerge;

const StatRecord = ({
    label,
    value,
    type,
    className = { container: '', wrapper: '', classLabel: '', classValue: '', actionIcon: '' },
}) => {
    const classes = {
        container: twMerge(
            `card flex-shrink flex-grow flex-row items-center border border-primary p-4 ${className.container}`,
        ),
        wrapper: twMerge(`flex h-16 flex-grow flex-col justify-around ${className.wrapper}`),
        label: twMerge(`text card-title inline text-sm ${className.classLabel}`),
        value: twMerge(`stat-value text-primary ${className.value}`),
        actionIcon: twMerge(`${className.actionIcon}`),
    };
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.label}>{label}</div>
                <div className={classes.value}>{value}</div>
            </div>

            <ActionIcon action={type} className={className.actionIcon} />
        </div>
    );
};

StatRecord.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.shape({
        container: PropTypes.string,
        wrapper: PropTypes.string,
        classLabel: PropTypes.string,
        classValue: PropTypes.string,
        actionIcon: PropTypes.string,
    }),
};

export default StatRecord;
