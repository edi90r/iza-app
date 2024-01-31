import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import StatRecord from '../../Molecules/StatRecord/StatRecord';
import { useStore } from '../../../store/useStore';

const StatsContainer = ({ userStats }) => {
    const [checked, setChecked] = useState(false);
    const { currentDay, setTable } = useStore();

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        setTable({ mode: checked ? 'fiveDays' : 'oneDay', active: true });
        return;
    }, [checked, setTable]);

    return (
        <div
            className='flex w-full flex-col items-center justify-center lg:flex-row'
            style={{ height: '20vh' }}
        >
            <h2>Statystyki</h2>
            <div className='stats stats-vertical shadow lg:stats-horizontal'>
                <div className='stat'>
                    <div className='stat-title w-16'>{checked ? '5 dni' : '1 dzień'}</div>
                    <input
                        type='checkbox'
                        className='toggle'
                        onChange={(e) => handleChange(e)}
                        checked={checked}
                    />
                </div>
                {userStats.map((stat) => (
                    <StatRecord
                        key={uuidv4()}
                        label={stat.label}
                        value={stat.record}
                        type={stat.type}
                    />
                ))}
                <div className='stat'>
                    <div className='stat-title'>Data</div>
                    <div className='stat-value'>{currentDay}</div>
                </div>
            </div>
        </div>
    );
};

StatsContainer.propTypes = {
    userStats: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            record: PropTypes.number.isRequired,
        }),
    ),
};

export default StatsContainer;
