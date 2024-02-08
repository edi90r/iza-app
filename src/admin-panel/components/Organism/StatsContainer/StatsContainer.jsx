import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import StatRecord from '../../Molecules/StatRecord/StatRecord';
import CardHeader from '../../Molecules/CardHeader/CardHeader';
import CardWrapper from '../../Atoms/CardWrapper/CardWrapper';
import SelectionControl from '../../Molecules/SelectionControl/SelectionControl';
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
        <CardWrapper className='my-8 lg:my-0'>
            <CardHeader
                title='Statystyki'
                describe='Bieżące statystki użytkowników kolejno z jednego lub pięciu dni'
                className={{ wrapper: 'flex items-center justify-between' }}
            >
                <div className='flex max-w-44 flex-col'>
                    <SelectionControl
                        className={{
                            wrapper: 'flex',
                            label: 'me-0 text-sm',
                            extraLabel: 'text-sm',
                            input: 'toggle-custom toggle mx-2',
                        }}
                        name='toggle-view'
                        title='Widok'
                        label='1 dzień'
                        extraLabel='5 dni'
                        type='checkbox'
                        checked={checked}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </CardHeader>

            <div className='flex flex-wrap gap-4 px-4 py-8'>
                {userStats.map((stat) => (
                    <StatRecord
                        key={uuidv4()}
                        label={stat.label}
                        value={stat.record}
                        type={stat.type}
                        className={{
                            container: 'lg:basis-1/12',
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
