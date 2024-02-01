import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import StatRecord from '../../Molecules/StatRecord/StatRecord';
import CardHeader from '../../Molecules/CardHeader/CardHeader';
import CardWrapper from '../../Atoms/CardWrapper/CardWrapper';
import { useStore } from '../../../store/useStore';

const StatsContainer = ({ userStats }) => {
    const [checked, setChecked] = useState(false);
    const { setTable } = useStore();

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        setTable({ mode: checked ? 'fiveDays' : 'oneDay', active: true });
        return;
    }, [checked, setTable]);

    return (
        <CardWrapper className='mt-8'>
            <CardHeader
                title='Statystyki'
                describe='Bieżące statystkki użytkowników kolejno z jednego lub pięciu dni'
            ></CardHeader>

            <div className='flex flex-wrap gap-4 px-4 py-8'>
                {userStats.map((stat) => (
                    <StatRecord
                        key={uuidv4()}
                        label={stat.label}
                        value={stat.record}
                        type={stat.type}
                        className={{
                            container: 'lg:basis-1/12',
                            actionIcon: 'flex h-8 w-8 items-center justify-center',
                        }}
                    />
                ))}
            </div>
        </CardWrapper>
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
